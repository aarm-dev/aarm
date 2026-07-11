"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, isDbConfigured } from "@/db";
import { builders, claims, users } from "@/db/schema";
import type {
  Category, Surface, Stage, ProductType, Audience, Deployment,
  InterceptionArchitecture, PolicyModel, AuthDecision,
} from "@/db/taxonomy";
import { notifyNewListing, notifyClaim, notifyListingDecision, notifyClaimDecision, notifyInterceptSignup } from "@/lib/notify";
import { ACTIVATION_CODE } from "@/lib/conformance-config";

function slugify(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
  }
}

async function requireDb() {
  if (!isDbConfigured || !db) throw new Error("Database not configured yet.");
  return db;
}
async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not signed in.");
  return session.user as { id: string; email?: string; isAdmin?: boolean; emailDomain?: string };
}
async function requireAdmin() {
  const user = await requireUser();
  if (!user.isAdmin) throw new Error("Admin only.");
  return user;
}

/** Anyone signed in can submit a new listing → enters the pending queue. */
export async function submitListing(input: {
  name: string;
  website: string;
  description: string;
  category?: Category;
  surfaces?: Surface[];
  stage?: Stage;
  types?: ProductType[];
  audiences?: Audience[];
  deployments?: Deployment[];
  pocName?: string;
  pocEmail?: string;
}) {
  const database = await requireDb();
  const user = await requireUser();

  // Ensure a unique slug — a company with the same name may already be listed.
  const base = slugify(input.name);
  const clash = await database.select({ id: builders.id }).from(builders).where(eq(builders.slug, base)).limit(1);
  const slug = clash.length ? `${base}-${user.id.slice(0, 6)}` : base;

  // If the submitter lists their own email as the point of contact, they have
  // effectively claimed the page — bind ownership to them now.
  const selfPoc =
    !!input.pocEmail && !!user.email && input.pocEmail.trim().toLowerCase() === user.email.toLowerCase();

  await database.insert(builders).values({
    slug,
    name: input.name,
    website: input.website,
    domain: domainOf(input.website),
    description: input.description,
    category: input.category,
    surfaces: input.surfaces ?? [],
    stage: input.stage,
    types: input.types ?? [],
    audiences: input.audiences ?? [],
    deployments: input.deployments ?? [],
    pocName: input.pocName,
    pocEmail: input.pocEmail,
    conformanceLevel: "aligned",
    status: "pending",
    createdBy: user.id,
    claimedBy: selfPoc ? user.id : undefined,
    // Land new submissions at the bottom of the registry by default; admins can
    // lift them with priority/featured in the admin panel. (Seed rows use 0–~99.)
    sortOrder: 100000,
  });
  // Fire-and-forget; never let a notification failure break submission.
  await notifyNewListing({
    name: input.name,
    website: input.website,
    description: input.description,
    category: input.category,
    pocName: input.pocName,
    pocEmail: input.pocEmail,
    submittedBy: user.email,
  });
  revalidatePath("/builders");
}

/** Visitor claims a listing. Domain match → auto-approve; else manual queue. */
export async function requestClaim(builderId: string) {
  const database = await requireDb();
  const user = await requireUser();
  const [b] = await database.select().from(builders).where(eq(builders.id, builderId)).limit(1);
  if (!b) throw new Error("Listing not found.");

  const domainMatch = !!user.emailDomain && user.emailDomain === b.domain;
  await database.insert(claims).values({
    builderId,
    userId: user.id,
    userEmail: user.email ?? "",
    method: domainMatch ? "domain_match" : "manual",
    status: domainMatch ? "approved" : "pending",
    reviewedAt: domainMatch ? new Date() : null,
  });

  await notifyClaim({
    builderName: b.name,
    builderSlug: b.slug,
    userEmail: user.email ?? "",
    method: domainMatch ? "domain_match" : "manual",
  });

  if (domainMatch) {
    await database.update(builders).set({ claimedBy: user.id }).where(eq(builders.id, builderId));
    revalidatePath(`/builders/${b.slug}`);
    return { status: "approved" as const };
  }
  return { status: "pending" as const };
}

/** Claimed owner edits marketing + classification only. */
export async function updateOwnedBuilder(
  builderId: string,
  input: {
    description?: string;
    logoUrl?: string;
    category?: Category;
    secondaryCategory?: Category;
    surfaces?: Surface[];
    stage?: Stage;
    types?: ProductType[];
    audiences?: Audience[];
    deployments?: Deployment[];
    // Self-reported technical profile (the conformance verdict stays TWG-only).
    interception?: InterceptionArchitecture[];
    policyModel?: PolicyModel;
    decisions?: AuthDecision[];
    pocName?: string;
    pocEmail?: string;
  }
) {
  const database = await requireDb();
  const user = await requireUser();
  const [b] = await database.select().from(builders).where(eq(builders.id, builderId)).limit(1);
  if (!b) throw new Error("Listing not found.");
  if (b.claimedBy !== user.id && !user.isAdmin) throw new Error("You don't own this listing.");

  // Point of contact is required for owned listings.
  if (!input.pocName?.trim() || !input.pocEmail?.trim()) {
    throw new Error("A point-of-contact name and email are required.");
  }
  if (!/^\S+@\S+\.\S+$/.test(input.pocEmail.trim())) {
    throw new Error("Enter a valid point-of-contact email.");
  }

  await database
    .update(builders)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(builders.id, builderId));
  revalidatePath(`/builders/${b.slug}`);
  revalidatePath("/builders");
}

// ── Admin (TWG) ──────────────────────────────────────────────────────────

/** Admin-only: pin/prioritize a builder in the registry order. */
export async function setBuilderOrdering(
  builderId: string,
  input: { priority?: number | null; featured?: boolean }
) {
  const database = await requireDb();
  await requireAdmin();
  await database
    .update(builders)
    .set({
      priority: input.priority === undefined ? undefined : input.priority,
      featured: input.featured,
      updatedAt: new Date(),
    })
    .where(eq(builders.id, builderId));
  revalidatePath("/builders");
  revalidatePath("/admin");
}

/**
 * Admin: remove a company page. Soft-delete (status "deleted") so it disappears
 * from the public registry and admin lists but survives the bootstrap seed
 * (a hard delete would let seeded rows reappear on the next deploy) and stays
 * reversible.
 */
export async function deleteBuilder(builderId: string) {
  const database = await requireDb();
  await requireAdmin();
  await database.update(builders).set({ status: "deleted", updatedAt: new Date() }).where(eq(builders.id, builderId));
  revalidatePath("/builders");
  revalidatePath("/admin");
}

export async function setListingStatus(builderId: string, status: "approved" | "rejected") {
  const database = await requireDb();
  await requireAdmin();
  await database.update(builders).set({ status }).where(eq(builders.id, builderId));

  // Notify the submitter of the decision.
  const [b] = await database.select().from(builders).where(eq(builders.id, builderId)).limit(1);
  if (b?.createdBy) {
    const [u] = await database.select({ email: users.email }).from(users).where(eq(users.id, b.createdBy)).limit(1);
    if (u?.email) {
      await notifyListingDecision({ to: u.email, name: b.name, slug: b.slug, approved: status === "approved" });
    }
  }

  revalidatePath("/builders");
  revalidatePath("/admin");
}

export async function reviewClaim(claimId: string, decision: "approved" | "rejected") {
  const database = await requireDb();
  const admin = await requireAdmin();
  const [c] = await database.select().from(claims).where(eq(claims.id, claimId)).limit(1);
  if (!c) throw new Error("Claim not found.");
  await database
    .update(claims)
    .set({ status: decision, reviewedBy: admin.id, reviewedAt: new Date() })
    .where(eq(claims.id, claimId));
  const [b] = await database
    .select({ name: builders.name, slug: builders.slug })
    .from(builders)
    .where(eq(builders.id, c.builderId))
    .limit(1);
  if (decision === "approved") {
    await database.update(builders).set({ claimedBy: c.userId }).where(eq(builders.id, c.builderId));
  }
  if (c.userEmail && b) {
    await notifyClaimDecision({
      to: c.userEmail,
      builderName: b.name,
      builderSlug: b.slug,
      approved: decision === "approved",
    });
  }
  revalidatePath("/admin");
}

/** Admin-only: conformance + positioning + spec-grounded technical axes. */
export async function updateConformance(
  builderId: string,
  input: Partial<typeof builders.$inferInsert>
) {
  const database = await requireDb();
  await requireAdmin();
  await database.update(builders).set({ ...input, updatedAt: new Date() }).where(eq(builders.id, builderId));
  const [b] = await database.select().from(builders).where(eq(builders.id, builderId)).limit(1);
  if (b) revalidatePath(`/builders/${b.slug}`);
  revalidatePath("/builders");
  revalidatePath("/admin");
}

// ── Conformance request flow ───────────────────────────────────────────────

/** The builder the signed-in user has claimed (owns), or null. */
export async function getMyBuilder() {
  if (!isDbConfigured || !db) return null;
  const session = await auth();
  if (!session?.user?.id) return null;
  const [b] = await db.select().from(builders).where(eq(builders.claimedBy, session.user.id)).limit(1);
  return b ?? null;
}

/**
 * Owner starts a conformance review. Requires eligibility (both true) + explicit
 * agreement. Returns the activation code ONLY on success — it is never shipped
 * in client code, only returned to the eligible, authenticated owner.
 */
export async function startConformance(input: {
  hasSecurityCert: boolean;
  hasFiveCustomers: boolean;
  agreed: boolean;
  targetLevel: "core" | "extended";
}): Promise<{ activationCode: string }> {
  const database = await requireDb();
  const user = await requireUser();
  const [b] = await database.select().from(builders).where(eq(builders.claimedBy, user.id)).limit(1);
  if (!b) throw new Error("You need to claim your company listing first.");
  if (!input.hasSecurityCert || !input.hasFiveCustomers) {
    throw new Error("Both eligibility conditions must be met to start a conformance review.");
  }
  if (!input.agreed) throw new Error("You must acknowledge the evidence requirement to proceed.");

  await database
    .update(builders)
    .set({
      conformanceRequestStatus:
        b.conformanceRequestStatus === "not_started" || !b.conformanceRequestStatus
          ? "started"
          : b.conformanceRequestStatus,
      conformanceTargetLevel: input.targetLevel,
      updatedAt: new Date(),
    })
    .where(eq(builders.id, b.id));

  revalidatePath("/my-conformance");
  return { activationCode: ACTIVATION_CODE };
}

/** Admin: update a company's conformance-request status + MCP assessment id. */
export async function setConformanceRequest(
  builderId: string,
  input: { status?: "not_started" | "started" | "in_review" | "verified" | "declined"; assessmentId?: string | null }
) {
  const database = await requireDb();
  await requireAdmin();
  await database
    .update(builders)
    .set({
      conformanceRequestStatus: input.status,
      conformanceAssessmentId: input.assessmentId === undefined ? undefined : input.assessmentId,
      updatedAt: new Date(),
    })
    .where(eq(builders.id, builderId));
  revalidatePath("/my-conformance");
  revalidatePath("/admin");
}

// ── INTERCEPT event signup ─────────────────────────────────────────────────

export async function submitInterceptSignup(input: {
  email: string;
  name?: string;
  company?: string;
  role?: "builder" | "breaker" | "defender" | "";
}): Promise<{ ok: true }> {
  const email = input.email.trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Enter a valid email address.");
  // No stored list — just send the confirmation email (and a team heads-up).
  await notifyInterceptSignup({ to: email, name: input.name, role: input.role || undefined });
  return { ok: true };
}
