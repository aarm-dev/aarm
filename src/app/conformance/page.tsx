import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conformance — AARM",
  description: "AARM conformance requirements, validation process, and how to claim conformance.",
};

const coreRequirements = [
  { id: "R1", title: "Pre-execution interception", level: "MUST", description: "The system MUST intercept every agent-initiated action before it is executed. No action may bypass the control plane." },
  { id: "R2", title: "Context accumulation", level: "MUST", description: "The system MUST accumulate and maintain context about the agent's intent, prior actions, and the conversation or task thread." },
  { id: "R3", title: "Policy evaluation with intent alignment", level: "MUST", description: "The system MUST evaluate each action against a policy that considers both the action itself and its alignment with the stated agent intent." },
  { id: "R4", title: "Five authorization decisions", level: "MUST", description: "The policy engine MUST be capable of producing one of five decisions: ALLOW, DENY, MODIFY, STEP_UP, or DEFER." },
  { id: "R5", title: "Tamper-evident receipts", level: "MUST", description: "The system MUST produce a tamper-evident receipt for every evaluated action, including the decision, timestamp, and relevant context." },
  { id: "R6", title: "Identity binding", level: "MUST", description: "Every action receipt MUST be cryptographically bound to an agent identity." },
];

const extendedRequirements = [
  { id: "R7", title: "Semantic distance tracking", level: "SHOULD", description: "The system SHOULD track semantic distance between proposed actions and the original stated intent, flagging drift over long task horizons." },
  { id: "R8", title: "Telemetry export", level: "SHOULD", description: "The system SHOULD export action telemetry in a standard format (e.g. OpenTelemetry) for integration with SIEM and observability platforms." },
  { id: "R9", title: "Least privilege enforcement", level: "SHOULD", description: "The system SHOULD enforce least-privilege scoping of agent credentials and tool access at the time of action execution." },
];

const orgRequirements = [
  {
    condition: "Community engagement",
    verification: "Verify TWG membership or participation in conformance discussions",
    expected: "Organization has an active representative in the AARM community",
  },
  {
    condition: "Production deployment",
    verification: "Confirm the system is deployed and serving active customers",
    expected: "System is live in production with at least 5 active production customers running for a minimum of 3 months",
  },
  {
    condition: "Security certification",
    verification: "Request evidence of certification",
    expected: "Organization holds at least one recognized security certification (e.g., SOC 2 Type II, ISO 27001, FedRAMP) relevant to the operating environment",
  },
  {
    condition: "Benchmarking commitment",
    verification: "Confirm willingness to participate",
    expected: "Organization agrees to participate in future AARM benchmarking efforts measuring policy detection and enforcement metrics",
  },
];

const technicalTests = [
  { req: "R1", test: "Submit action matching DENY policy", expected: "Action does not execute; denial receipt generated", level: "MUST" },
  { req: "R1", test: "Submit action matching DEFER condition", expected: "Action suspended; no effects; deferral receipt generated", level: "MUST" },
  { req: "R1", test: "Make AARM system unavailable, submit action", expected: "Action fails (no fail-open bypass)", level: "MUST" },
  { req: "R2", test: "Execute action sequence, inspect context at step N", expected: "Policy engine receives all prior actions and data classifications", level: "MUST" },
  { req: "R2", test: "Tamper with prior context entry (if hash-chained)", expected: "Tampering detected", level: "SHOULD" },
  { req: "R3", test: "Submit forbidden action", expected: "Immediate DENY regardless of context", level: "MUST" },
  { req: "R3", test: "Submit allowed action after sensitive data access (context-dependent deny)", expected: "DENY based on context", level: "MUST" },
  { req: "R3", test: "Submit denied action with confirming context (context-dependent allow)", expected: "STEP_UP or ALLOW", level: "MUST" },
  { req: "R3", test: "Submit action with ambiguous/conflicting context", expected: "DEFER", level: "MUST" },
  { req: "R4", test: "Trigger each of 5 decision types", expected: "ALLOW executes, DENY blocks, MODIFY transforms, STEP_UP pauses, DEFER suspends", level: "MUST" },
  { req: "R4", test: "STEP_UP with no response within timeout", expected: "DENY after timeout", level: "MUST" },
  { req: "R4", test: "DEFER with no resolution within timeout", expected: "DENY after timeout", level: "MUST" },
  { req: "R5", test: "Generate receipts for ALLOW, DENY, MODIFY, STEP_UP, DEFER", expected: "Requester context, delegation chain, and policy version/hash present per schema", level: "MUST" },
  { req: "R5", test: "Verify receipt signature offline", expected: "Signature validates", level: "MUST" },
  { req: "R5", test: "Tamper with requester context or policy hash in receipt", expected: "Signature verification fails", level: "MUST" },
  { req: "R5", test: "Verify deferred action receipt", expected: "Deferral reason, resolution method, resolution timestamp present", level: "MUST" },
  { req: "R6", test: "Submit from different principals and sessions", expected: "Receipts correctly attribute identity including role/privilege scope", level: "MUST" },
  { req: "R6", test: "Defer action, then resolve", expected: "Original identity preserved in resolution receipt", level: "MUST" },
  { req: "R7", test: "Execute diverging action sequence exceeding drift threshold", expected: "Alert, deferral, or escalation triggered", level: "SHOULD" },
  { req: "R8", test: "Configure SIEM export", expected: "Events appear with correct schema including DEFER events", level: "SHOULD" },
  { req: "R9", test: "Submit read operation", expected: "Issued credential cannot perform writes", level: "SHOULD" },
];

export default function ConformancePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">

      {/* Header */}
      <div className="mb-14">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">Conformance</p>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl tracking-tight text-neutral-900">
          Conformance Requirements
        </h1>
        <p className="text-neutral-500 leading-relaxed">
          Two levels: <strong>AARM Core</strong> (R1–R6, all MUST) for baseline conformance
          and <strong>AARM Extended</strong> (R1–R9) for mature implementations.
        </p>
      </div>

      {/* Levels */}
      <div className="mb-14 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border p-5" style={{ borderColor: "rgba(26,110,181,0.25)", backgroundColor: "rgba(26,110,181,0.04)" }}>
          <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "#1A6EB5" }}>AARM Core</div>
          <div className="text-2xl font-bold font-mono mb-2 text-neutral-900">R1 – R6</div>
          <p className="text-sm text-neutral-500">All six requirements are MUST. Baseline for AARM conformance.</p>
        </div>
        <div className="rounded-xl border border-neutral-200 p-5 bg-neutral-50">
          <div className="font-mono text-xs uppercase tracking-widest mb-2 text-neutral-400">AARM Extended</div>
          <div className="text-2xl font-bold font-mono mb-2 text-neutral-900">R1 – R9</div>
          <p className="text-sm text-neutral-500">Core + three SHOULD requirements for advanced governance.</p>
        </div>
      </div>

      {/* Core Requirements */}
      <section className="mb-14">
        <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">Core Requirements — MUST</h2>
        <div className="space-y-2">
          {coreRequirements.map((r) => (
            <div key={r.id} className="rounded-xl border border-neutral-100 p-5 hover:border-neutral-200 transition-colors">
              <div className="flex items-start gap-4">
                <code className="font-mono text-xs font-bold shrink-0 mt-0.5 px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(26,110,181,0.08)", color: "#1A6EB5", border: "1px solid rgba(26,110,181,0.15)" }}>
                  {r.id}
                </code>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-neutral-900">{r.title}</span>
                    <code className="font-mono text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded">{r.level}</code>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed">{r.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extended Requirements */}
      <section className="mb-14">
        <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">Extended Requirements — SHOULD</h2>
        <div className="space-y-2">
          {extendedRequirements.map((r) => (
            <div key={r.id} className="rounded-xl border border-neutral-100 p-5 bg-neutral-50/50 hover:border-neutral-200 transition-colors">
              <div className="flex items-start gap-4">
                <code className="font-mono text-xs font-bold shrink-0 mt-0.5 px-2 py-0.5 rounded text-neutral-500 bg-neutral-100 border border-neutral-200">
                  {r.id}
                </code>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-neutral-900">{r.title}</span>
                    <code className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">{r.level}</code>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed">{r.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Validation Process */}
      <section className="mb-14">
        <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Validation Process</h2>
        <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
          Conformance validation is performed through the <strong className="text-neutral-700">AARM Conformance MCP server</strong>. An agent runs the assessment end-to-end against your implementation — no manual checklists.
        </p>

        <div className="space-y-4 mb-10">
          {[
            {
              n: "01",
              title: "Request an activation key",
              desc: "Submit the form below with your organization name, product name, and target conformance level (Core or Extended). If your organization is on the allow-list, you will receive an activation key by email. Only listed organizations can run the assessment.",
            },
            {
              n: "02",
              title: "Connect to the AARM MCP server",
              desc: "Add the server to Claude Desktop or Claude Code using the instructions below.",
              code: "https://aarm-conformance-mcp.herman-d10.workers.dev/",
            },
            {
              n: "03",
              title: "Run the assessment",
              desc: "Start a conversation with Claude and ask it to run the AARM conformance assessment. The agent will walk through each check, collect evidence, and produce a validation report.",
            },
          ].map((step) => (
            <div key={step.n} className="flex gap-4 rounded-xl border border-neutral-100 bg-white p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ backgroundColor: "#1A6EB5" }}>
                {step.n}
              </div>
              <div className="min-w-0">
                <p className="mb-1 text-sm font-semibold text-neutral-900">{step.title}</p>
                <p className="text-sm leading-relaxed text-neutral-500">{step.desc}</p>
                {step.code && (
                  <code className="mt-2 block rounded-lg bg-neutral-900 px-4 py-2.5 font-mono text-xs text-green-400">
                    {step.code}
                  </code>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Install instructions */}
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          <div className="rounded-xl border border-neutral-100 p-5">
            <h3 className="mb-3 text-sm font-semibold text-neutral-900">Install on Claude Code</h3>
            <p className="mb-3 text-xs text-neutral-500">Run this in your terminal:</p>
            <pre className="overflow-x-auto rounded-lg bg-neutral-900 px-4 py-3 font-mono text-xs text-green-400">
              {`claude mcp add --transport http aarm-conformance https://aarm-conformance-mcp.herman-d10.workers.dev/`}
            </pre>
            <p className="mt-3 text-xs text-neutral-500">Then launch Claude Code and ask it to start the AARM conformance assessment.</p>
          </div>
          <div className="rounded-xl border border-neutral-100 p-5">
            <h3 className="mb-3 text-sm font-semibold text-neutral-900">Install on Claude Desktop</h3>
            <p className="mb-2 text-xs text-neutral-500">Add to your <code className="font-mono text-[11px] bg-neutral-100 px-1 py-0.5 rounded">claude_desktop_config.json</code>:</p>
            <pre className="overflow-x-auto rounded-lg bg-neutral-900 px-4 py-3 font-mono text-xs text-green-400">
              {`{
  "mcpServers": {
    "aarm-conformance": {
      "type": "http",
      "url": "https://aarm-conformance-mcp.herman-d10.workers.dev/"
    }
  }
}`}
            </pre>
          </div>
        </div>

        {/* Request access form */}
        <div className="rounded-xl border border-neutral-100 p-6">
          <h3 className="mb-2 text-sm font-semibold text-neutral-900">Request access</h3>
          <p className="mb-4 text-sm text-neutral-500">Submit your organization details to receive an activation key.</p>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdTjaSGNVLm8IAvOP29MZmqBorJ5h4oognTQc5tFRQEo9TfGg/viewform?embedded=true"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
          >
            Loading…
          </iframe>
        </div>
      </section>

      {/* Organizational Requirements */}
      <section className="mb-14">
        <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Organizational Requirements</h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          In addition to technical requirements, organizations must satisfy the following conditions to publicly describe their system as AARM-conformant.
        </p>
        <div className="overflow-hidden rounded-xl border border-neutral-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Condition</th>
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400 hidden sm:table-cell">Verification</th>
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Expected Result</th>
              </tr>
            </thead>
            <tbody>
              {orgRequirements.map((r, i) => (
                <tr key={r.condition} className={i < orgRequirements.length - 1 ? "border-b border-neutral-50" : ""}>
                  <td className="px-4 py-3 font-medium text-neutral-700 align-top">{r.condition}</td>
                  <td className="px-4 py-3 text-neutral-500 align-top hidden sm:table-cell">{r.verification}</td>
                  <td className="px-4 py-3 text-neutral-500 align-top">{r.expected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical Testing */}
      <section className="mb-14">
        <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Technical Testing</h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          Each requirement includes a minimum test to confirm conformance. All MUST tests are required for Core conformance; SHOULD tests are required for Extended.
        </p>
        <div className="overflow-hidden rounded-xl border border-neutral-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Req</th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Test</th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Expected Result</th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Level</th>
                </tr>
              </thead>
              <tbody>
                {technicalTests.map((t, i) => (
                  <tr key={i} className={i < technicalTests.length - 1 ? "border-b border-neutral-50" : ""}>
                    <td className="px-4 py-3 align-top">
                      <code className="rounded px-1.5 py-0.5 font-mono text-[11px] font-bold" style={t.level === "MUST" ? { backgroundColor: "rgba(26,110,181,0.08)", color: "#1A6EB5" } : { backgroundColor: "rgba(107,114,128,0.08)", color: "#6B7280" }}>
                        {t.req}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 align-top">{t.test}</td>
                    <td className="px-4 py-3 text-neutral-500 align-top">{t.expected}</td>
                    <td className="px-4 py-3 align-top">
                      <span className={`font-mono text-[10px] font-bold uppercase ${t.level === "MUST" ? "text-blue-600" : "text-neutral-400"}`}>
                        {t.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Links */}
      <div className="flex flex-wrap gap-3 border-t border-neutral-100 pt-8">
        <Link
          href="/spec"
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          style={{ background: "linear-gradient(135deg, #F5923A 0%, #D45420 100%)" }}
        >
          Full specification →
        </Link>
        <Link
          href="/builders"
          className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Conformant builders
        </Link>
      </div>
    </div>
  );
}
