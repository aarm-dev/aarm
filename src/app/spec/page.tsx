"use client";

import React, { useState, useEffect } from "react";

const versions = [
  {
    id: "v1",
    label: "v1.0",
    status: "published",
    date: "February 2026",
  },
  {
    id: "v2",
    label: "v2.0",
    status: "coming-soon",
    date: "Coming soon",
  },
];

const sections = [
  { id: "abstract", label: "Abstract" },
  { id: "status", label: "Status of This Document" },
  { id: "definitions", label: "1. Definitions" },
  { id: "threat-model", label: "2. Threat Model" },
  { id: "core-requirements", label: "3. Core Requirements" },
  { id: "extended-requirements", label: "4. Extended Requirements" },
  { id: "conformance", label: "5. Conformance Criteria" },
  { id: "architecture", label: "6. Implementation Architectures" },
  { id: "references", label: "References" },
];

function Must() {
  return (
    <span className="rounded px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: "#1A6EB5" }}>
      MUST
    </span>
  );
}

function Should() {
  return (
    <span className="rounded px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: "#6B7280" }}>
      SHOULD
    </span>
  );
}

function Req({ id, title, level, children }: { id: string; title: string; level: "MUST" | "SHOULD"; children: React.ReactNode }) {
  return (
    <div
      className="mb-4 rounded-xl border p-5"
      style={level === "MUST"
        ? { borderColor: "rgba(26,110,181,0.2)", backgroundColor: "rgba(26,110,181,0.03)" }
        : { borderColor: "rgba(107,114,128,0.2)", backgroundColor: "rgba(107,114,128,0.03)" }}
    >
      <div className="mb-2 flex items-center gap-2.5">
        <code className="rounded px-2 py-0.5 font-mono text-xs font-bold" style={level === "MUST"
          ? { backgroundColor: "rgba(26,110,181,0.1)", color: "#1A6EB5" }
          : { backgroundColor: "rgba(107,114,128,0.1)", color: "#6B7280" }}>
          {id}
        </code>
        <span className="text-sm font-semibold text-neutral-800">{title}</span>
        {level === "MUST" ? <Must /> : <Should />}
      </div>
      <p className="text-sm leading-relaxed text-neutral-600">{children}</p>
    </div>
  );
}

export default function SpecPage() {
  const [activeVersion, setActiveVersion] = useState("v1");
  const [activeSection, setActiveSection] = useState("abstract");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-neutral-100 lg:block">
        <div className="sticky top-16 overflow-y-auto" style={{ height: "calc(100vh - 64px)" }}>
          <div className="px-5 py-7">
            {/* Versions */}
            <div className="mb-6">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Versions
              </p>
              <div className="space-y-1">
                {versions.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => v.status === "published" && setActiveVersion(v.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                      v.status === "coming-soon"
                        ? "cursor-default opacity-50"
                        : activeVersion === v.id
                        ? "bg-neutral-900 text-white"
                        : "hover:bg-neutral-50 text-neutral-700"
                    }`}
                  >
                    <span className="font-mono text-sm font-medium">{v.label}</span>
                    {v.status === "published" ? (
                      <span className="rounded-full bg-green-50 border border-green-200 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-green-700">
                        current
                      </span>
                    ) : (
                      <span className="rounded-full bg-neutral-100 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-neutral-400">
                        soon
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5 h-px bg-neutral-100" />

            {/* Sections */}
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Contents
              </p>
              <nav className="space-y-0.5">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActiveSection(s.id)}
                    className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      activeSection === s.id
                        ? "font-medium text-neutral-900 bg-neutral-100"
                        : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-6 border-t border-neutral-100 pt-5">
              <a
                href="https://arxiv.org/abs/2602.09433"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-xs text-neutral-500 transition-colors hover:border-neutral-300 hover:text-neutral-700"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                arXiv:2602.09433
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-2xl">

          {/* Document header */}
          <div className="mb-10 border-b border-neutral-100 pb-10">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              Cloud Security Alliance · Technical Working Group Specification
            </p>
            <h1 className="mb-1 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Autonomous Action Runtime Management
            </h1>
            <p className="mb-6 text-lg text-neutral-500">System Category Specification</p>

            <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 font-mono text-sm">
              {[
                ["Version", "1.0"],
                ["Status", "Published"],
                ["Date", "February 2026"],
                ["Author", "Herman Errico"],
                ["DOI", "arXiv:2602.09433"],
                ["License", "CC BY 4.0"],
              ].map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt className="text-neutral-400">{k}</dt>
                  <dd className="text-neutral-700">{v}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>

          {/* Abstract */}
          <section id="abstract" className="mb-14 scroll-mt-20">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">Abstract</h2>
            <p className="leading-relaxed text-neutral-700">
              This specification establishes a framework for securing artificial intelligence systems during
              action execution. As AI systems evolve from advisory tools into autonomous agents capable of
              consequential real-world actions, the security boundary shifts from model outputs to tool execution.
              AARM defines a control plane that intercepts, evaluates, decides on, and records every agent-initiated
              action before it is executed — regardless of the underlying model, framework, or environment.
            </p>
            <p className="mt-4 leading-relaxed text-neutral-700">
              The framework provides vendor-neutral requirements organized into nine specification requirements
              (R1–R9), grouped into Core (R1–R6, all <Must />) and Extended (R7–R9, <Should />) conformance levels.
              It formalizes protections against eleven threat classes including prompt injection, confused deputy
              attacks, data exfiltration, and intent drift.
            </p>
          </section>

          {/* Status */}
          <section id="status" className="mb-14 scroll-mt-20">
            <h2 className="mb-4 text-xl font-bold text-neutral-900">Status of This Document</h2>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 text-sm leading-relaxed text-neutral-600">
              <p className="mb-3">
                This document is the <strong>v1.0 specification</strong> of AARM, published February 2026 under
                the Cloud Security Alliance Technical Working Group. It is a stable, published specification.
              </p>
              <p className="mb-3">
                Feedback and contributions are welcome via the{" "}
                <a href="https://github.com/aarm-dev/docs" target="_blank" rel="noopener noreferrer" className="underline decoration-neutral-300 hover:decoration-neutral-600" style={{ color: "#1A6EB5" }}>
                  GitHub repository
                </a>. Errata will be tracked as issues.
              </p>
              <p>
                Work on <strong>v2.0</strong> is planned. Version 2 will extend the threat model, introduce
                multi-agent coordination requirements, and add guidance for stateful long-horizon task governance.
              </p>
            </div>
          </section>

          {/* Definitions */}
          <section id="definitions" className="mb-14 scroll-mt-20">
            <h2 className="mb-6 text-xl font-bold text-neutral-900">1. Definitions</h2>
            <p className="mb-6 text-sm leading-relaxed text-neutral-500">
              Keywords <Must /> and <Should /> in this document are to be interpreted as described in RFC 2119.
            </p>
            <dl className="space-y-5">
              {[
                {
                  term: "Autonomous Action",
                  def: "A decision made by an AI system that produces a real-world consequence without continuous human intervention. Distinct from advisory or informational outputs. Examples include API calls, file writes, shell commands, and network requests.",
                },
                {
                  term: "Runtime Management",
                  def: "Governance mechanisms that operate during action execution — not preprocessing or planning phases. The temporal distinction is critical: runtime controls can intercept and halt actions before consequences are incurred.",
                },
                {
                  term: "Control Plane",
                  def: "The infrastructure layer that sits between an agent and the environments it can affect. Every agent-initiated action passes through the control plane before execution.",
                },
                {
                  term: "Agent Intent",
                  def: "The stated objective or task assigned to an agent at the beginning of a session or task thread. Used as the reference point against which proposed actions are evaluated for alignment.",
                },
                {
                  term: "Action Receipt",
                  def: "A tamper-evident record produced for each evaluated action. Contains the action, decision, timestamp, agent identity, and relevant evaluation context. Serves as the basis for audit and forensic analysis.",
                },
                {
                  term: "AARM Core",
                  def: "Conformance level requiring satisfaction of all six MUST requirements (R1–R6). Baseline for claiming AARM conformance.",
                },
                {
                  term: "AARM Extended",
                  def: "Conformance level requiring satisfaction of all nine requirements (R1–R9), including the three SHOULD requirements (R7–R9). Indicates a mature governance implementation.",
                },
              ].map(({ term, def }) => (
                <div key={term} className="grid grid-cols-[auto_1fr] gap-x-6 text-sm">
                  <dt className="w-44 shrink-0 font-semibold text-neutral-800">{term}</dt>
                  <dd className="leading-relaxed text-neutral-600">{def}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Threat model */}
          <section id="threat-model" className="mb-14 scroll-mt-20">
            <h2 className="mb-2 text-xl font-bold text-neutral-900">2. Threat Model</h2>
            <p className="mb-6 text-sm leading-relaxed text-neutral-500">
              AARM systems are designed to defend against the following eleven threat classes.
              A conformant implementation must address all of them.
            </p>
            <div className="space-y-3">
              {[
                { n: "T1", name: "Prompt Injection", desc: "Malicious content in the agent's environment causes it to execute attacker-controlled actions in place of the user's intent." },
                { n: "T2", name: "Confused Deputy", desc: "An agent is manipulated into using its legitimate credentials or access to perform actions on behalf of an unauthorized party." },
                { n: "T3", name: "Data Exfiltration", desc: "Sensitive data accessed by the agent during a task is extracted to an unauthorized destination via tool calls or output channels." },
                { n: "T4", name: "Goal Hijacking", desc: "An agent's objective is covertly replaced or corrupted mid-session, causing it to pursue goals inconsistent with user intent." },
                { n: "T5", name: "Memory Poisoning", desc: "Persistent state (conversation history, retrieved documents, tool outputs) is contaminated to influence future agent decisions." },
                { n: "T6", name: "Intent Drift", desc: "An agent gradually deviates from its original stated intent over a long task horizon, performing actions that are technically permitted but misaligned." },
                { n: "T7", name: "Cross-Agent Propagation", desc: "Malicious instructions or compromised state spreads from one agent to another in a multi-agent pipeline." },
                { n: "T8", name: "Over-Privileged Credentials", desc: "An agent operates with broader access rights than required for its task, amplifying the blast radius of any compromise." },
                { n: "T9", name: "Side-Channel Leakage", desc: "Information is inferred from agent behavior, timing, or tool call patterns rather than direct output." },
                { n: "T10", name: "Environmental Manipulation", desc: "The environment an agent interacts with is modified by an attacker to cause unintended behavior (e.g., altered file contents, injected API responses)." },
                { n: "T11", name: "Malicious Tool Output", desc: "A tool or external service returns adversarial content designed to hijack the agent's subsequent actions." },
              ].map(({ n, name, desc }) => (
                <div key={n} className="flex gap-4 text-sm">
                  <code className="mt-0.5 w-8 shrink-0 font-mono text-xs text-neutral-400">{n}</code>
                  <div>
                    <span className="font-semibold text-neutral-800">{name} — </span>
                    <span className="leading-relaxed text-neutral-600">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Core requirements */}
          <section id="core-requirements" className="mb-14 scroll-mt-20">
            <h2 className="mb-2 text-xl font-bold text-neutral-900">3. Core Requirements</h2>
            <p className="mb-6 text-sm leading-relaxed text-neutral-500">
              All six requirements in this section are <Must />. Satisfying R1–R6 qualifies a system for
              AARM Core conformance.
            </p>
            <Req id="R1" title="Pre-execution interception" level="MUST">
              The system <Must /> intercept every agent-initiated action before it is executed.
              No action may bypass the control plane. This requirement is non-negotiable: a system
              that allows any action to execute without interception provides no meaningful runtime guarantee.
            </Req>
            <Req id="R2" title="Context accumulation" level="MUST">
              The system <Must /> accumulate and maintain context about the agent's stated intent,
              prior actions in the current session, and the conversation or task thread. Context must
              be available to the policy evaluation layer at the time of each decision.
            </Req>
            <Req id="R3" title="Policy evaluation with intent alignment" level="MUST">
              The system <Must /> evaluate each intercepted action against a policy that considers
              both the action itself and its alignment with the agent's stated intent. Policies that
              evaluate actions in isolation without intent context do not satisfy this requirement.
            </Req>
            <Req id="R4" title="Five authorization decisions" level="MUST">
              The policy engine <Must /> be capable of producing exactly one of five decisions for
              each evaluated action: <strong>ALLOW</strong> (execute as-is), <strong>DENY</strong>{" "}
              (block execution), <strong>MODIFY</strong> (execute a transformed version),{" "}
              <strong>STEP_UP</strong> (require human approval before execution), or{" "}
              <strong>DEFER</strong> (delay execution pending additional context).
            </Req>
            <Req id="R5" title="Tamper-evident receipts" level="MUST">
              The system <Must /> produce a tamper-evident action receipt for every evaluated action.
              Each receipt must include at minimum: the original action, the decision, the timestamp,
              and the policy context used in evaluation. Receipts must be verifiable against unauthorized
              modification.
            </Req>
            <Req id="R6" title="Identity binding" level="MUST">
              Every action receipt <Must /> be cryptographically bound to an agent identity.
              The binding must be verifiable and must uniquely identify the agent that initiated
              the action, supporting non-repudiation.
            </Req>
          </section>

          {/* Extended requirements */}
          <section id="extended-requirements" className="mb-14 scroll-mt-20">
            <h2 className="mb-2 text-xl font-bold text-neutral-900">4. Extended Requirements</h2>
            <p className="mb-6 text-sm leading-relaxed text-neutral-500">
              The three requirements below are <Should />. Satisfying R1–R9 qualifies a system for
              AARM Extended conformance.
            </p>
            <Req id="R7" title="Semantic distance tracking" level="SHOULD">
              The system <Should /> track the semantic distance between proposed actions and the
              agent's original stated intent, flagging drift over long task horizons. This requirement
              addresses T6 (intent drift) and is especially relevant for agents operating autonomously
              over extended sessions.
            </Req>
            <Req id="R8" title="Telemetry export" level="SHOULD">
              The system <Should /> export action telemetry in a standard, interoperable format
              (e.g., OpenTelemetry) suitable for ingestion by SIEM platforms and observability
              infrastructure. Proprietary-only export formats do not satisfy this requirement.
            </Req>
            <Req id="R9" title="Least privilege enforcement" level="SHOULD">
              The system <Should /> enforce least-privilege scoping of agent credentials and tool
              access at the time of action execution. Credentials should be scoped to the minimum
              necessary for each action, not granted session-wide or system-wide.
            </Req>
          </section>

          {/* Conformance */}
          <section id="conformance" className="mb-14 scroll-mt-20">
            <h2 className="mb-6 text-xl font-bold text-neutral-900">5. Conformance Criteria</h2>
            <p className="mb-6 text-sm leading-relaxed text-neutral-500">
              A system may claim conformance to one of two levels. Claims must be supported by an
              evidence package reviewed by the AARM Technical Working Group.
            </p>
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-green-100 bg-white p-5">
                <div className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-green-700">AARM Core</div>
                <div className="mb-2 font-mono text-2xl font-bold text-neutral-900">R1 – R6</div>
                <p className="text-sm text-neutral-500">All six MUST requirements satisfied. Baseline conformance.</p>
              </div>
              <div className="rounded-xl border border-blue-100 bg-white p-5">
                <div className="mb-2 font-mono text-xs font-bold uppercase tracking-wider" style={{ color: "#1A6EB5" }}>AARM Extended</div>
                <div className="mb-2 font-mono text-2xl font-bold text-neutral-900">R1 – R9</div>
                <p className="text-sm text-neutral-500">All nine requirements including R7–R9 SHOULD requirements.</p>
              </div>
            </div>
            <h3 className="mb-3 text-sm font-semibold text-neutral-800">How to claim conformance</h3>
            <ol className="space-y-3">
              {[
                "Satisfy all MUST requirements (R1–R6) for Core, or R1–R9 for Extended.",
                "Complete the testing protocol and compile evidence for each requirement.",
                "Engage with the working group community before submitting.",
                "Operate the system in a production environment with real agent workloads.",
                "Submit your evidence package. Allow up to 14 days for the conformance report.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4 text-sm text-neutral-600">
                  <code className="font-mono text-xs text-neutral-400 shrink-0 mt-0.5 w-5">
                    {String(i + 1).padStart(2, "0")}
                  </code>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Architecture */}
          <section id="architecture" className="mb-14 scroll-mt-20">
            <h2 className="mb-6 text-xl font-bold text-neutral-900">6. Implementation Architectures</h2>
            <p className="mb-6 text-sm leading-relaxed text-neutral-500">
              The specification is implementation-neutral. Four reference architectures are recognized,
              each with distinct trust properties and deployment trade-offs.
            </p>
            <div className="space-y-4">
              {[
                {
                  n: "6.1",
                  title: "Protocol Gateway",
                  desc: "A network-layer proxy that intercepts agent-to-tool communication at the protocol level. Provides strong isolation guarantees but requires routing all agent traffic through the gateway. Suitable for environments where network topology can be controlled.",
                },
                {
                  n: "6.2",
                  title: "SDK Instrumentation",
                  desc: "Intercepts action calls via integration with the agent framework's SDK. Lower deployment friction than the gateway model but requires trust in the SDK integration. May not intercept actions made through non-instrumented paths.",
                },
                {
                  n: "6.3",
                  title: "Kernel eBPF",
                  desc: "Uses kernel-level eBPF hooks to intercept system calls made by agent processes. Provides deep visibility and is difficult for an agent to bypass, but requires elevated privileges and kernel compatibility. Best suited for containerized production environments.",
                },
                {
                  n: "6.4",
                  title: "Vendor Integration",
                  desc: "Action interception is provided natively by the AI platform or tool vendor as part of their API surface. Lowest deployment friction but dependent on vendor implementation quality and coverage.",
                },
              ].map(({ n, title, desc }) => (
                <div key={n} className="rounded-xl border border-neutral-100 bg-white p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <code className="font-mono text-xs text-neutral-400">{n}</code>
                    <span className="text-sm font-semibold text-neutral-800">{title}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-500">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* References */}
          <section id="references" className="mb-14 scroll-mt-20">
            <h2 className="mb-6 text-xl font-bold text-neutral-900">References</h2>
            <div className="space-y-3 font-mono text-sm text-neutral-600">
              <div className="flex gap-4">
                <span className="shrink-0 text-neutral-400">[1]</span>
                <span>Errico, H. (2026). <em>Autonomous Action Runtime Management (AARM): A System Specification for Securing AI-Driven Actions at Runtime.</em> arXiv:2602.09433 [cs.CR].</span>
              </div>
              <div className="flex gap-4">
                <span className="shrink-0 text-neutral-400">[2]</span>
                <span>Bradner, S. (1997). <em>Key words for use in RFCs to Indicate Requirement Levels.</em> RFC 2119. IETF.</span>
              </div>
              <div className="flex gap-4">
                <span className="shrink-0 text-neutral-400">[3]</span>
                <span>Cloud Security Alliance. (2026). <em>AARM Conformance Testing Protocol.</em> CSA Working Group Publication.</span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
