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
    // Insert new rows; for existing rows only refresh sortOrder (positioning,
    // not company-editable) so the original order is preserved without
    // clobbering any company edits or claims.
    await db
      .insert(builders)
      .values(b)
      .onConflictDoUpdate({ target: builders.slug, set: { sortOrder: b.sortOrder } });
  }
  console.log("Done.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
