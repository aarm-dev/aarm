export type ConformanceLevel = "Core" | "Extended";

export type RequirementStatus = "pass" | "na";

export type BuilderDetail = {
  slug: string;
  name: string;
  url: string;
  conformanceLevel: ConformanceLevel;
  verifiedDate: string;
  tagline: string;
  about: string;
  capabilities: string[];
  requirements: {
    id: string;
    title: string;
    status: RequirementStatus;
    notes?: string;
  }[];
  highlights?: { label: string; value: string }[];
};

export const BUILDER_DETAILS: BuilderDetail[] = [
  {
    slug: "noma",
    name: "Noma Security",
    url: "https://www.noma.security",
    conformanceLevel: "Core",
    verifiedDate: "March 2026",
    tagline: "Unified AI security and governance for enterprise.",
    about:
      "Noma Security is a unified platform to secure and govern AI applications and agents. It provides enterprise-grade protection across the full AI lifecycle — from development through production — with deep integrations into major AI frameworks, cloud providers, and identity systems.",
    capabilities: [
      "Pre-execution interception of every agent-initiated action",
      "Context accumulation across conversation threads and task horizons",
      "Policy evaluation with intent alignment at action time",
      "Five-outcome authorization engine: ALLOW, DENY, MODIFY, STEP_UP, DEFER",
      "Tamper-evident receipts with timestamp and decision context",
      "Cryptographic identity binding on every action receipt",
    ],
    requirements: [
      { id: "R1", title: "Pre-execution interception", status: "pass" },
      { id: "R2", title: "Context accumulation", status: "pass" },
      { id: "R3", title: "Policy evaluation with intent alignment", status: "pass" },
      { id: "R4", title: "Five authorization decisions", status: "pass" },
      { id: "R5", title: "Tamper-evident receipts", status: "pass" },
      { id: "R6", title: "Identity binding", status: "pass" },
    ],
    highlights: [
      { label: "Funding", value: "$132M+" },
      { label: "Customers", value: "500+ enterprise" },
      { label: "Verified", value: "March 2026" },
    ],
  },
  {
    slug: "runlayer",
    name: "Runlayer",
    url: "https://www.runlayer.com",
    conformanceLevel: "Extended",
    verifiedDate: "April 2026",
    tagline: "One platform for MCPs, Skills, and Agents — with full AARM Extended conformance.",
    about:
      "Runlayer is a unified platform for MCPs, Skills, and Agents with purpose-built security, fine-grained governance, and complete observability. It is one of the first platforms to achieve AARM Extended conformance, meeting all nine requirements including semantic drift tracking, telemetry export, and least-privilege enforcement.",
    capabilities: [
      "Pre-execution interception for MCP, skill, and agent actions",
      "Full context accumulation with task-thread awareness",
      "Intent-aligned policy evaluation at every action boundary",
      "Complete five-outcome authorization engine",
      "Tamper-evident audit receipts for every decision",
      "Cryptographic identity binding per agent and per action",
      "Semantic distance tracking across long task horizons (R7)",
      "OpenTelemetry export for SIEM integration (R8)",
      "Least-privilege credential and tool scoping at execution time (R9)",
    ],
    requirements: [
      { id: "R1", title: "Pre-execution interception", status: "pass" },
      { id: "R2", title: "Context accumulation", status: "pass" },
      { id: "R3", title: "Policy evaluation with intent alignment", status: "pass" },
      { id: "R4", title: "Five authorization decisions", status: "pass" },
      { id: "R5", title: "Tamper-evident receipts", status: "pass" },
      { id: "R6", title: "Identity binding", status: "pass" },
      { id: "R7", title: "Semantic distance tracking", status: "pass" },
      { id: "R8", title: "Telemetry export", status: "pass" },
      { id: "R9", title: "Least privilege enforcement", status: "pass" },
    ],
    highlights: [
      { label: "Funding", value: "$11M seed (Khosla)" },
      { label: "Conformance", value: "AARM Extended" },
      { label: "Verified", value: "April 2026" },
    ],
  },
  {
    slug: "formal",
    name: "Formal",
    url: "https://www.formal.ai",
    conformanceLevel: "Core",
    verifiedDate: "March 2026",
    tagline: "Least-privilege enforcement at the wire protocol layer for humans and AI agents.",
    about:
      "Formal enforces least-privilege access at the wire protocol layer, sitting transparently between AI agents and the data systems they access. It inspects and controls every query, command, and API call in real time — without requiring application code changes. Customers include Cursor, Notion, and EliseAI.",
    capabilities: [
      "Wire-protocol-level interception before any action reaches the data layer",
      "Session context accumulation across agent interactions",
      "Policy evaluation against least-privilege rules and intent signals",
      "ALLOW, DENY, MODIFY, STEP_UP, and DEFER decision outcomes",
      "Tamper-evident audit logs for every intercepted action",
      "Identity binding via agent and session credentials",
    ],
    requirements: [
      { id: "R1", title: "Pre-execution interception", status: "pass" },
      { id: "R2", title: "Context accumulation", status: "pass" },
      { id: "R3", title: "Policy evaluation with intent alignment", status: "pass" },
      { id: "R4", title: "Five authorization decisions", status: "pass" },
      { id: "R5", title: "Tamper-evident receipts", status: "pass" },
      { id: "R6", title: "Identity binding", status: "pass" },
    ],
    highlights: [
      { label: "Funding", value: "$6M+ seed" },
      { label: "Customers", value: "Cursor, Notion, EliseAI" },
      { label: "Verified", value: "March 2026" },
    ],
  },
  {
    slug: "operant",
    name: "Operant AI",
    url: "https://www.operant.ai",
    conformanceLevel: "Extended",
    verifiedDate: "May 2026",
    tagline: "Discover, detect, and defend your AI, agents, and MCP in real time.",
    about:
      "Operant AI is a runtime security platform that delivers real-time discovery, detection, and defense for AI systems, agents, and MCP servers. It achieves AARM Extended conformance with full coverage of all nine requirements, including semantic drift monitoring and OpenTelemetry-compatible telemetry export.",
    capabilities: [
      "Real-time pre-execution interception across AI and MCP actions",
      "Continuous context accumulation with behavioral baselining",
      "Intent-aware policy evaluation with alignment scoring",
      "Five-outcome authorization: ALLOW, DENY, MODIFY, STEP_UP, DEFER",
      "Cryptographically signed, tamper-evident action receipts",
      "Identity binding per agent session and action",
      "Semantic drift detection across extended task sessions (R7)",
      "OpenTelemetry-compatible telemetry export (R8)",
      "Runtime least-privilege enforcement for credentials and tools (R9)",
    ],
    requirements: [
      { id: "R1", title: "Pre-execution interception", status: "pass" },
      { id: "R2", title: "Context accumulation", status: "pass" },
      { id: "R3", title: "Policy evaluation with intent alignment", status: "pass" },
      { id: "R4", title: "Five authorization decisions", status: "pass" },
      { id: "R5", title: "Tamper-evident receipts", status: "pass" },
      { id: "R6", title: "Identity binding", status: "pass" },
      { id: "R7", title: "Semantic distance tracking", status: "pass" },
      { id: "R8", title: "Telemetry export", status: "pass" },
      { id: "R9", title: "Least privilege enforcement", status: "pass" },
    ],
    highlights: [
      { label: "Conformance", value: "AARM Extended" },
      { label: "Verified", value: "May 2026" },
    ],
  },
  {
    slug: "mintmcp",
    name: "MintMCP",
    url: "https://www.mintmcp.com",
    conformanceLevel: "Core",
    verifiedDate: "April 2026",
    tagline: "Enterprise governance for AI agents and MCP servers.",
    about:
      "MintMCP is an enterprise governance platform built specifically for AI agents and MCP servers. It provides a centralized control plane for managing, monitoring, and securing the growing ecosystem of MCP-connected agents in enterprise environments.",
    capabilities: [
      "Pre-execution interception for all MCP server actions",
      "Session and task context accumulation",
      "Policy evaluation with agent intent alignment",
      "Full five-outcome authorization engine",
      "Tamper-evident audit receipts per action",
      "Cryptographic identity binding for agents and MCP sessions",
    ],
    requirements: [
      { id: "R1", title: "Pre-execution interception", status: "pass" },
      { id: "R2", title: "Context accumulation", status: "pass" },
      { id: "R3", title: "Policy evaluation with intent alignment", status: "pass" },
      { id: "R4", title: "Five authorization decisions", status: "pass" },
      { id: "R5", title: "Tamper-evident receipts", status: "pass" },
      { id: "R6", title: "Identity binding", status: "pass" },
    ],
    highlights: [
      { label: "Focus", value: "MCP & Agent governance" },
      { label: "Verified", value: "April 2026" },
    ],
  },
];
