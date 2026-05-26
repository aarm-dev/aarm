import Link from "next/link";
import { BUILDERS } from "@/data/builders";

const conformantCount = BUILDERS.filter((b) => b.conformance === "Conformant").length;
const conformantBuilders = BUILDERS.filter((b) => b.conformance === "Conformant").slice(0, 6);

function faviconUrl(url: string) {
  const domain = url.replace(/https?:\/\/(www\.)?/, "").split("/")[0];
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-blue-100"
        style={{ backgroundColor: "#EEF4FF" }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40' stroke='%23A5B4FC' stroke-width='0.5' fill='none'/%3E%3Cpath d='M40 20 L60 40 L40 60 L20 40 Z' stroke='%23A5B4FC' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-sm text-blue-700 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            A Cloud Security Alliance Powered Project
          </div>

          <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-extrabold leading-[1.08] tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
            The system category for{" "}
            <span style={{ color: "#1A6EB5" }}>agentic runtime security.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-neutral-500">
            AARM defines the security controls an AI agent runtime must implement
            before any action is executed — intercept, evaluate against policy,
            decide, and produce a tamper-evident record.
          </p>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/spec"
              className="rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-85"
              style={{ background: "linear-gradient(135deg, #F5923A 0%, #D45420 100%)" }}
            >
              Read the Specification
            </Link>
            <Link
              href="/builders"
              className="rounded-xl border border-neutral-200 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50"
            >
              Browse Builders
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500">
            {[
              `${BUILDERS.length}+ Builders`,
              `${conformantCount} Conformant Products`,
              "16 TWG Members",
              "CSA Verified",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <svg className="h-4 w-4 shrink-0" style={{ color: "#1A6EB5" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* Conformance levels */}
      <section className="border-b border-neutral-100 bg-neutral-50/60 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-neutral-900">
              Two conformance levels
            </h2>
            <p className="mx-auto max-w-xl text-neutral-500">
              Clear requirements for products serious about AI agent security.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-green-100 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-700">
                ✓ AARM Core
              </div>
              <div className="mb-2 font-mono text-4xl font-bold text-neutral-900">R1 – R6</div>
              <p className="mb-6 text-sm leading-relaxed text-neutral-500">
                All six requirements are MUST. Satisfying these is the baseline for
                AARM conformance — pre-execution interception through identity binding.
              </p>
              <Link href="/conformance" className="text-sm font-semibold transition-opacity hover:opacity-70" style={{ color: "#1A6EB5" }}>
                View requirements →
              </Link>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                ✦ AARM Extended
              </div>
              <div className="mb-2 font-mono text-4xl font-bold text-neutral-900">R1 – R9</div>
              <p className="mb-6 text-sm leading-relaxed text-neutral-500">
                Core plus three SHOULD requirements: semantic drift tracking,
                telemetry export, and least-privilege enforcement.
              </p>
              <Link href="/conformance" className="text-sm font-semibold transition-opacity hover:opacity-70" style={{ color: "#1A6EB5" }}>
                View requirements →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Conformant builders preview */}
      <section className="border-b border-neutral-100 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight text-neutral-900">
                Conformant builders
              </h2>
              <p className="text-neutral-500">
                Products that satisfy AARM specification requirements.
              </p>
            </div>
            <Link
              href="/builders"
              className="shrink-0 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#1A6EB5" }}
            >
              All {BUILDERS.length}+ builders →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {conformantBuilders.map((b) => (
              <a
                key={b.name}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3.5 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
                  <img src={faviconUrl(b.url)} alt="" width={24} height={24} className="rounded-sm" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900">{b.name}</span>
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-700 border border-green-100">
                      conformant
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-500 line-clamp-2">{b.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Threat model */}
      <section className="border-b border-neutral-100 bg-neutral-50/60 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-neutral-900">
              11 threat classes addressed
            </h2>
            <p className="mx-auto max-w-xl text-neutral-500">
              AARM systems are designed to defend against all known classes of attack on agentic AI.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Prompt injection", "Data exfiltration", "Confused deputy",
              "Goal hijacking", "Memory poisoning", "Intent drift",
              "Cross-agent propagation", "Over-privileged credentials",
              "Side-channel leakage", "Environmental manipulation", "Malicious tool output",
            ].map((t) => (
              <span
                key={t}
                className="rounded-lg border border-neutral-200 bg-white px-3.5 py-1.5 text-sm text-neutral-600 shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: "linear-gradient(135deg, #1A6EB5 0%, #1E4FA0 100%)" }}
          >
            <div className="mb-2 font-mono text-xs uppercase tracking-widest text-blue-200">
              Cloud Security Alliance
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Join the AARM Working Group
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-blue-100">
              An open standard built by security practitioners, researchers,
              and builders. Come shape the future of AI agent security.
            </p>
            <a
              href="https://cloudsecurityalliance.org/research/working-groups/autonomous-action-runtime-management-aarm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-blue-700 transition-opacity hover:opacity-90"
            >
              Join the CSA Working Group
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
