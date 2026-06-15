import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, isDbConfigured } from "@/db";
import { builders } from "@/db/schema";
import { AdminBuilderForm } from "@/components/admin-builder-form";

export const dynamic = "force-dynamic";

export default async function AdminBuilderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isDbConfigured || !db) {
    return <div className="mx-auto max-w-2xl px-6 py-24 text-center text-neutral-500">Database not configured.</div>;
  }
  const session = await auth();
  if (!session?.user?.id) redirect(`/login?next=/admin/${slug}`);
  if (!(session.user as { isAdmin?: boolean }).isAdmin) {
    return <div className="mx-auto max-w-2xl px-6 py-24 text-center text-neutral-500">Admin access only.</div>;
  }

  const [builder] = await db.select().from(builders).where(eq(builders.slug, slug)).limit(1);
  if (!builder) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/admin" className="mb-6 inline-block text-xs font-medium text-neutral-500 hover:text-neutral-800">← Admin</Link>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{builder.name}</h1>
        <Link href={`/builders/${builder.slug}`} className="text-sm font-semibold" style={{ color: "#1A6EB5" }}>View page →</Link>
      </div>
      <p className="mb-8 text-sm text-neutral-500">
        TWG conformance editor — writes directly to the database, regardless of claim status.
      </p>
      <AdminBuilderForm builder={builder} />
    </div>
  );
}
