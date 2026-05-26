import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — AARM",
  description:
    "What AARM is, why it exists, and how it works. The open standard for AI agent runtime security.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section
        className="border-b border-blue-100"
        style={{ backgroundColor: "#EEF4FF" }}
      >
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-sm text-blue-700 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            About AARM
          </div>
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            What is AARM?
          </h1>
          <p className="text-xl leading-relaxed text-neutral-500">
            Autonomous Action Runtime Management (AARM) is an open specification
            that defines what a security system must do before an AI agent executes
            any action — in any environment, at any scale.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          {/* Problem */}
          <div className="mb-14">
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-neutral-900">
              The problem AARM solves
            </h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                AI agents don&rsquo;t just generate text — they take actions. They browse the web,
                write and execute code, send emails, make API calls, and manage files. As agents
                become more capable and more widely deployed, the blast radius of a mistake or
                a compromise grows with them.
              </p>
              <p>
                Before AARM, there was no shared language for what &ldquo;secure agent execution&rdquo;
                means. Security teams couldn&rsquo;t evaluate products consistently. Builders had no
                common benchmark to build to. Enterprises had no basis for comparison.
              </p>
              <p>
                AARM changes that. It specifies a minimal, verifiable set of behaviors that any
                runtime security system must implement before it can claim to govern AI agent
                actions safely.
              </p>
            </div>
          </div>

          {/* Five steps */}
          <div className="mb-14">
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-neutral-900">
              The five-step control loop
            </h2>
            <p className="mb-7 text-neutral-500 leading-relaxed">
              Every AARM-conformant system must implement a five-step control loop around
              each agent action — before the action is executed.
            </p>
            <div className="space-y-3">
              {[
                {
                  n: "01",
                  title: "Intercept",
                  desc: "Capture every agent-initiated action before it reaches the environment. No action may bypass the control plane.",
                },
                {
                  n: "02",
                  title: "Accumulate",
                  desc: "Build a running context from the agent's stated intent, prior actions in the session, and the task thread.",
                },
                {
                  n: "03",
                  title: "Evaluate",
                  desc: "Run the action against a policy that considers both what the action does and whether it aligns with the agent's original intent.",
                },
                {
                  n: "04",
                  title: "Decide",
                  desc: "Produce one of five outcomes: ALLOW the action, DENY it, MODIFY it to be safe, STEP_UP to require human approval, or DEFER for later review.",
                },
                {
                  n: "05",
                  title: "Record",
                  desc: "Produce a tamper-evident receipt for every evaluation — timestamped, identity-bound, and cryptographically verifiable.",
                },
              ].map((step) => (
                <div
                  key={step.n}
                  className="flex gap-4 rounded-xl border border-neutral-100 bg-white p-5"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                    style={{ backgroundColor: "#1A6EB5" }}
                  >
                    {step.n}
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900">{step.title} — </span>
                    <span className="text-sm leading-relaxed text-neutral-500">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two levels */}
          <div className="mb-14">
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-neutral-900">
              Two conformance levels
            </h2>
            <p className="mb-7 text-neutral-500 leading-relaxed">
              AARM defines two levels of conformance, so implementations can start
              with a strong baseline and grow into full governance maturity.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-green-100 bg-white p-6">
                <div className="mb-3 font-mono text-xs uppercase tracking-widest text-green-700">
                  AARM Core
                </div>
                <div className="mb-2 font-mono text-3xl font-bold text-neutral-900">R1–R6</div>
                <p className="text-sm leading-relaxed text-neutral-500">
                  All six requirements are mandatory. Covers the full intercept-accumulate-evaluate-decide-record
                  cycle plus cryptographic identity binding. This is the baseline for conformance claims.
                </p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white p-6">
                <div className="mb-3 font-mono text-xs uppercase tracking-widest" style={{ color: "#1A6EB5" }}>
                  AARM Extended
                </div>
                <div className="mb-2 font-mono text-3xl font-bold text-neutral-900">R1–R9</div>
                <p className="text-sm leading-relaxed text-neutral-500">
                  Core plus three additional SHOULD requirements: semantic drift tracking across
                  long task horizons, OpenTelemetry-compatible telemetry export, and runtime
                  least-privilege enforcement.
                </p>
              </div>
            </div>
          </div>

          {/* Threat model */}
          <div className="mb-14">
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-neutral-900">
              What it defends against
            </h2>
            <p className="mb-6 text-neutral-500 leading-relaxed">
              The AARM threat model covers 11 classes of attack on agentic AI systems.
              An AARM-conformant implementation addresses all of them.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Prompt injection",
                "Data exfiltration",
                "Confused deputy",
                "Goal hijacking",
                "Memory poisoning",
                "Intent drift",
                "Cross-agent propagation",
                "Over-privileged credentials",
                "Side-channel leakage",
                "Environmental manipulation",
                "Malicious tool output",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-sm text-neutral-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Origins */}
          <div className="mb-14">
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-neutral-900">
              Origins and governance
            </h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                AARM was developed by a Technical Working Group (TWG) operating under the
                Cloud Security Alliance — the world&rsquo;s leading organization dedicated to
                defining and raising awareness of best practices for secure cloud computing.
              </p>
              <p>
                The specification was first published in early 2026 and is versioned publicly
                on GitHub. The TWG meets regularly to review proposals, validate conformance
                claims, and extend the threat model as the agentic AI landscape evolves.
              </p>
              <p>
                Conformance is community-verified: builders submit an evidence package
                against the published testing protocol, and the TWG reviews and approves
                conformance claims. There is no proprietary certification body — the standard
                is open and the process is transparent.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 border-t border-neutral-100 pt-8">
            <a
              href="https://github.com/aarm-dev/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-85"
              style={{ background: "linear-gradient(135deg, #F5923A 0%, #D45420 100%)" }}
            >
              Read the specification →
            </a>
            <Link
              href="/conformance"
              className="rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              Conformance requirements
            </Link>
            <Link
              href="/working-group"
              className="rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              Working group
            </Link>
            <a
              href="https://arxiv.org/abs/2602.09433"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              arXiv paper
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
