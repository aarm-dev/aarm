import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { isDbConfigured } from "@/db";
import { getSpeakerProfile, getMyPaper } from "@/lib/actions";
import { CfpForm } from "@/components/cfp-form";

export const metadata: Metadata = { title: "Call for Papers — INTERCEPT" };
export const dynamic = "force-dynamic";

const STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: "Pending review", cls: "text-[#FF7A00] border-[#FF7A00]" },
  under_review: { label: "Under review", cls: "text-[#2EFF7B] border-[#2EFF7B]" },
  accepted: { label: "Accepted", cls: "text-[#2EFF7B] border-[#2EFF7B]" },
  rejected: { label: "Not selected", cls: "text-[#FF3B30] border-[#FF3B30]" },
};

export default async function CfpPage() {
  const session = isDbConfigured ? await auth() : null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200" style={{ fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace" }}>
      <div className="mx-auto max-w-3xl px-6 py-14">
        {/* Breadcrumbs */}
        <nav className="mb-8 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <Link href="/intercept" className="hover:text-white">INTERCEPT</Link>
          <span className="mx-2 text-neutral-700">/</span>
          <span className="text-neutral-300">Call for Papers</span>
        </nav>

        {!isDbConfigured ? (
          <p className="text-neutral-500">Submissions open once the database is provisioned.</p>
        ) : !session?.user?.id ? (
          <div className="space-y-6">
            <h1 className="text-white" style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "2px" }}>Sign in to submit</h1>
            <p className="max-w-xl font-mono text-sm text-neutral-400">Use the same sign-in as the AARM registry. Then build your speaker profile and submit your paper.</p>
            <div className="flex gap-3">
              <form action={async () => { "use server"; await signIn("google", { redirectTo: "/intercept/cfp" }); }}>
                <button className="border border-neutral-700 px-5 py-2.5 font-mono text-sm text-neutral-200 hover:border-[#FF7A00] hover:text-[#FF7A00]">Continue with Google</button>
              </form>
              <form action={async () => { "use server"; await signIn("github", { redirectTo: "/intercept/cfp" }); }}>
                <button className="border border-neutral-700 px-5 py-2.5 font-mono text-sm text-neutral-200 hover:border-[#FF7A00] hover:text-[#FF7A00]">Continue with GitHub</button>
              </form>
            </div>
          </div>
        ) : (
          <CfpBody />
        )}
      </div>
    </div>
  );
}

async function CfpBody() {
  const profile = await getSpeakerProfile();
  const paper = await getMyPaper();
  const status = paper ? STATUS[paper.status] ?? STATUS.pending : null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-white" style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "2px" }}>CALL FOR PAPERS</h1>
        {status && <span className={`border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest ${status.cls}`}>{status.label}</span>}
      </div>

      {/* Anonymize banner */}
      <div className="mb-8 border-l-2 border-[#FF3B30] bg-[#FF3B30]/10 px-4 py-3">
        <p className="font-mono text-sm text-[#FFB4AE]">
          <span className="font-bold text-[#FF3B30]">Blind review:</span> do <strong>not</strong> include your
          name or company name anywhere in the talk title or sections. Doing so will disqualify your submission.
        </p>
      </div>

      {paper && (
        <div className="mb-8 border border-neutral-800 bg-neutral-950 p-5 font-mono text-sm text-neutral-400">
          Submitted as <span className="text-white">Paper #{paper.number}</span> — status{" "}
          <span className="text-[#FF7A00]">{(status ?? STATUS.pending).label}</span>. You can update it below until review begins.
        </div>
      )}

      <CfpForm profile={profile} paper={paper} />
    </div>
  );
}
