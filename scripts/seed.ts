import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { builders } from "../src/db/schema";
import { SEED_BUILDERS } from "../src/data/seed-builders";

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
    // Insert-only: never overwrite rows that already exist (protects company
    // edits + claims). Safe to run on every deploy.
    await db.insert(builders).values(b).onConflictDoNothing({ target: builders.slug });
  }
  console.log("Done.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
