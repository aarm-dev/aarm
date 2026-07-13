import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isDbConfigured } from "@/db";
import { getReviewQueue } from "@/lib/actions";
import { ReviewConsole } from "@/components/review-console";

export const metadata: Metadata = { title: "Review console — INTERCEPT" };
export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  if (!isDbConfigured) {
    return <div className="min-h-screen bg-[#0A0A0A] px-6 py-24 text-center font-mono text-sm text-neutral-500">Not available yet.</div>;
  }
  const session = await auth();
  if (!session?.user?.id) redirect("/login?next=/intercept/review");
  const u = session.user as { isAdmin?: boolean; isChair?: boolean; isEvaluator?: boolean };
  if (!u.isAdmin && !u.isChair && !u.isEvaluator) {
    return <div className="min-h-screen bg-[#0A0A0A] px-6 py-24 text-center font-mono text-sm text-neutral-500">Evaluator access only.</div>;
  }

  const queue = await getReviewQueue();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200" style={{ fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace" }}>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <nav className="mb-6 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <Link href="/intercept" className="hover:text-white">INTERCEPT</Link>
          <span className="mx-2 text-neutral-700">/</span>
          <span className="text-neutral-300">Review console</span>
        </nav>
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-white" style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "2px" }}>BLIND REVIEW</h1>
          <span className="border border-neutral-700 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-neutral-400">Anonymous</span>
        </div>
        <p className="mb-8 max-w-2xl font-mono text-sm text-neutral-500">
          Submissions are anonymized. Score each section 1&ndash;10 and leave a comment; mark the review
          completed once all three are scored.
        </p>
        <ReviewConsole queue={queue} />
      </div>
    </div>
  );
}
