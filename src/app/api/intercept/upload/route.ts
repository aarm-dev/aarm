import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { auth } from "@/auth";

export const runtime = "nodejs";

// Uploads a CFP paper file to Vercel Blob. Requires a Blob store
// (BLOB_READ_WRITE_TOKEN) — returns 503 with a clear message if not configured.
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "File upload isn't configured yet (no Blob store)." }, { status: 503 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file." }, { status: 400 });
  if (file.size > 25 * 1024 * 1024) return NextResponse.json({ error: "Max 25MB." }, { status: 400 });

  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const blob = await put(`intercept-papers/${session.user.id}/${Date.now()}-${safe}`, file, {
    access: "public",
    contentType: file.type || undefined,
  });
  return NextResponse.json({ url: blob.url, name: file.name });
}
