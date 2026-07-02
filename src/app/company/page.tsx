import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isDbConfigured } from "@/db";
import { getMyBuilder } from "@/lib/actions";

export const metadata: Metadata = { title: "Company — AARM" };
export const dynamic = "force-dynamic";

const STATUS: Record<string, string> = {
  not_started: "Not started",
  started: "In progress",
  in_review: "In review",
  verified: "Verified",
  declined: "Declined",
};

export default async function CompanyPage() {
  if (!isDbConfigured) {
    return <div className="mx-auto max-w-2xl px-6 py-24 text-center text-neutral-500">Not available yet.</div>;
  }
  const session = await auth();
  if (!session?.user?.id) redirect("/login?next=/company");

  const builder = await getMyBuilder();
  if (!builder) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="mb-3 text-2xl font-bold text-neutral-900">No company yet</h1>
        <p className="mb-6 text-neutral-500">
          You haven&apos;t claimed a company listing. Find your company in the registry and choose
          “Manage this listing” to verify ownership.
        </p>
        <Link href="/builders" className="text-sm font-semibold" style={{ color: "#1A6EB5" }}>Browse the registry →</Link>
      </div>
    );
  }

  const status = STATUS[builder.conformanceRequestStatus ?? "not_started"] ?? "Not started";

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">Your company</p>
      <h1 className="mb-10 text-3xl font-bold tracking-tight text-neutral-900">{builder.name}</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href={`/builders/${builder.slug}/edit`} className="group rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <h2 className="mb-1.5 font-semibold text-neutral-900 group-hover:text-blue-700">Company profile</h2>
          <p className="text-sm text-neutral-500">Edit your description, classification, technical profile, and point of contact.</p>
        </Link>
        <Link href="/my-conformance" className="group rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <h2 className="font-semibold text-neutral-900 group-hover:text-blue-700">Conformance</h2>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-neutral-500">{status}</span>
          </div>
          <p className="text-sm text-neutral-500">Start or track your AARM conformance review.</p>
        </Link>
      </div>

      <div className="mt-6">
        <Link href={`/builders/${builder.slug}`} className="text-sm font-semibold" style={{ color: "#1A6EB5" }}>
          View public page →
        </Link>
      </div>
    </div>
  );
}
