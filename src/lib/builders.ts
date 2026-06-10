import { db, isDbConfigured } from "@/db";
import { builders, type BuilderRow } from "@/db/schema";
import { SEED_BUILDERS } from "@/data/seed-builders";
import { eq, and, asc, desc, sql } from "drizzle-orm";

// Static fallback: hydrate seed rows into full BuilderRow shape so pages render
// identically whether or not Neon is wired up yet.
function seedAsRows(): BuilderRow[] {
  return SEED_BUILDERS.map((b, i) => ({
    id: `seed-${b.slug}`,
    slug: b.slug!,
    name: b.name!,
    website: b.website ?? null,
    domain: b.domain ?? null,
    description: b.description ?? null,
    logoUrl: b.logoUrl ?? null,
    category: b.category ?? null,
    secondaryCategory: b.secondaryCategory ?? null,
    surfaces: b.surfaces ?? [],
    stage: b.stage ?? null,
    types: b.types ?? [],
    audiences: b.audiences ?? [],
    deployments: b.deployments ?? [],
    conformanceLevel: b.conformanceLevel ?? "aligned",
    verifiedDate: b.verifiedDate ?? null,
    tagline: b.tagline ?? null,
    about: b.about ?? null,
    architecture: b.architecture ?? null,
    interception: b.interception ?? [],
    policyModel: b.policyModel ?? null,
    decisions: b.decisions ?? [],
    requirements: b.requirements ?? [],
    capabilities: b.capabilities ?? [],
    keyFacts: b.keyFacts ?? [],
    pocName: b.pocName ?? null,
    pocEmail: b.pocEmail ?? null,
    featured: b.featured ?? false,
    sortOrder: b.sortOrder ?? 0,
    priority: b.priority ?? null,
    status: b.status ?? "approved",
    createdBy: b.createdBy ?? null,
    claimedBy: b.claimedBy ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  })) as BuilderRow[];
}

export async function getApprovedBuilders(): Promise<BuilderRow[]> {
  if (isDbConfigured && db) {
    return db
      .select()
      .from(builders)
      .where(eq(builders.status, "approved"))
      // Featured first, then admin priority (lower = higher, nulls last),
      // then the original registry order.
      .orderBy(
        desc(builders.featured),
        sql`${builders.priority} asc nulls last`,
        asc(builders.sortOrder),
        asc(builders.createdAt)
      );
  }
  // Fallback preserves seed array order (already original).
  return seedAsRows().filter((b) => b.status === "approved");
}

export async function getBuilderBySlug(slug: string): Promise<BuilderRow | null> {
  if (isDbConfigured && db) {
    const rows = await db
      .select()
      .from(builders)
      .where(and(eq(builders.slug, slug), eq(builders.status, "approved")))
      .limit(1);
    return rows[0] ?? null;
  }
  return seedAsRows().find((b) => b.slug === slug && b.status === "approved") ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  const rows = isDbConfigured && db
    ? await db.select({ slug: builders.slug }).from(builders).where(eq(builders.status, "approved"))
    : seedAsRows().filter((b) => b.status === "approved").map((b) => ({ slug: b.slug }));
  return rows.map((r) => r.slug);
}
