import type { NewBuilderRow } from "@/db/schema";
import { BUILDER_DETAILS } from "./builder-details";

// Canonical registry seed. Used by scripts/seed.ts to populate Neon, and as the
// static fallback (src/lib/builders.ts) until the DB is provisioned.
//
// Classification is filled only where confident from each company's own
// description; unknown fields are intentionally left blank and surface as
// "missing" in the UI. Conformance/technical axes for the 5 verified builders
// come from their published conformance records.

function domainOf(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
}

type Seed = Omit<NewBuilderRow, "domain"> & { website: string };

const RAW: Seed[] = [
  // ── Conformant (verified) ──────────────────────────────────────────────
  {
    slug: "noma",
    name: "Noma Security",
    website: "https://noma.security",
    description:
      "Noma discovers, governs, and protects AI and agents across the enterprise — from homegrown AI to SaaS agents and coding assistants.",
    category: "Discovery, posture & governance",
    surfaces: ["MCP", "API", "Cloud", "SaaS", "Data/DB"],
    audiences: ["Enterprise"],
    deployments: ["SaaS", "Hybrid", "Self-hosted"],
    stage: "Launched",
    conformanceLevel: "extended",
    verifiedDate: "March 25, 2026",
    tagline: "Enterprise AI security & governance platform",
    interception: ["Protocol Gateway", "SDK Instrumentation"],
    policyModel: "Hybrid",
    decisions: ["ALLOW", "DENY", "MODIFY", "STEP_UP", "DEFER"],
    about:
      "Noma discovers, governs, and protects AI and agents across the enterprise — from homegrown AI to SaaS agents and coding assistants. It intercepts agent actions before execution, evaluates them against policy and accumulated session context, enforces a decision, and records a tamper-evident audit trail, integrating through an SDK, a protocol gateway, an AI gateway, and an MCP gateway.",
    capabilities: [
      "Pre-execution interception of agent actions across SDK, protocol-gateway, AI-gateway, and MCP-gateway integrations",
      "Session context accumulation across conversation threads and task horizons",
      "Policy evaluation with intent alignment at action time",
      "Five-outcome authorization engine: ALLOW, DENY, MODIFY, STEP_UP, DEFER",
      "Tamper-evident receipts with timestamp and decision context",
      "Cryptographic identity binding on every action receipt",
      "Intent-drift detection (AIDR): embedding-based scoring of each action against the session's stated-intent baseline (R7)",
      "OpenTelemetry export to SIEM/SOAR and observability pipelines for SOC teams (R8)",
      "Least-privilege enforcement via the Access Control module — constraining capabilities, autonomy, and permissions per action (R9)",
    ],
    architecture:
      "Noma satisfies all nine AARM requirements (R1–R6 core and R7–R9 extended).\n\n" +
      "Core (R1–R6): Noma intercepts agent-initiated actions before execution, accumulates per-session context (prior actions and data classifications), evaluates each action against organizational policy with intent alignment, and produces one of five authorization decisions. Every decision is written to a tamper-evident audit trail with cryptographic identity binding, enabling forensic reconstruction across sessions. It integrates through an SDK, a protocol gateway, an AI gateway, and an MCP gateway.\n\n" +
      "Semantic distance tracking (R7): Implemented as part of the intent-misalignment module within Noma's AIDR layer. Each session is anchored to the agent's stated intent, and every proposed action or tool call is scored for embedding-based divergence from that baseline — surfacing intent drift before misaligned-but-permitted actions execute.\n\n" +
      "Telemetry export (R8): Decisions are exported via OpenTelemetry to SIEM, SOAR, and observability pipelines; a primary persona is SOC teams consuming this through Noma's SIEM/SOAR integrations.\n\n" +
      "Least-privilege enforcement (R9): Operationalized through Noma's Access Control module, which constrains an agent's capabilities, autonomy, and permissions to the minimum required for each action at enforcement time, rather than provisioning blanket session-wide privilege.",
    requirements: [
      { id: "R1", status: "pass" }, { id: "R2", status: "pass" }, { id: "R3", status: "pass" },
      { id: "R4", status: "pass" }, { id: "R5", status: "pass" }, { id: "R6", status: "pass" },
      { id: "R7", status: "pass" }, { id: "R8", status: "pass" }, { id: "R9", status: "pass" },
    ],
    keyFacts: [
      { label: "Headquarters", value: "Tel Aviv & New York" },
      { label: "Funding", value: "$132M+ (Series B)" },
      { label: "Customers", value: "500+ enterprises" },
    ],
    status: "approved",
  },
  {
    slug: "runlayer",
    name: "Runlayer",
    website: "https://runlayer.com",
    description:
      "Enterprise control plane for MCP servers, skills, and agents — host, govern, and secure the AI tools employees rely on.",
    category: "MCP / tool / API gateway",
    surfaces: ["MCP", "Endpoint", "SaaS"],
    audiences: ["Enterprise"],
    deployments: ["SaaS", "Self-hosted"],
    conformanceLevel: "extended",
    verifiedDate: "April 10, 2026",
    tagline: "Enterprise control plane for MCP servers, skills, and agents",
    interception: ["Protocol Gateway"],
    policyModel: "Hybrid",
    decisions: ["ALLOW", "DENY", "MODIFY", "STEP_UP", "DEFER"],
    requirements: [
      { id: "R1", status: "pass" }, { id: "R2", status: "pass" }, { id: "R3", status: "pass" },
      { id: "R4", status: "pass" }, { id: "R5", status: "pass" }, { id: "R6", status: "pass" },
      { id: "R7", status: "pass" }, { id: "R8", status: "pass" }, { id: "R9", status: "pass" },
    ],
    keyFacts: [
      { label: "Founded", value: "2025" },
      { label: "Funding", value: "$11M seed (Khosla, Felicis)" },
    ],
    status: "approved",
  },
  {
    slug: "formal",
    name: "Formal",
    website: "https://formal.ai",
    description:
      "Protocol-aware reverse proxy enforcing least privilege at the wire-protocol level for data, infrastructure, and AI agent traffic.",
    category: "Data / wire-protocol security",
    surfaces: ["Data/DB", "Network", "MCP"],
    audiences: ["Enterprise"],
    deployments: ["Self-hosted"],
    conformanceLevel: "core",
    verifiedDate: "April 10, 2026",
    tagline: "Protocol-aware reverse proxy for data, infrastructure, and AI agent traffic",
    interception: ["Protocol Gateway"],
    policyModel: "Deterministic",
    decisions: ["ALLOW", "DENY", "MODIFY", "STEP_UP"],
    requirements: [
      { id: "R1", status: "pass" }, { id: "R2", status: "pass" },
      { id: "R3", status: "pass", notes: "Deterministic; non intent-based" },
      { id: "R4", status: "pass" }, { id: "R5", status: "pass" }, { id: "R6", status: "pass" },
      { id: "R7", status: "fail" }, { id: "R8", status: "pass" }, { id: "R9", status: "pass" },
    ],
    keyFacts: [
      { label: "Founded", value: "2023" },
      { label: "Funding", value: "$6M+ seed (Thrive Capital)" },
    ],
    status: "approved",
  },
  {
    slug: "operant",
    name: "Operant AI",
    website: "https://operant.ai",
    description:
      "Runtime application protection for AI agents, MCP, and agentic workloads — intercepts tool calls, prompts, and shell executions before execution.",
    category: "Runtime enforcement / control plane",
    surfaces: ["MCP", "Endpoint"],
    audiences: ["Enterprise"],
    deployments: ["Self-hosted", "SaaS"],
    conformanceLevel: "extended",
    verifiedDate: "May 4, 2026",
    tagline: "Runtime application protection for AI agents, MCP, and agentic workloads",
    interception: ["Protocol Gateway", "SDK Instrumentation"],
    policyModel: "Hybrid",
    decisions: ["ALLOW", "DENY", "MODIFY", "STEP_UP", "DEFER"],
    requirements: [
      { id: "R1", status: "pass" }, { id: "R2", status: "pass" }, { id: "R3", status: "pass" },
      { id: "R4", status: "pass" }, { id: "R5", status: "pass" }, { id: "R6", status: "pass" },
      { id: "R7", status: "pass" }, { id: "R8", status: "pass" }, { id: "R9", status: "pass" },
    ],
    keyFacts: [
      { label: "Headquarters", value: "San Francisco" },
      { label: "Compliance", value: "SOC 2 Type II" },
    ],
    status: "approved",
  },
  {
    slug: "mintmcp",
    name: "MintMCP",
    website: "https://mintmcp.com",
    description: "Enterprise governance platform for AI agents and MCP servers.",
    category: "MCP / tool / API gateway",
    surfaces: ["MCP"],
    audiences: ["Enterprise"],
    conformanceLevel: "core",
    verifiedDate: "May 18, 2026",
    tagline: "Enterprise governance for AI agents and MCP servers",
    interception: ["Protocol Gateway"],
    decisions: ["ALLOW", "DENY", "MODIFY", "STEP_UP", "DEFER"],
    requirements: [
      { id: "R1", status: "pass" }, { id: "R2", status: "pass" }, { id: "R3", status: "pass" },
      { id: "R4", status: "pass" }, { id: "R5", status: "pass" }, { id: "R6", status: "pass" },
      { id: "R7", status: "na" }, { id: "R8", status: "na" }, { id: "R9", status: "na" },
    ],
    status: "approved",
  },

  {
    slug: "agent-governance-toolkit-microsoft",
    name: "Agent Governance Toolkit (Microsoft)",
    website: "https://github.com/microsoft/agent-governance-toolkit",
    description: "Open-source runtime policy enforcement, execution rings, and tamper-evident audit chain for autonomous AI agents",
    surfaces: ["MCP", "API", "Cloud", "SaaS"],
    types: ["Open Source"],
    audiences: ["Enterprise", "Developers"],
    deployments: ["SaaS", "Self-hosted", "Hybrid"],
    stage: "Launched",
    conformanceLevel: "extended",
    verifiedDate: "June 14, 2026",
    verifiedBy: "AARM Conformance Agent",
    tagline: "Open-source runtime governance for autonomous AI agents",
    interception: ["SDK Instrumentation", "Protocol Gateway"],
    policyModel: "Hybrid",
    decisions: ["ALLOW", "DENY", "MODIFY", "STEP_UP", "DEFER"],
    about:
      "The Agent Governance Toolkit (AGT) is an open-source runtime governance layer for autonomous AI agents — policy enforcement, execution rings, and a tamper-evident audit chain. It intercepts every tool call before execution, evaluates it with a Cedar policy backend against accumulated session context and intent, enforces one of five decisions, and records a Merkle-chained, offline-verifiable audit trail. AGT is used in production at Microsoft and by adopters including Dayos and Provedit.",
    capabilities: [
      "PolicyInterceptor intercepts every tool call before execution across all five framework adapters — no bypass paths",
      "ExecutionContext accumulates tool calls, outputs, spend, and delegation chain across a session for cumulative-behaviour policies (rate limits, budget caps)",
      "Cedar policy backend evaluating tool name, parameters, agent role, and session intent together",
      "Five governance decisions: ALLOW, DENY, MODIFY (pre-execution parameter rewrite), STEP_UP (human approval), DEFER",
      "Merkle-chained, offline-verifiable audit records (SHA-256 per-entry hash chain)",
      "Ed25519 did:mesh identity per agent with single-use-nonce IATP handshake; TEE keystore + liveness attestation for advanced deployments",
      "PromptDefense evaluator: prompt-injection, semantic-drift, and goal-misgeneralisation detection pre-policy (OWASP LLM01 / ASI-002)",
      "OpenTelemetry decision export with pluggable sinks (OTLP, CloudEvents, Merkle-chain) and an audit-overflow-denies circuit breaker",
      "MCP Security Gateway: every MCP tool call governed with ephemeral, least-privilege credentials scoped per invocation",
    ],
    architecture:
      "This review was conducted by the AARM Conformance Agent and completed on June 14, 2026. The Agent Governance Toolkit satisfies all nine AARM requirements (R1–R6 core and R7–R9 extended), qualifying for AARM Extended.\n\n" +
      "Interception (R1): Every tool call is intercepted by the PolicyInterceptor before execution; all five framework adapters route through it and bypass paths are forbidden by spec.\n\n" +
      "Context (R2): An ExecutionContext accumulates tool calls, outputs, spend, and the delegation chain across a session, and policy rules use it for cumulative-behaviour enforcement such as rate limits and budget caps.\n\n" +
      "Policy & intent alignment (R3): A Cedar backend evaluates the tool name, parameters, agent role, and session intent together, and the PromptDefense evaluator detects intent-action semantic drift.\n\n" +
      "Decisions (R4): Exactly five decisions — ALLOW, DENY, MODIFY, STEP_UP, DEFER. MODIFY rewrites parameters before execution; STEP_UP halts for human approval.\n\n" +
      "Receipts (R5): Audit records are Merkle-chained — each entry hashes its predecessor (SHA-256) — and are offline-verifiable.\n\n" +
      "Identity (R6): Each agent holds an Ed25519 did:mesh identity whose private key never leaves the agent process; the IATP handshake uses a single-use nonce under a 200ms SLO, with a TEE keystore and liveness attestation for advanced deployments.\n\n" +
      "Drift tracking (R7): The PromptDefense evaluator runs as a pre-policy layer, flagging prompt injection, semantic drift, and goal misgeneralisation for DENY/STEP_UP before policy evaluation (aligned to OWASP LLM01 and ASI-002).\n\n" +
      "Telemetry export (R8): Every decision is exported as an OpenTelemetry log event through pluggable sinks (OTLP, CloudEvents, Merkle-chain), with a circuit breaker that denies on audit overflow.\n\n" +
      "Least-privilege (R9): The MCP Security Gateway governs every MCP tool call and issues an ephemeral, minimum-privilege credential scoped per invocation, with no ungoverned paths.",
    requirements: [
      { id: "R1", status: "pass" }, { id: "R2", status: "pass" }, { id: "R3", status: "pass" },
      { id: "R4", status: "pass" }, { id: "R5", status: "pass" }, { id: "R6", status: "pass" },
      { id: "R7", status: "pass" }, { id: "R8", status: "pass" }, { id: "R9", status: "pass" },
    ],
    keyFacts: [
      { label: "License", value: "Open source" },
      { label: "Adopters", value: "Microsoft, Dayos, Provedit" },
      { label: "Conformance", value: "AARM Extended (R1–R9)" },
      { label: "Verified", value: "June 14, 2026" },
    ],
    status: "approved",
  },

  // ── Aligned ────────────────────────────────────────────────────────────
  { slug: "okta", name: "Okta", website: "https://www.okta.com/products/govern-ai-agent-identity/", description: "Identity-native control plane for AI agents — discover, govern, and secure agents and their access to resources.", category: "Identity, access & authorization", surfaces: ["SaaS", "Cloud"], audiences: ["Enterprise"], conformanceLevel: "aligned", status: "approved" },
  { slug: "rubrik", name: "Rubrik", website: "https://www.rubrik.com/products/rubrik-agent-cloud", description: "Cyber resilience platform securing enterprise data, identity, and AI agents against threats and ensuring recovery.", surfaces: ["Cloud", "Data/DB"], audiences: ["Enterprise"], conformanceLevel: "aligned", status: "approved" },
  {
    slug: "airia",
    name: "Airia",
    website: "https://airia.com",
    description: "Runtime security enforced at a single inline interception point — the Unified AI Gateway — between the calling agent and every downstream model, tool, or provider.",
    category: "MCP / tool / API gateway",
    surfaces: ["MCP", "API"],
    audiences: ["Enterprise"],
    deployments: ["SaaS", "Self-hosted"],
    stage: "Launched",
    conformanceLevel: "core",
    verifiedDate: "July 24, 2026",
    verifiedBy: "AARM Technical Working Group",
    tagline: "Enforce AARM at a single inline interception point — the Unified AI Gateway",
    interception: ["Protocol Gateway"],
    policyModel: "Hybrid",
    decisions: ["ALLOW", "DENY", "MODIFY", "STEP_UP", "DEFER"],
    architecture:
      "Airia enforces AARM at a single inline interception point: the Unified AI Gateway, which sits between the calling agent and every downstream model, tool, or provider. No action reaches a tool endpoint without first passing policy evaluation. Each intercepted action is checked against accumulated per-session context, classified by an inline DLP inspection layer, and evaluated by a Policy Engine that returns one of five authorization decisions: allow, deny, modify, step-up, or defer. Deferrals and step-ups suspend on a bounded timeout that resolves to deny, and any incomplete or failed evaluation fails closed rather than releasing the action.",
    capabilities: [
      "Single inline interception point (Unified AI Gateway) between the calling agent and every downstream model, tool, or provider",
      "No action reaches a tool endpoint without first passing policy evaluation",
      "Per-session context accumulation checked on every intercepted action",
      "Inline DLP inspection layer classifies each intercepted action",
      "Five-outcome Policy Engine: allow, deny, modify, step-up, defer",
      "Deferrals and step-ups suspend on a bounded timeout that resolves to deny",
      "Fails closed on any incomplete or failed evaluation",
    ],
    requirements: [
      { id: "R1", status: "pass" }, { id: "R2", status: "pass" }, { id: "R3", status: "pass" },
      { id: "R4", status: "pass" }, { id: "R5", status: "pass" }, { id: "R6", status: "pass" },
      { id: "R7", status: "fail" }, { id: "R8", status: "fail" }, { id: "R9", status: "fail" },
    ],
    status: "approved",
  },
  { slug: "lasso", name: "Lasso", website: "https://www.lasso.security", description: "Lasso is the AI Security Platform built for the agentic era.", conformanceLevel: "aligned", status: "approved" },
  { slug: "hiddenlayer", name: "HiddenLayer", website: "https://hiddenlayer.com", description: "The most comprehensive security platform for AI.", category: "Threat detection & response", conformanceLevel: "aligned", status: "approved" },
  { slug: "ultra", name: "Ultra", website: "https://ultra.security", description: "The easy and secure way for people and agents to use MCP.", category: "MCP / tool / API gateway", surfaces: ["MCP"], conformanceLevel: "aligned", status: "approved" },
  { slug: "manifold-security", name: "Manifold Security", website: "https://www.manifold.security", description: "AI Detection and Response Platform.", category: "Threat detection & response", conformanceLevel: "aligned", status: "approved" },
  { slug: "tenet", name: "Tenet", website: "https://www.tenetsecurity.ai", description: "Your Agents Have Real Access. Give Them Real Defense.", conformanceLevel: "aligned", status: "approved" },
  { slug: "certiv", name: "Certiv", website: "https://www.certiv.ai", description: "Runtime Assurance for AI Agents. Complete visibility and control.", category: "Discovery, posture & governance", conformanceLevel: "aligned", status: "approved" },
  { slug: "pillar-security", name: "Pillar Security", website: "https://pillar.security", description: "Build and Run Secure AI Systems.", conformanceLevel: "aligned", status: "approved" },
  { slug: "aten-security", name: "Aten Security", website: "https://atensecurity.com", description: "Thoth enforces behavioral policies on AI agent tool calls at the SDK layer.", category: "Runtime enforcement / control plane", surfaces: ["MCP"], interception: ["SDK Instrumentation"], conformanceLevel: "aligned", status: "approved" },
  { slug: "golf", name: "Golf", website: "https://golf.dev", description: "Agentic AI governance and security gateway for enterprises.", category: "MCP / tool / API gateway", audiences: ["Enterprise"], conformanceLevel: "aligned", status: "approved" },
  { slug: "armoriq", name: "ArmorIQ", website: "https://armoriq.ai", description: "Intent is the new perimeter.", category: "Runtime enforcement / control plane", policyModel: "Non-deterministic", conformanceLevel: "aligned", status: "approved" },
  { slug: "aegis-security", name: "Aegis Security", website: "https://aegissecurity.dev", description: "A runtime security control plane for AI agents.", category: "Runtime enforcement / control plane", conformanceLevel: "aligned", status: "approved" },
  { slug: "faramesh", name: "Faramesh", website: "https://faramesh.dev", description: "Intent-to-action control layer for AI agents.", category: "Runtime enforcement / control plane", policyModel: "Non-deterministic", conformanceLevel: "aligned", status: "approved" },
  { slug: "repello-ai", name: "Repello AI", website: "https://repello.ai", description: "End-to-end security for autonomous AI systems.", conformanceLevel: "aligned", status: "approved" },
  { slug: "cakewalk", name: "Cakewalk", website: "https://www.getcakewalk.io", description: "Agentic Access Management for fast-moving companies.", category: "Identity, access & authorization", conformanceLevel: "aligned", status: "approved" },
  { slug: "permit-io", name: "Permit.io", website: "https://permit.io", description: "Full Stack authorization as a service.", category: "Identity, access & authorization", audiences: ["Developers"], conformanceLevel: "aligned", status: "approved" },
  { slug: "aira-security", name: "Aira Security", website: "https://airasecurity.ai", description: "Enforcement layer for agents that blocks malicious or accidental actions.", category: "Runtime enforcement / control plane", conformanceLevel: "aligned", status: "approved" },
  { slug: "decisionguard", name: "DecisionGuard", website: "https://decision-guard.com", description: "Pre-execution assurance for automated and AI-driven systems.", category: "Runtime enforcement / control plane", conformanceLevel: "aligned", status: "approved" },
  { slug: "sevorix", name: "SEVORIX", website: "https://sevorix.ai", description: "A local, Rust-based runtime firewall for AI agents.", category: "Endpoint / local runtime", surfaces: ["Endpoint"], deployments: ["Self-hosted"], conformanceLevel: "aligned", status: "approved" },
  { slug: "clevr-security", name: "Clevr Security", website: "https://clevrsecurity.com", description: "Authorizes AI agent actions in real time by evaluating intent and business context.", category: "Runtime enforcement / control plane", policyModel: "Non-deterministic", conformanceLevel: "aligned", status: "approved" },
  { slug: "assury", name: "Assury", website: "https://assury.ai", description: "Self-hosted runtime control plane for AARM-conformant policy enforcement.", category: "Runtime enforcement / control plane", deployments: ["Self-hosted"], conformanceLevel: "aligned", status: "approved" },
  { slug: "rivaro", name: "Rivaro", website: "https://rivaro.ai", description: "Runtime enforcement platform for AI agents with identity-aware policy controls.", category: "Runtime enforcement / control plane", conformanceLevel: "aligned", status: "approved" },
  { slug: "refractal", name: "Refractal", website: "https://www.refractal-ai.com", description: "The multimodal security layer for AI agents.", conformanceLevel: "aligned", status: "approved" },
  { slug: "fencio", name: "Fencio", website: "https://fencio.dev", description: "Runtime security platform for deterministic control over autonomous agents.", category: "Runtime enforcement / control plane", policyModel: "Deterministic", conformanceLevel: "aligned", status: "approved" },
  { slug: "the-mcp-company", name: "The MCP Company", website: "https://themcp.company", description: "Dev tool giving control and visibility over agents and MCP actions.", category: "MCP / tool / API gateway", surfaces: ["MCP"], audiences: ["Developers"], conformanceLevel: "aligned", status: "approved" },
  { slug: "laptop-bot", name: "Laptop Bot", website: "https://laptop.bot", description: "AI Security and Governance for laptops.", category: "Endpoint / local runtime", surfaces: ["Endpoint"], conformanceLevel: "aligned", status: "approved" },
  { slug: "raxit", name: "Raxit", website: "https://raxit.ai", description: "Preemptive cybersecurity platform for AI agents.", conformanceLevel: "aligned", status: "approved" },
  {
    slug: "highflame",
    name: "Highflame",
    website: "https://highflame.com",
    description: "Shield — runtime action-enforcement for AI agents: intercept, evaluate against policy, decide, and record signed receipts.",
    category: "Runtime enforcement / control plane",
    audiences: ["Enterprise"],
    conformanceLevel: "core",
    verifiedDate: "June 11, 2026",
    verifiedBy: "AARM Conformance Agent",
    tagline: "Runtime action-enforcement for AI agents",
    interception: ["SDK Instrumentation"],
    policyModel: "Deterministic",
    decisions: ["ALLOW", "DENY", "MODIFY", "STEP_UP", "DEFER"],
    about:
      "Highflame Shield is a runtime action-enforcement product for AI agents. It intercepts every agent-initiated action before execution, evaluates it against declarative policy and accumulated session context, enforces one of five authorization decisions, and emits a signed, offline-verifiable receipt for each decision.",
    capabilities: [
      "Pre-execution interception at a fail-closed enforcement endpoint — no fail-open path",
      "Per-session context accumulation (prior actions, data classifications, original request), defaulting to highest sensitivity",
      "Append-only, hash-chained session context log (tamper-evident)",
      "Cedar policy engine with four classifications and documented, auditable defer triggers",
      "Typed parameter validation (type, range, pattern, allow/blocklist) on tool-call arguments",
      "All five decisions: ALLOW, DENY, MODIFY (PII redaction), STEP_UP (human approval), DEFER (bounded cascade depth)",
      "Cryptographically signed receipts over a canonical serialization, verifiable offline; workload-attested signing keys",
      "Identity binding across human, service, agent, session, and role/privilege with freshness, revocation, and delegation-chain preservation",
    ],
    architecture:
      "This review was conducted by the AARM Conformance Agent and completed on June 11, 2026. Highflame Shield satisfies all six AARM Core requirements (R1–R6); the extended requirements (R7–R9) were not assessed in this review.\n\n" +
      "Interception (R1): Shield intercepts every action before execution at a dedicated enforcement endpoint and is fail-closed — absent or unsynced policies return an error rather than silently allowing, and no configuration path bypasses policy evaluation. A matching DENY blocks execution and emits a signed denial receipt recording the determining policy and reason; DEFER suspends the action with no side effects.\n\n" +
      "Context (R2): Shield accumulates per-session context — prior actions, data classifications, and the original request — and defaults to the highest sensitivity when classification is unavailable. The session log is append-only and hash-chained, so tampering with a prior entry breaks the chain.\n\n" +
      "Policy & intent alignment (R3): The Cedar-based engine supports forbidden, context-dependent deny, context-dependent allow, and context-dependent defer. Deferral triggers (unpopulated context, same-priority conflict, low detector confidence) are documented and auditable, and tool-call arguments are projected into a typed record and validated by type, range, and allow/blocklist.\n\n" +
      "Decisions (R4): All five authorization decisions are enforced. MODIFY applies PII redaction; STEP_UP routes for human approval with a bounded, deny-on-timeout window (no fail-open); DEFER supports dependent-action cascading with a configurable depth limit and follow-up receipts.\n\n" +
      "Receipts (R5): Every decision type produces a cryptographically signed receipt over a canonical serialization, verifiable offline against published keys, with workload-attested signing credentials.\n\n" +
      "Identity (R6): Each action is bound to human, service, agent, session, and role/privilege scope. Identity is validated against trusted issuers including freshness and revocation; unverifiable identity is denied, and identity is preserved across deferral and delegation.",
    requirements: [
      { id: "R1", status: "pass" }, { id: "R2", status: "pass" }, { id: "R3", status: "pass" },
      { id: "R4", status: "pass" }, { id: "R5", status: "pass" }, { id: "R6", status: "pass" },
      { id: "R7", status: "na" }, { id: "R8", status: "na" }, { id: "R9", status: "na" },
    ],
    keyFacts: [
      { label: "Conformance", value: "AARM Core (R1–R6)" },
      { label: "Verified", value: "June 11, 2026" },
    ],
    status: "approved",
  },
  { slug: "cortexhub", name: "Cortexhub", website: "https://cortexhub.ai", description: "Runtime governance for AI-era systems.", category: "Discovery, posture & governance", conformanceLevel: "aligned", status: "approved" },
  { slug: "aris", name: "Aris", website: "https://aris-platform.com", description: "Discovers running AI, measures exposure, and provides control.", category: "Discovery, posture & governance", conformanceLevel: "aligned", status: "approved" },
  { slug: "pipelock", name: "Pipelock", website: "https://pipelab.org", description: "Open-source firewall for AI agents. Single binary, no cloud required.", category: "Endpoint / local runtime", surfaces: ["Endpoint", "Network"], types: ["Open Source"], deployments: ["Self-hosted"], conformanceLevel: "aligned", status: "approved" },
  { slug: "secure-agentics", name: "Secure Agentics", website: "https://secureagentics.ai", description: "Real time security monitoring and control with cognitive reasoning.", category: "Runtime enforcement / control plane", policyModel: "Non-deterministic", conformanceLevel: "aligned", status: "approved" },
  { slug: "guardion-ai", name: "Guardion.AI", website: "https://guardion.ai", description: "Runtime security layer observing, enforcing, and blocking unsafe actions.", category: "Runtime enforcement / control plane", conformanceLevel: "aligned", status: "approved" },
  { slug: "cogensec-ai", name: "Cogensec.AI", website: "https://cogensec.com", description: "Defines and measures structural integrity for agents to operate safely.", category: "Audit, receipts & assurance", conformanceLevel: "aligned", status: "approved" },
  { slug: "unbound-security", name: "Unbound Security", website: "https://getunbound.ai", description: "The Agent Access Security Broker for AI coding agents.", category: "Identity, access & authorization", audiences: ["Developers"], conformanceLevel: "aligned", status: "approved" },
  { slug: "querystory", name: "QueryStory", website: "https://querystory.ai", description: "AI-powered data intelligence platform with zero trust agent architecture.", category: "Data / wire-protocol security", surfaces: ["Data/DB"], conformanceLevel: "aligned", status: "approved" },
  { slug: "z0-ai", name: "z0.ai", website: "https://www.z0.ai", description: "Internal agent platform for security and compliance conscious companies.", conformanceLevel: "aligned", status: "approved" },
  { slug: "optimus-labs", name: "Optimus Labs", website: "https://www.optimuslabs.io", description: "Secures AI agents at the endpoint where prompt injection and autonomous action converge.", category: "Endpoint / local runtime", surfaces: ["Endpoint"], conformanceLevel: "aligned", status: "approved" },
  { slug: "sovereignai-security-labs", name: "SovereignAI Security Labs", website: "https://www.sovereignaisecurity.com", description: "Centralized, API-first GenAI security and guardrails platform.", surfaces: ["API"], conformanceLevel: "aligned", status: "approved" },
  { slug: "akto", name: "Akto", website: "https://www.akto.io", description: "Agentic AI Security platform for enterprises to secure AI agents, MCPs, and LLMs.", category: "Discovery, posture & governance", surfaces: ["MCP", "API"], audiences: ["Enterprise"], conformanceLevel: "aligned", status: "approved" },
  { slug: "langguard", name: "LangGuard", website: "https://www.langguard.ai", description: "AI Control Plane for runtime governance and automated remediation.", category: "Discovery, posture & governance", conformanceLevel: "aligned", status: "approved" },
  { slug: "capsule-security", name: "Capsule Security", website: "https://www.capsulesecurity.io", description: "Protects AI agents at runtime with a Guardian Agent that detects rogue behavior.", category: "Runtime enforcement / control plane", conformanceLevel: "aligned", status: "approved" },
  { slug: "strix-governance", name: "Strix Governance", website: "https://www.strixgov.com", description: "Embedded governance kernel with execution tokens and tamper-evident audit trails.", category: "Audit, receipts & assurance", conformanceLevel: "aligned", status: "approved" },
  { slug: "nudge-security", name: "Nudge Security", website: "https://www.nudgesecurity.com", description: "Govern the AI agent workforce. Discover, assess risk, enforce guardrails.", category: "Discovery, posture & governance", conformanceLevel: "aligned", status: "approved" },
  { slug: "kontext", name: "Kontext", website: "https://kontext.security", description: "Runtime authorization for AI agents with least-privilege tool calls, scoped credentials, audit trails, and instant revocation.", category: "Identity, access & authorization", surfaces: ["MCP"], conformanceLevel: "aligned", status: "approved" },
  { slug: "kotsu", name: "Kōtsū", website: "https://kotsu.ai", description: "Runtime governor for regulated workflows: specify, deploy, govern, and certify agentic operations.", category: "Discovery, posture & governance", audiences: ["Public Sector", "Enterprise"], conformanceLevel: "aligned", status: "approved" },
  { slug: "agen", name: "Agen", website: "https://agen.co", description: "Securely expose enterprise context to internal agents through an identity-aware control layer that governs access.", category: "Identity, access & authorization", audiences: ["Enterprise"], conformanceLevel: "aligned", status: "approved" },
  { slug: "tuent", name: "Tuent", website: "https://tuent.ai/", description: "Tuent's Sentinel program catches AI agents the moment they go off-script, before damage hits production.", category: "Threat detection & response", conformanceLevel: "aligned", status: "approved" },
  { slug: "general-analysis", name: "General Analysis", website: "https://generalanalysis.com", description: "Context-aware AI security platform for runtime guardrails, automated red teaming, and agent/tool risk visibility.", category: "Threat detection & response", conformanceLevel: "aligned", status: "approved" },
  { slug: "smartverify", name: "SmartVerify", website: "https://www.smartverify.ai", description: "A Data Security and Compliance Layer for Enterprise AI. Every query inspected, scored, and logged in real time.", category: "Data / wire-protocol security", surfaces: ["Data/DB"], audiences: ["Enterprise"], conformanceLevel: "aligned", status: "approved" },
  { slug: "mcp-tap", name: "mcp-tap", website: "https://github.com/annawhooo/mcp-tap", description: "Open-source MCP traffic capture for stdio-transport servers. Tamper-evident HMAC-chained audit log with companion credential vault coffer-mcp.", category: "Audit, receipts & assurance", surfaces: ["MCP"], types: ["Open Source"], audiences: ["Developers"], conformanceLevel: "aligned", status: "approved" },
  { slug: "levo-ai", name: "Levo.ai", website: "https://www.levo.ai", description: "Runtime governance layer for APIs, AI agents, and MCP servers — deployed via eBPF in hours, with no code or network changes.", category: "MCP / tool / API gateway", surfaces: ["API", "MCP"], interception: ["Kernel eBPF"], conformanceLevel: "aligned", status: "approved" },
  { slug: "tego-ai", name: "Tego AI", website: "https://tego.ai", description: "Agent-native, purpose-based access control and runtime monitoring for AI agents across SaaS, cloud, and endpoint.", category: "Identity, access & authorization", surfaces: ["SaaS", "Cloud", "Endpoint"], conformanceLevel: "aligned", status: "approved" },
  { slug: "reva-ai", name: "Reva AI", website: "https://www.reva.ai", description: "Intent & Behavior-based Access Control (IBAC) for every agentic action, at runtime.", category: "Identity, access & authorization", policyModel: "Non-deterministic", conformanceLevel: "aligned", status: "approved" },
  { slug: "metano-ai", name: "Metano AI", website: "https://metano.ai", description: "Discover, monitor, govern, and defend autonomous agents everywhere they operate — across SaaS, endpoints, and shadow environments.", category: "Discovery, posture & governance", surfaces: ["SaaS", "Endpoint", "Cloud"], conformanceLevel: "aligned", status: "approved" },
  { slug: "suradar", name: "SURADAR", website: "https://glyphzerolabs.com", description: "Cryptographic per-action authorization for AI agents — tamper-evident receipts, identity binding, and memory provenance.", category: "Audit, receipts & assurance", conformanceLevel: "aligned", status: "approved" },
];

export const SEED_BUILDERS: NewBuilderRow[] = RAW.map((b, i) => {
  // Enrich verified builders with the full conformance-review narrative.
  const detail = BUILDER_DETAILS.find((d) => d.slug === b.slug);
  return {
    ...b,
    domain: domainOf(b.website),
    sortOrder: i, // preserve original registry order (Noma first)
    about: b.about ?? detail?.about ?? null,
    architecture: b.architecture ?? detail?.architecture ?? null,
    capabilities: b.capabilities ?? detail?.capabilities ?? [],
  };
});
