import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { get } from "@vercel/blob";
import { auth } from "@/auth";
import { db } from "@/db";
import { papers } from "@/db/schema";

export const runtime = "nodejs";
export const maxDuration = 30;

// Streams a CFP paper PDF from the private Blob store. Papers are never served
// via a public URL — access is gated here to the author, evaluators, and chairs
// so blind review stays sealed.
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const user = session?.user as
      | { id?: string; isAdmin?: boolean; isChair?: boolean; isEvaluator?: boolean }
      | undefined;
    if (!user?.id) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (!db) return NextResponse.json({ error: "Not configured." }, { status: 503 });

    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing paper id." }, { status: 400 });

    const [paper] = await db.select().from(papers).where(eq(papers.id, id)).limit(1);
    if (!paper) return NextResponse.json({ error: "Not found." }, { status: 404 });

    const isAuthor = paper.userId === user.id;
    const canReview = Boolean(user.isAdmin || user.isChair || user.isEvaluator);
    if (!isAuthor && !canReview) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    if (!paper.fileUrl) return NextResponse.json({ error: "No file attached." }, { status: 404 });

    const result = await get(paper.fileUrl, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return NextResponse.json({ error: "File unavailable." }, { status: 404 });
    }

    const filename = (paper.fileName || `paper-${paper.number}.pdf`).replace(/[^a-zA-Z0-9._-]/g, "_");
    return new NextResponse(result.stream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    console.error("[intercept paper]", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed." }, { status: 500 });
  }
}
