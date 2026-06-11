import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { builders } from "../src/db/schema";
import { SEED_BUILDERS } from "../src/data/seed-builders";
import { isNull } from "drizzle-orm";

async function main() {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.POSTGRES_URL_NON_POOLING;
  if (!url) {
    console.error("No database URL set. Connect Neon in Vercel (var name DATABASE_URL).");
    process.exit(1);
  }
  const db = drizzle(neon(url));

  console.log(`Seeding ${SEED_BUILDERS.length} builders…`);
  for (const b of SEED_BUILDERS) {
    // Insert new rows; for existing rows only refresh sortOrder (positioning,
    // not company-editable) so the original order is preserved without
    // clobbering any company edits or claims.
    await db
      .insert(builders)
      .values(b)
      .onConflictDoUpdate({
        target: builders.slug,
        // For UNCLAIMED rows the seed is authoritative, so refresh the full
        // record. Claimed rows are skipped entirely (setWhere) to protect any
        // owner edits.
        set: {
          sortOrder: b.sortOrder,
          name: b.name,
          website: b.website,
          domain: b.domain,
          description: b.description,
          surfaces: b.surfaces,
          stage: b.stage,
          types: b.types,
          audiences: b.audiences,
          deployments: b.deployments,
          conformanceLevel: b.conformanceLevel,
          verifiedDate: b.verifiedDate,
          verifiedBy: b.verifiedBy,
          tagline: b.tagline,
          about: b.about,
          architecture: b.architecture,
          capabilities: b.capabilities,
          interception: b.interception,
          policyModel: b.policyModel,
          decisions: b.decisions,
          requirements: b.requirements,
          keyFacts: b.keyFacts,
        },
        setWhere: isNull(builders.claimedBy),
      });
  }
  console.log("Done.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
