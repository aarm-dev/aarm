import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isDbConfigured } from "@/db";
import { getMyBuilder } from "@/lib/actions";

export const metadata: Metadata = { title: "Company — AARM" };
export const dynamic = "force-dynamic";

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

  // The company page is the profile editor — conformance lives under its own
  // dropdown item (/my-conformance).
  redirect(`/builders/${builder.slug}/edit`);
}
