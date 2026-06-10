import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { db, isDbConfigured } from "@/db";
import { builders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EditForm } from "@/components/edit-form";

export const dynamic = "force-dynamic";

export default async function EditBuilderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isDbConfigured || !db) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center text-neutral-500">
        Editing isn&apos;t available until the database is provisioned.
      </div>
    );
  }

  const session = await auth();
  if (!session?.user?.id) redirect(`/login?next=/builders/${slug}/edit`);

  const [builder] = await db.select().from(builders).where(eq(builders.slug, slug)).limit(1);
  if (!builder) notFound();

  const isOwner = builder.claimedBy === session.user.id;
  const isAdmin = (session.user as { isAdmin?: boolean }).isAdmin;
  if (!isOwner && !isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="mb-4 text-neutral-500">You haven&apos;t claimed this listing yet.</p>
        <Link href={`/builders/${slug}`} className="text-sm font-semibold" style={{ color: "#1A6EB5" }}>
          ← Back to {builder.name}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link href={`/builders/${slug}`} className="mb-6 inline-block text-xs font-medium text-neutral-500 hover:text-neutral-800">
        ← Back to listing
      </Link>
      <h1 className="mb-1 text-2xl font-bold tracking-tight text-neutral-900">Edit {builder.name}</h1>
      <p className="mb-8 text-sm text-neutral-500">Update your marketing details and classification.</p>
      <EditForm builder={builder} />
    </div>
  );
}
