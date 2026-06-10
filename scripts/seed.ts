import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { builders } from "../src/db/schema";
import { SEED_BUILDERS } from "../src/data/seed-builders";
import { sql } from "drizzle-orm";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL not set. Provision Neon in Vercel and add it to .env.local.");
    process.exit(1);
  }
  const db = drizzle(neon(url));

  console.log(`Seeding ${SEED_BUILDERS.length} builders…`);
  for (const b of SEED_BUILDERS) {
    await db
      .insert(builders)
      .values(b)
      .onConflictDoUpdate({
        target: builders.slug,
        // Re-seed only registry-owned fields; never clobber claimedBy.
        set: {
          name: b.name,
          website: b.website,
          domain: b.domain,
          description: b.description,
          category: b.category,
          surfaces: b.surfaces,
          conformanceLevel: b.conformanceLevel,
          verifiedDate: b.verifiedDate,
          tagline: b.tagline,
          interception: b.interception,
          policyModel: b.policyModel,
          decisions: b.decisions,
          requirements: b.requirements,
          keyFacts: b.keyFacts,
          status: b.status,
          updatedAt: sql`now()`,
        },
      });
  }
  console.log("Done.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
