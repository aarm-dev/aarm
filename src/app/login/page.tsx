import type { Metadata } from "next";
import { signIn, auth, signOut } from "@/auth";
import { isDbConfigured } from "@/db";
import Link from "next/link";

export const metadata: Metadata = { title: "Sign in — AARM" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const redirectTo = next || "/builders";
  const session = await auth();

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-24">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900">Sign in</h1>
      <p className="mb-8 text-sm text-neutral-500">
        Sign in with Google to <strong>claim your company&apos;s listing</strong> and keep it
        updated, or with GitHub for TWG admin access.
      </p>

      {!isDbConfigured && (
        <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          Authentication isn&apos;t live yet — the database and OAuth credentials still need to be
          provisioned. See the setup runbook.
        </div>
      )}

      {session?.user ? (
        <div className="rounded-xl border border-neutral-100 bg-white p-6 shadow-sm">
          <p className="mb-1 text-sm text-neutral-500">Signed in as</p>
          <p className="mb-4 font-semibold text-neutral-900">{session.user.email}</p>
          <div className="flex gap-3">
            <Link href="/builders" className="text-sm font-semibold" style={{ color: "#1A6EB5" }}>
              Browse builders →
            </Link>
            {(session.user as { isAdmin?: boolean }).isAdmin && (
              <Link href="/admin" className="text-sm font-semibold" style={{ color: "#1A6EB5" }}>
                Admin →
              </Link>
            )}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button className="text-sm text-neutral-400 hover:text-neutral-700">Sign out</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo });
            }}
          >
            <button className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
              Continue with Google
            </button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo });
            }}
          >
            <button className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">
              Continue with GitHub
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
