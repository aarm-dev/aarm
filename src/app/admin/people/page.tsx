import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isDbConfigured } from "@/db";
import { listPeople } from "@/lib/actions";
import { PeopleTable } from "@/components/people-table";

export const metadata: Metadata = { title: "People & roles — Admin" };
export const dynamic = "force-dynamic";

export default async function PeoplePage() {
  if (!isDbConfigured) {
    return <div className="mx-auto max-w-3xl px-6 py-24 text-center text-neutral-500">Database not configured.</div>;
  }
  const session = await auth();
  if (!session?.user?.id) redirect("/login?next=/admin/people");
  const u = session.user as { isAdmin?: boolean; isChair?: boolean };
  if (!u.isAdmin && !u.isChair) {
    return <div className="mx-auto max-w-3xl px-6 py-24 text-center text-neutral-500">Chair or admin access only.</div>;
  }

  const people = await listPeople();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/admin" className="mb-6 inline-block text-xs font-medium text-neutral-500 hover:text-neutral-800">← Admin</Link>
      <h1 className="mb-1 text-2xl font-bold tracking-tight text-neutral-900">People &amp; roles</h1>
      <p className="mb-8 text-sm text-neutral-500">
        Everyone who&apos;s signed in. Mark reviewers as <strong>Evaluator</strong> to give them the
        INTERCEPT blind-review console; <strong>Chair</strong> can manage people and review.
      </p>
      <PeopleTable people={people} />
    </div>
  );
}
