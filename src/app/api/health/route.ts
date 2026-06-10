import { NextResponse } from "next/server";
import { db, isDbConfigured } from "@/db";
import { builders } from "@/db/schema";

export const dynamic = "force-dynamic";

// Lightweight health probe — booleans + a count only, no secrets.
export async function GET() {
  let ok = false;
  let builderCount: number | null = null;
  let error: string | null = null;
  try {
    if (isDbConfigured && db) {
      const rows = await db.select({ id: builders.id }).from(builders);
      builderCount = rows.length;
      ok = true;
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "unknown error";
  }
  // Names only (never values) of DB-related env vars, to confirm what the
  // Vercel ↔ Neon integration actually created.
  const dbEnvNames = Object.keys(process.env)
    .filter((k) => /(DATABASE|POSTGRES|PG|NEON)/i.test(k))
    .sort();

  return NextResponse.json({ dbConfigured: isDbConfigured, ok, builderCount, error, dbEnvNames });
}
