import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BUILDER_DETAILS } from "@/data/builder-details";
import { BUILDERS } from "@/data/builders";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BUILDER_DETAILS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const builder = BUILDER_DETAILS.find((b) => b.slug === slug);
  if (!builder) return {};
  return {
    title: `${builder.name} — AARM Builder`,
    description: builder.tagline,
  };
}

function faviconUrl(url: string) {
  const domain = url.replace(/https?:\/\/(www\.)?/, "").split("/")[0];
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

export default async function BuilderDetailPage({ params }: Props) {
  const { slug } = await params;
  const builder = BUILDER_DETAILS.find((b) => b.slug === slug);
  if (!builder) notFound();

  const isExtended = builder.conformanceLevel === "Extended";

  const allReqs = [
    { id: "R1", title: "Pre-execution interception", level: "MUST" },
    { id: "R2", title: "Context accumulation", level: "MUST" },
    { id: "R3", title: "Policy evaluation with intent alignment", level: "MUST" },
    { id: "R4", title: "Five authorization decisions", level: "MUST" },
    { id: "R5", title: "Tamper-evident receipts", level: "MUST" },
    { id: "R6", title: "Identity binding", level: "MUST" },
    { id: "R7", title: "Semantic distance tracking", level: "SHOULD" },
    { id: "R8", title: "Telemetry export", level: "SHOULD" },
    { id: "R9", title: "Least privilege enforcement", level: "SHOULD" },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b border-blue-100" style={{ backgroundColor: "#EEF4FF" }}>
        <div className="mx-auto max-w-4xl px-6 py-14">
          <Link
            href="/builders"
            className="mb-8 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-800"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M5 12l7 7M5 12l7-7" />
            </svg>
            Builder Registry
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <img src={faviconUrl(builder.url)} alt="" width={32} height={32} className="rounded-sm" />
            </div>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">{builder.name}</h1>
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide ${
                    isExtended
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-green-200 bg-green-50 text-green-700"
                  }`}
                >
                  {isExtended ? "✦ AARM Extended" : "✓ AARM Core"}
                </span>
              </div>
              <p className="text-sm text-neutral-500">{builder.tagline}</p>
              <a
                href={builder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70"
                style={{ color: "#1A6EB5" }}
              >
                {builder.url.replace(/https?:\/\/(www\.)?/, "")} ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-14">
        {/* Stats */}
        <div className="mb-14 grid grid-cols-3 gap-4">
          {[
            { label: "Status", value: "Conformant", green: true },
            { label: "Tier", value: `${builder.conformanceLevel} (${isExtended ? "R1–R9" : "R1–R6"})` },
            { label: "Verified", value: builder.verifiedDate },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
              <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-neutral-400">{s.label}</div>
              <div className={`text-sm font-semibold ${s.green ? "text-green-700" : "text-neutral-900"}`}>
                {s.green && <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-green-500" />}
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* About */}
        <section className="mb-14">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">Description</h2>
          <p className="leading-relaxed text-neutral-600">{builder.about}</p>
        </section>

        {/* Capabilities */}
        <section className="mb-14">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">Platform Capabilities</h2>
          <ul className="space-y-2">
            {builder.capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-2.5 text-sm text-neutral-600">
                <svg className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#1A6EB5" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {cap}
              </li>
            ))}
          </ul>
        </section>

        {/* Conformance record */}
        <section className="mb-14">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-neutral-400">Conformance Record</h2>

          <div className="mb-6 grid gap-2 text-sm sm:grid-cols-2">
            {[
              { label: "Specification version", value: "AARM v1.0" },
              { label: "Conformance tier", value: `${builder.conformanceLevel} (${isExtended ? "R1–R9" : "R1–R6"})` },
              { label: "Verified by", value: "Herman Errico, AARM Author" },
              { label: "Date", value: builder.verifiedDate },
            ].map((row) => (
              <div key={row.label} className="flex justify-between rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-2.5">
                <span className="text-neutral-400">{row.label}</span>
                <span className="font-medium text-neutral-700">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-neutral-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Req</th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Requirement</th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Level</th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {allReqs.map((req) => {
                  const match = builder.requirements.find((r) => r.id === req.id);
                  const status = match?.status ?? "na";
                  return (
                    <tr key={req.id} className="border-b border-neutral-50 last:border-0">
                      <td className="px-4 py-3">
                        <code
                          className="rounded px-1.5 py-0.5 font-mono text-xs font-bold"
                          style={req.level === "MUST"
                            ? { backgroundColor: "rgba(26,110,181,0.08)", color: "#1A6EB5" }
                            : { backgroundColor: "rgba(107,114,128,0.08)", color: "#6B7280" }}
                        >
                          {req.id}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-neutral-700">
                        {req.title}
                        {match?.notes && <span className="ml-1.5 text-xs text-neutral-400">— {match.notes}</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-mono text-[10px] font-bold uppercase ${req.level === "MUST" ? "text-blue-600" : "text-neutral-400"}`}>
                          {req.level}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {status === "pass" && <span className="text-green-600">✅ Met</span>}
                        {status === "fail" && <span className="text-red-500">❌ Not met</span>}
                        {status === "na" && <span className="text-neutral-300">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-14">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">Architecture</h2>
          <p className="leading-relaxed text-neutral-600">{builder.architecture}</p>
        </section>

        {/* Key Facts */}
        <section className="mb-14">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">Key Facts</h2>
          <div className="overflow-hidden rounded-xl border border-neutral-100">
            <table className="w-full text-sm">
              <tbody>
                {builder.keyFacts.map((fact, i) => (
                  <tr key={fact.label} className={i < builder.keyFacts.length - 1 ? "border-b border-neutral-50" : ""}>
                    <td className="w-40 px-4 py-3 text-neutral-400">{fact.label}</td>
                    <td className="px-4 py-3 font-medium text-neutral-700">{fact.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Contact */}
        {builder.contact && (
          <section className="mb-14">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">Contact</h2>
            <div className="overflow-hidden rounded-xl border border-neutral-100">
              <table className="w-full text-sm">
                <tbody>
                  {builder.contact.map((c, i) => (
                    <tr key={c.label} className={i < (builder.contact?.length ?? 0) - 1 ? "border-b border-neutral-50" : ""}>
                      <td className="w-40 px-4 py-3 text-neutral-400">{c.label}</td>
                      <td className="px-4 py-3">
                        {c.href ? (
                          <a href={c.href} target="_blank" rel="noopener noreferrer" className="font-medium transition-opacity hover:opacity-70" style={{ color: "#1A6EB5" }}>
                            {c.value} ↗
                          </a>
                        ) : (
                          <span className="font-medium text-neutral-700">{c.value}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Footer note */}
        <div className="border-t border-neutral-100 pt-8 text-xs text-neutral-400">
          This page is maintained by the AARM Technical Working Group.{" "}
          <a href="https://github.com/aarm-dev/aarm/issues" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-600">
            Report an inaccuracy →
          </a>
        </div>
      </div>
    </div>
  );
}
