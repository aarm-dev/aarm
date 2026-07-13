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
  // Booleans only — confirms whether email notifications can send.
  const notify = {
    resendKey: !!process.env.RESEND_API_KEY,
    hasRecipients: !!(process.env.NOTIFY_TO || process.env.ADMIN_EMAILS),
    fromSet: !!process.env.NOTIFY_FROM,
  };

  const blobConfigured = !!process.env.BLOB_READ_WRITE_TOKEN;

  return NextResponse.json({ dbConfigured: isDbConfigured, ok, builderCount, error, notify, blobConfigured });
}
