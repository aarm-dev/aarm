import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isDbConfigured } from "@/db";
import { NewBuilderForm } from "@/components/new-builder-form";

export const metadata: Metadata = { title: "Add your company — AARM" };
export const dynamic = "force-dynamic";

export default async function NewBuilderPage() {
  if (!isDbConfigured) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center text-neutral-500">
        Submissions open once the database is provisioned.
      </div>
    );
  }
  const session = await auth();
  if (!session?.user?.id) redirect("/login?next=/builders/new");

  return <NewBuilderForm />;
}
