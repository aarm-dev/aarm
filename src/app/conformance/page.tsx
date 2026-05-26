import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conformance — AARM",
  description: "AARM conformance requirements, testing protocol, and how to claim conformance.",
};

const coreRequirements = [
  {
    id: "R1",
    title: "Pre-execution interception",
    level: "MUST",
    description:
      "The system MUST intercept every agent-initiated action before it is executed. No action may bypass the control plane.",
  },
  {
    id: "R2",
    title: "Context accumulation",
    level: "MUST",
    description:
      "The system MUST accumulate and maintain context about the agent's intent, prior actions, and the conversation or task thread.",
  },
  {
    id: "R3",
    title: "Policy evaluation with intent alignment",
    level: "MUST",
    description:
      "The system MUST evaluate each action against a policy that considers both the action itself and its alignment with the stated agent intent.",
  },
  {
    id: "R4",
    title: "Five authorization decisions",
    level: "MUST",
    description:
      "The policy engine MUST be capable of producing one of five decisions: ALLOW, DENY, MODIFY, STEP_UP, or DEFER.",
  },
  {
    id: "R5",
    title: "Tamper-evident receipts",
    level: "MUST",
    description:
      "The system MUST produce a tamper-evident receipt for every evaluated action, including the decision, timestamp, and relevant context.",
  },
  {
    id: "R6",
    title: "Identity binding",
    level: "MUST",
    description:
      "Every action receipt MUST be cryptographically bound to an agent identity.",
  },
];

const extendedRequirements = [
  {
    id: "R7",
    title: "Semantic distance tracking",
    level: "SHOULD",
    description:
      "The system SHOULD track semantic distance between proposed actions and the original stated intent, flagging drift over long task horizons.",
  },
  {
    id: "R8",
    title: "Telemetry export",
    level: "SHOULD",
    description:
      "The system SHOULD export action telemetry in a standard format (e.g. OpenTelemetry) for integration with SIEM and observability platforms.",
  },
  {
    id: "R9",
    title: "Least privilege enforcement",
    level: "SHOULD",
    description:
      "The system SHOULD enforce least-privilege scoping of agent credentials and tool access at the time of action execution.",
  },
];

const steps = [
  "Satisfy all MUST requirements (R1–R6) for Core, or R1–R9 for Extended.",
  "Complete the testing protocol and compile evidence for each requirement.",
  "Engage with the working group community before submitting.",
  "Operate the system in a production environment with real agent workloads.",
  "Submit your evidence package and wait up to 14 days for the conformance report.",
];

export default function ConformancePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* Header */}
      <div className="mb-14">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Conformance
        </p>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl tracking-tight">
          Conformance Requirements
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Two levels: <strong>AARM Core</strong> (R1–R6, all MUST) for baseline conformance
          and <strong>AARM Extended</strong> (R1–R9) for mature implementations.
        </p>
      </div>

      {/* Levels */}
      <div className="mb-14 grid gap-3 sm:grid-cols-2">
        <div
          className="rounded-lg border p-5"
          style={{ borderColor: "rgba(26, 110, 181, 0.3)", backgroundColor: "rgba(26, 110, 181, 0.04)" }}
        >
          <div
            className="font-mono text-xs uppercase tracking-widest mb-2"
            style={{ color: "#1A6EB5" }}
          >
            AARM Core
          </div>
          <div className="text-2xl font-bold font-mono mb-2">R1 – R6</div>
          <p className="text-sm text-muted-foreground">
            All six requirements are MUST. Baseline for AARM conformance.
          </p>
        </div>
        <div className="rounded-lg border border-border/60 p-5 bg-muted/20">
          <div className="font-mono text-xs uppercase tracking-widest mb-2 text-muted-foreground">
            AARM Extended
          </div>
          <div className="text-2xl font-bold font-mono mb-2">R1 – R9</div>
          <p className="text-sm text-muted-foreground">
            Core + three SHOULD requirements for advanced governance.
          </p>
        </div>
      </div>

      {/* Core */}
      <section className="mb-14">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
          Core Requirements — MUST
        </h2>
        <div className="space-y-2">
          {coreRequirements.map((r) => (
            <div key={r.id} className="rounded-lg border border-border/60 p-5 hover:border-border transition-colors">
              <div className="flex items-start gap-4">
                <code
                  className="font-mono text-xs font-bold shrink-0 mt-0.5 px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(26, 110, 181, 0.1)",
                    color: "#1A6EB5",
                    border: "1px solid rgba(26, 110, 181, 0.2)",
                  }}
                >
                  {r.id}
                </code>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold">{r.title}</span>
                    <code className="font-mono text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded">
                      {r.level}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extended */}
      <section className="mb-14">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
          Extended Requirements — SHOULD
        </h2>
        <div className="space-y-2">
          {extendedRequirements.map((r) => (
            <div key={r.id} className="rounded-lg border border-border/40 p-5 bg-muted/10 hover:border-border/60 transition-colors">
              <div className="flex items-start gap-4">
                <code className="font-mono text-xs font-bold shrink-0 mt-0.5 px-2 py-0.5 rounded text-muted-foreground bg-muted border border-border">
                  {r.id}
                </code>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold">{r.title}</span>
                    <code className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                      {r.level}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to claim */}
      <section className="mb-14">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
          How to claim conformance
        </h2>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4 text-sm text-muted-foreground">
              <code className="font-mono text-xs text-muted-foreground/60 shrink-0 w-4 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </code>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Links */}
      <div className="flex flex-wrap gap-3 border-t border-border/40 pt-8">
        <Link
          href="/spec"
          className="rounded-md px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          style={{ background: "linear-gradient(135deg, #F5923A 0%, #D45420 100%)" }}
        >
          Full specification →
        </Link>
        <Link
          href="/builders"
          className="rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
        >
          Conformant builders
        </Link>
      </div>
    </div>
  );
}
