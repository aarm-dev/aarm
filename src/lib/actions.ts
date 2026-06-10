"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, isDbConfigured } from "@/db";
import { builders, claims } from "@/db/schema";
import type {
  Category, Surface, Stage, ProductType, Audience, Deployment,
  InterceptionArchitecture, PolicyModel, AuthDecision,
} from "@/db/taxonomy";
import { notifyNewListing, notifyClaim } from "@/lib/notify";

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
  await database.insert(builders).values({
    slug: slugify(input.name),
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

export async function setListingStatus(builderId: string, status: "approved" | "rejected") {
  const database = await requireDb();
  await requireAdmin();
  await database.update(builders).set({ status }).where(eq(builders.id, builderId));
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
  if (decision === "approved") {
    await database.update(builders).set({ claimedBy: c.userId }).where(eq(builders.id, c.builderId));
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
  revalidatePath("/admin");
}
