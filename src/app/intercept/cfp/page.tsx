import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isDbConfigured } from "@/db";
import { getSpeakerProfile, getMyPaper, getMyPaperReviews } from "@/lib/actions";
import { CfpForm } from "@/components/cfp-form";

export const metadata: Metadata = { title: "Submit a paper — INTERCEPT" };
export const dynamic = "force-dynamic";

const STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: "Pending review", cls: "text-[#FF7A00] border-[#FF7A00]" },
  under_review: { label: "Under review", cls: "text-[#2EFF7B] border-[#2EFF7B]" },
  accepted: { label: "Accepted", cls: "text-[#2EFF7B] border-[#2EFF7B]" },
  rejected: { label: "Not selected", cls: "text-[#FF3B30] border-[#FF3B30]" },
};

export default async function CfpPage() {
  if (!isDbConfigured) {
    return <div className="min-h-screen bg-[#0A0A0A] px-6 py-24 text-center font-mono text-sm text-neutral-500">Submissions open once the database is provisioned.</div>;
  }
  const session = await auth();
  if (!session?.user?.id) redirect("/intercept/profile");

  const profile = await getSpeakerProfile();
  if (!profile) redirect("/intercept/profile"); // must create a profile first

  const paper = await getMyPaper();
  const status = paper ? STATUS[paper.status] ?? STATUS.pending : null;
  const decided = paper?.status === "accepted" || paper?.status === "rejected";
  const { reviews } = decided ? await getMyPaperReviews() : { reviews: [] };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200" style={{ fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace" }}>
      <div className="mx-auto max-w-3xl px-6 py-14">
        <nav className="mb-8 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <Link href="/intercept" className="hover:text-white">INTERCEPT</Link>
          <span className="mx-2 text-neutral-700">/</span>
          <Link href="/intercept/profile" className="hover:text-white">Profile</Link>
          <span className="mx-2 text-neutral-700">/</span>
          <span className="text-neutral-300">Submit a paper</span>
        </nav>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h1 className="text-white" style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "2px" }}>SUBMIT A PAPER</h1>
          {status && <span className={`border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest ${status.cls}`}>{status.label}</span>}
        </div>

        {/* Anonymize banner */}
        <div className="mb-8 border-l-2 border-[#FF3B30] bg-[#FF3B30]/10 px-4 py-3">
          <p className="font-mono text-sm text-[#FFB4AE]">
            <span className="font-bold text-[#FF3B30]">Blind review:</span> do <strong>not</strong> include your
            name or company name anywhere in the talk title or sections. Doing so will disqualify your submission.
          </p>
        </div>

        {paper && !decided && (
          <div className="mb-8 border border-neutral-800 bg-neutral-950 p-5 font-mono text-sm text-neutral-400">
            Submitted as <span className="text-white">Paper #{paper.number}</span>. You can update it below until review begins.
          </div>
        )}

        {/* Reviewer feedback — shown once a decision is made (blind) */}
        {decided && (
          <div className="mb-10">
            <div className="mb-4 border p-5 font-mono text-sm" style={{ borderColor: paper!.status === "accepted" ? "#2EFF7B" : "#FF3B30" }}>
              <span className={paper!.status === "accepted" ? "text-[#2EFF7B]" : "text-[#FF3B30]"}>
                {paper!.status === "accepted" ? "Accepted" : "Not selected"}
              </span>
              <span className="text-neutral-400"> — Paper #{paper!.number}. {reviews.length} blind review{reviews.length === 1 ? "" : "s"} below.</span>
            </div>
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="border border-neutral-800 bg-neutral-950 p-5">
                  <div className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-[#FF7A00]">Evaluator {i + 1}</div>
                  <div className="space-y-2 font-mono text-sm">
                    {([["Core topics", r.scoreCore, r.commentCore], ["Key takeaways", r.scoreTakeaways, r.commentTakeaways], ["Why it matters", r.scoreRelevance, r.commentRelevance]] as const).map(([lab, sc, cm], j) => (
                      <div key={j}>
                        <span className="text-neutral-500">{lab}: </span>
                        <span className="text-white">{sc != null ? `${sc}/10` : "—"}</span>
                        {cm ? <div className="mt-0.5 text-neutral-400">{cm}</div> : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {reviews.length === 0 && <p className="font-mono text-sm text-neutral-600">No written feedback was recorded.</p>}
            </div>
          </div>
        )}

        {!decided && <CfpForm paper={paper} />}
      </div>
    </div>
  );
}
