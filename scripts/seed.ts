import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { builders } from "../src/db/schema";
import { SEED_BUILDERS } from "../src/data/seed-builders";

// The DB is the source of truth. The seed only BOOTSTRAPS missing rows
// (insert-if-absent) — it never overwrites existing rows. The only exception is
// a one-time reconcile list, for rows that can only be corrected via this script
// (e.g. a claimed row whose conformance was set out of band). Remove slugs from
// RECONCILE once they're managed in the admin editor.
const RECONCILE = new Set<string>(["agent-governance-toolkit-microsoft", "noma"]);

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

  console.log(`Bootstrapping ${SEED_BUILDERS.length} builders…`);
  for (const b of SEED_BUILDERS) {
    if (RECONCILE.has(b.slug!)) {
      // One-time forced reconcile: align the DB row to seed regardless of claim.
      await db.insert(builders).values(b).onConflictDoUpdate({
        target: builders.slug,
        set: {
          name: b.name, website: b.website, domain: b.domain, description: b.description,
          surfaces: b.surfaces, stage: b.stage, types: b.types, audiences: b.audiences,
          deployments: b.deployments, conformanceLevel: b.conformanceLevel,
          verifiedDate: b.verifiedDate, verifiedBy: b.verifiedBy, tagline: b.tagline,
          about: b.about, architecture: b.architecture, capabilities: b.capabilities,
          interception: b.interception, policyModel: b.policyModel, decisions: b.decisions,
          requirements: b.requirements, keyFacts: b.keyFacts,
        },
      });
    } else {
      // Bootstrap only: insert if missing, never overwrite the DB.
      await db.insert(builders).values(b).onConflictDoNothing({ target: builders.slug });
    }
  }
  console.log("Done.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
