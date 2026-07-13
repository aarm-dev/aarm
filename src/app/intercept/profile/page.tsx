import type { Metadata } from "next";
import Link from "next/link";
import { auth, signIn } from "@/auth";
import { isDbConfigured } from "@/db";
import { getSpeakerProfile, getMyPaper } from "@/lib/actions";
import { ProfileForm } from "@/components/profile-form";

export const metadata: Metadata = { title: "Your profile — INTERCEPT" };
export const dynamic = "force-dynamic";

const STATUS: Record<string, string> = {
  pending: "Pending review", under_review: "Under review", accepted: "Accepted", rejected: "Not selected",
};

export default async function ProfilePage() {
  const session = isDbConfigured ? await auth() : null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200" style={{ fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace" }}>
      <div className="mx-auto max-w-3xl px-6 py-14">
        <nav className="mb-8 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <Link href="/intercept" className="hover:text-white">INTERCEPT</Link>
          <span className="mx-2 text-neutral-700">/</span>
          <span className="text-neutral-300">Your profile</span>
        </nav>

        {!isDbConfigured ? (
          <p className="text-neutral-500">Not available yet.</p>
        ) : !session?.user?.id ? (
          <div className="space-y-6">
            <h1 className="text-white" style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "2px" }}>Sign in to get started</h1>
            <p className="max-w-xl font-mono text-sm text-neutral-400">Use the same sign-in as the AARM registry. You&apos;ll create your speaker profile, then decide whether to submit a paper.</p>
            <div className="flex gap-3">
              <form action={async () => { "use server"; await signIn("google", { redirectTo: "/intercept/profile" }); }}>
                <button className="border border-neutral-700 px-5 py-2.5 font-mono text-sm text-neutral-200 hover:border-[#FF7A00] hover:text-[#FF7A00]">Continue with Google</button>
              </form>
              <form action={async () => { "use server"; await signIn("github", { redirectTo: "/intercept/profile" }); }}>
                <button className="border border-neutral-700 px-5 py-2.5 font-mono text-sm text-neutral-200 hover:border-[#FF7A00] hover:text-[#FF7A00]">Continue with GitHub</button>
              </form>
            </div>
          </div>
        ) : (
          <ProfileBody />
        )}
      </div>
    </div>
  );
}

async function ProfileBody() {
  const profile = await getSpeakerProfile();
  const paper = await getMyPaper();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-2 text-white" style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "2px" }}>YOUR PROFILE</h1>
        <p className="mb-6 max-w-xl font-mono text-sm text-neutral-500">
          {profile ? "Update your speaker details any time." : "Create your speaker profile to get started. You can submit a paper next."}
        </p>
        <ProfileForm profile={profile} />
      </div>

      {/* Submit a paper — enabled once a profile exists */}
      <div className="border-t border-neutral-800 pt-8">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-[#FF7A00]">Call for Papers</h2>
        {!profile ? (
          <p className="font-mono text-sm text-neutral-500">Create your profile above, then you can submit a paper.</p>
        ) : paper ? (
          <div className="flex flex-wrap items-center gap-4">
            <div className="font-mono text-sm text-neutral-300">
              Your submission: <span className="text-white">Paper #{paper.number}</span> ·{" "}
              <span className="text-[#FF7A00]">{STATUS[paper.status] ?? "Pending review"}</span>
            </div>
            <Link href="/intercept/cfp" className="border border-neutral-700 px-4 py-2 font-mono text-xs uppercase tracking-widest text-neutral-200 hover:border-[#FF7A00] hover:text-[#FF7A00]">View / edit submission</Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="max-w-xl font-mono text-sm text-neutral-400">Ready to speak at INTERCEPT? Submit a paper for blind review.</p>
            <Link href="/intercept/cfp" className="inline-block border-2 border-[#FF7A00] bg-[#FF7A00] px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-[#FF7A00]">
              [ Submit a Paper ]
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
