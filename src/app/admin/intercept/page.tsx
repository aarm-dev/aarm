import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";
import { auth } from "@/auth";
import { db, isDbConfigured } from "@/db";
import { interceptSignups } from "@/db/schema";

export const metadata: Metadata = { title: "INTERCEPT signups — Admin" };
export const dynamic = "force-dynamic";

export default async function InterceptSignupsPage() {
  if (!isDbConfigured || !db) {
    return <div className="mx-auto max-w-3xl px-6 py-24 text-center text-neutral-500">Database not configured.</div>;
  }
  const session = await auth();
  if (!session?.user?.id) redirect("/login?next=/admin/intercept");
  if (!(session.user as { isAdmin?: boolean }).isAdmin) {
    return <div className="mx-auto max-w-3xl px-6 py-24 text-center text-neutral-500">Admin access only.</div>;
  }

  const rows = await db.select().from(interceptSignups).orderBy(desc(interceptSignups.createdAt));
  const csv =
    "data:text/csv;charset=utf-8," +
    encodeURIComponent(
      ["email,name,company,role,created_at", ...rows.map((r) =>
        [r.email, r.name ?? "", r.company ?? "", r.role ?? "", new Date(r.createdAt).toISOString()]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
      )].join("\n")
    );

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/admin" className="mb-6 inline-block text-xs font-medium text-neutral-500 hover:text-neutral-800">← Admin</Link>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-bold tracking-tight text-neutral-900">INTERCEPT signups</h1>
          <p className="text-sm text-neutral-500">{rows.length} early-access request{rows.length === 1 ? "" : "s"}.</p>
        </div>
        {rows.length > 0 && (
          <a href={csv} download="intercept-signups.csv" className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
            Export CSV
          </a>
        )}
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-neutral-400">No signups yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-neutral-100">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-neutral-50">
              <tr className="border-b border-neutral-100">
                {["Email", "Name", "Company", "Role", "When"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-neutral-50 last:border-0">
                  <td className="px-4 py-2.5 font-medium text-neutral-800">{r.email}</td>
                  <td className="px-4 py-2.5 text-neutral-600">{r.name || "—"}</td>
                  <td className="px-4 py-2.5 text-neutral-600">{r.company || "—"}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] uppercase text-neutral-500">{r.role || "—"}</td>
                  <td className="px-4 py-2.5 text-xs text-neutral-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
