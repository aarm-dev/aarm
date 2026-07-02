import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isDbConfigured } from "@/db";
import { getMyBuilder } from "@/lib/actions";
import { ConformanceStart } from "@/components/conformance-start";
import {
  ACTIVATION_CODE, MCP_SERVER_URL, CLAUDE_CODE_INSTALL, CLAUDE_DESKTOP_CONFIG, VALIDATION_STEPS,
} from "@/lib/conformance-config";

export const metadata: Metadata = { title: "My Conformance — AARM" };
export const dynamic = "force-dynamic";

const STATUS: Record<string, { label: string; cls: string }> = {
  not_started: { label: "Not started", cls: "bg-neutral-100 text-neutral-500" },
  started: { label: "In progress", cls: "bg-blue-50 text-blue-700" },
  in_review: { label: "In review", cls: "bg-amber-50 text-amber-700" },
  verified: { label: "Verified", cls: "bg-green-50 text-green-700" },
  declined: { label: "Declined", cls: "bg-red-50 text-red-600" },
};

export default async function MyConformancePage() {
  if (!isDbConfigured) {
    return <div className="mx-auto max-w-2xl px-6 py-24 text-center text-neutral-500">Not available yet.</div>;
  }
  const session = await auth();
  if (!session?.user?.id) redirect("/login?next=/my-conformance");

  const builder = await getMyBuilder();
  if (!builder) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="mb-3 text-2xl font-bold text-neutral-900">Claim your listing first</h1>
        <p className="mb-6 text-neutral-500">
          Conformance reviews are tied to your company listing. Find your company in the registry and
          choose “Manage this listing” to verify ownership.
        </p>
        <Link href="/builders" className="text-sm font-semibold" style={{ color: "#1A6EB5" }}>Browse the registry →</Link>
      </div>
    );
  }

  const status = builder.conformanceRequestStatus ?? "not_started";
  const pill = STATUS[status] ?? STATUS.not_started;
  const started = status !== "not_started";

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-2 flex items-center gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">My Conformance</p>
        <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide ${pill.cls}`}>{pill.label}</span>
      </div>
      <h1 className="mb-1 text-3xl font-bold tracking-tight text-neutral-900">{builder.name}</h1>
      <p className="mb-10 text-sm text-neutral-500">AARM conformance review for your product.</p>

      {!started ? (
        <>
          <p className="mb-6 text-neutral-600">
            Confirm you qualify, then start your review. The AARM Conformance Agent runs the
            assessment end-to-end against your implementation.
          </p>
          <ConformanceStart />
        </>
      ) : (
        <div className="space-y-10">
          {/* Assessment id + status */}
          <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">Your review</h2>
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              <Row label="Status">{pill.label}</Row>
              <Row label="Target level">{builder.conformanceTargetLevel ? (builder.conformanceTargetLevel === "extended" ? "Extended (R1–R9)" : "Core (R1–R6)") : "—"}</Row>
              <Row label="Assessment ID">
                {builder.conformanceAssessmentId
                  ? <code className="font-mono text-neutral-800">{builder.conformanceAssessmentId}</code>
                  : <span className="text-neutral-400">Appears here once your run starts on the MCP server.</span>}
              </Row>
            </dl>
            <p className="mt-4 text-xs text-neutral-400">
              We&apos;ll post status updates here as your review progresses.
            </p>
          </div>

          {/* Validation process — server-rendered; activation code is not in client code */}
          <section>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">Validation process</h2>
            <p className="mb-6 text-sm text-neutral-500">
              Conformance validation runs through the AARM Conformance MCP server — an agent runs the
              assessment end-to-end, no manual checklists.
            </p>

            <div className="mb-6 rounded-2xl border p-5" style={{ borderColor: "rgba(26,110,181,0.25)", backgroundColor: "rgba(26,110,181,0.04)" }}>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: "#1A6EB5" }}>Your activation code</div>
              <code className="text-lg font-bold tracking-wide text-neutral-900">{ACTIVATION_CODE}</code>
              <p className="mt-2 text-xs text-neutral-500">Provide this with your organization + product name and target level when the agent asks.</p>
            </div>

            <div className="space-y-3">
              {VALIDATION_STEPS.map((s) => (
                <div key={s.n} className="flex gap-4 rounded-xl border border-neutral-100 p-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ backgroundColor: "#1A6EB5" }}>{s.n}</div>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-neutral-900">{s.title}</p>
                    <p className="text-sm leading-relaxed text-neutral-500">{s.body}</p>
                    {s.n === "02" && <code className="mt-2 block rounded-lg bg-neutral-900 px-4 py-2.5 font-mono text-xs text-green-400">{MCP_SERVER_URL}</code>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-neutral-100 p-5">
                <h3 className="mb-3 text-sm font-semibold text-neutral-900">Install on Claude Code</h3>
                <pre className="overflow-x-auto rounded-lg bg-neutral-900 px-4 py-3 font-mono text-xs text-green-400">{CLAUDE_CODE_INSTALL}</pre>
              </div>
              <div className="rounded-xl border border-neutral-100 p-5">
                <h3 className="mb-3 text-sm font-semibold text-neutral-900">Install on Claude Desktop</h3>
                <pre className="overflow-x-auto rounded-lg bg-neutral-900 px-4 py-3 font-mono text-xs text-green-400">{CLAUDE_DESKTOP_CONFIG}</pre>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">{label}</dt>
      <dd className="text-neutral-700">{children}</dd>
    </div>
  );
}
