export type ConformanceLevel = "Core" | "Extended";

export type RequirementStatus = "pass" | "fail" | "na";

export type BuilderDetail = {
  slug: string;
  name: string;
  url: string;
  tagline: string;
  conformanceLevel: ConformanceLevel;
  verifiedDate: string;
  about: string;
  capabilities: string[];
  architecture: string;
  requirements: {
    id: string;
    title: string;
    status: RequirementStatus;
    notes?: string;
  }[];
  keyFacts: { label: string; value: string }[];
  contact?: { label: string; value: string; href?: string }[];
};

export const BUILDER_DETAILS: BuilderDetail[] = [
  {
    slug: "noma",
    name: "Noma Security",
    url: "https://noma.security",
    tagline: "Enterprise AI security & governance platform",
    conformanceLevel: "Core",
    verifiedDate: "February 2025",
    about:
      "Noma discovers, governs, and protects AI and agents across the enterprise — from homegrown AI to SaaS agents and coding assistants. It provides unified visibility, policy enforcement, and tamper-evident audit across the full AI lifecycle, with deep integrations into major AI frameworks, cloud providers, and identity systems.",
    capabilities: [
      "Pre-execution interception of every agent-initiated action",
      "Context accumulation across conversation threads and task horizons",
      "Policy evaluation with intent alignment at action time",
      "Five-outcome authorization engine: ALLOW, DENY, MODIFY, STEP_UP, DEFER",
      "Tamper-evident receipts with timestamp and decision context",
      "Cryptographic identity binding on every action receipt",
    ],
    architecture:
      "Noma enforces AARM requirements through a unified control plane that sits between AI agents and the systems they interact with. Every agent-initiated action is intercepted before execution, evaluated against accumulated session context and organizational policy, and assigned one of five authorization decisions. The platform maintains a tamper-evident audit trail with cryptographic identity binding, enabling full forensic reconstruction of agent activity across sessions.",
    requirements: [
      { id: "R1", title: "Pre-execution interception", status: "pass" },
      { id: "R2", title: "Context accumulation", status: "pass" },
      { id: "R3", title: "Policy evaluation with intent alignment", status: "pass" },
      { id: "R4", title: "Five authorization decisions", status: "pass" },
      { id: "R5", title: "Tamper-evident receipts", status: "pass" },
      { id: "R6", title: "Identity binding", status: "pass" },
      { id: "R7", title: "Semantic distance tracking", status: "na" },
      { id: "R8", title: "Telemetry export", status: "na" },
      { id: "R9", title: "Least privilege enforcement", status: "na" },
    ],
    keyFacts: [
      { label: "Headquarters", value: "Tel Aviv & New York" },
      { label: "Funding", value: "$132M+ (Series B)" },
      { label: "Customers", value: "500+ enterprises including Fortune 500" },
      { label: "Team", value: "100+" },
      { label: "Certifications", value: "SOC 2 Type II, ISO 27001, GDPR, HIPAA" },
      { label: "Verified", value: "February 2025" },
    ],
    contact: [
      { label: "Website", value: "noma.security", href: "https://noma.security" },
    ],
  },
  {
    slug: "runlayer",
    name: "Runlayer",
    url: "https://runlayer.com",
    tagline: "Enterprise control plane for MCP servers, skills, and agents",
    conformanceLevel: "Extended",
    verifiedDate: "April 2026",
    about:
      "Runlayer is the enterprise control plane for MCP servers, skills, and agents. It gives organizations a single place to host, govern, and secure the AI tools their employees rely on — across clients like Cursor, Claude Code, ChatGPT, and VS Code — without forcing users to change their workflows. The platform combines a curated catalog of vetted MCP servers with real-time threat detection, identity-aware access control, and full observability across every agent action.",
    capabilities: [
      "MCP gateway that proxies every tool call with real-time policy enforcement",
      "Shadow detection and enforcement at the endpoint level via MDM and EDR",
      "Purpose-built ML threat detection models trained on MCP-specific attacks",
      "Deep identity integration with Okta, Entra, SSO, and SCIM",
      "Tamper-evident audit logs of every agent action and tool call",
      "Slack-based human-in-the-loop approval workflows for sensitive actions",
      "Semantic distance tracking across long agent task horizons (R7)",
      "Telemetry export to Splunk, Datadog, Honeycomb, and S3 (R8)",
      "Least-privilege credential and tool scoping at execution time (R9)",
    ],
    architecture:
      "Runlayer enforces AARM requirements through two complementary interception patterns. The primary gateway pattern sits between AI clients and MCP servers, proxying every tool call through a control plane where policies and ML security models evaluate the request before it reaches downstream systems. A secondary shadow pattern extends visibility and enforcement to endpoints, so activity originating on local developer machines is brought under the same policy surface. Context accumulation is handled through full session reconstruction across clients and tools, giving the platform end-to-end visibility into agent intent and actions across the full lifecycle. Authorization decisions, identity bindings, and policy evaluations are written to an append-only audit layer.",
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
    keyFacts: [
      { label: "Founded", value: "2025" },
      { label: "Funding", value: "$11M seed (Khosla Ventures, Felicis)" },
      { label: "Customers", value: "Gusto, dbt Labs, Instacart, Opendoor + more" },
      { label: "Leadership", value: "Andrew Berman (CEO), Tal Peretz, Vitor Balocco" },
      { label: "Deployment", value: "Cloud or self-hosted (VPC)" },
      { label: "Verified", value: "April 2026" },
    ],
    contact: [
      { label: "Website", value: "runlayer.com", href: "https://runlayer.com" },
      { label: "LinkedIn", value: "linkedin.com/company/runlayer", href: "https://www.linkedin.com/company/runlayer/" },
    ],
  },
  {
    slug: "formal",
    name: "Formal",
    url: "https://formal.ai",
    tagline: "Protocol-aware reverse proxy for data, infrastructure, and AI agent traffic",
    conformanceLevel: "Core",
    verifiedDate: "April 2026",
    about:
      "Formal is a protocol-aware reverse proxy that enforces least privilege at the wire-protocol level across data, infrastructure, and AI agent traffic. It sits between identities and resources like databases, warehouses, SSH/Kubernetes servers, and MCP servers — parsing wire protocols natively and evaluating security policies inline on every request. For AI agent workloads, Formal proxies traffic between agents and resources, applying identity resolution, query-level authorization, PII masking, tool-call filtering, and full audit capture.",
    capabilities: [
      "Universal agent network proxy covering databases, infrastructure, and MCP servers",
      "Eight inline policy actions: Allow, Block, Mask, Filter, Rewrite, Quarantine, Suspend, MFA",
      "Identity-aware JIT access scoped to individual commands and data",
      "Panopticon audit layer with sub-second search across full history",
      "PII and PHI masking at the query level for HIPAA, SOC 2, PCI DSS, and GDPR",
      "Policy backtesting against 31 days of historical logs before enforcement",
    ],
    architecture:
      "Formal enforces AARM requirements through interception at two complementary layers. The first is a client-side layer that sits between AI coding tools and the model APIs they call, allowing agent tool calls to be inspected and blocked pre-execution based on policy. The second layer is a protocol-aware proxy between identities and downstream resources. It applies policies across session, request, and response stages. Because agent-originated traffic carries context from the first layer, the proxy can differentiate human-issued queries from agent-session queries and apply controls accordingly. Policy decisions, identity bindings, and tool calls are written to a tamper-evident audit trail, exportable to common SIEM and observability backends.",
    requirements: [
      { id: "R1", title: "Pre-execution interception", status: "pass" },
      { id: "R2", title: "Context accumulation", status: "pass" },
      { id: "R3", title: "Policy evaluation with intent alignment", status: "pass", notes: "Deterministic; non intent-based" },
      { id: "R4", title: "Five authorization decisions", status: "pass" },
      { id: "R5", title: "Tamper-evident receipts", status: "pass" },
      { id: "R6", title: "Identity binding", status: "pass" },
      { id: "R7", title: "Semantic distance tracking", status: "fail" },
      { id: "R8", title: "Telemetry export", status: "pass" },
      { id: "R9", title: "Least privilege enforcement", status: "pass" },
    ],
    keyFacts: [
      { label: "Founded", value: "2023" },
      { label: "Funding", value: "$6M+ seed (Thrive Capital)" },
      { label: "Customers", value: "Cursor, Notion, EliseAI, Anchorage" },
      { label: "Leadership", value: "Mokhtar Bacha (Founder & CEO)" },
      { label: "Deployment", value: "Self-hosted in customer VPC" },
      { label: "Verified", value: "April 2026" },
    ],
    contact: [
      { label: "Website", value: "formal.ai", href: "https://formal.ai" },
      { label: "Docs", value: "docs.formal.ai", href: "https://docs.formal.ai" },
    ],
  },
  {
    slug: "operant",
    name: "Operant AI",
    url: "https://operant.ai",
    tagline: "Runtime application protection for AI agents, MCP, and agentic workloads",
    conformanceLevel: "Extended",
    verifiedDate: "May 2026",
    about:
      "Operant AI provides runtime protection for AI agents, MCP servers, and agentic applications. The platform centers on two enforcement components: the Operant Endpoint Protector, which intercepts MCP tool calls, prompts, and shell executions before execution, and the Operant Agent Protector, which extends real-time enforcement across LangGraph, CrewAI, n8n, and the ChatGPT Agents SDK. The gateway emits signed AARM receipts for every decision class across all five authorization outcomes.",
    capabilities: [
      "Pre-execution MCP gateway intercepting tool calls inline before execution",
      "All five AARM authorization decisions with traceable receipts",
      "Identity binding via Okta and Google OAuth with deny-on-missing-identity",
      "Signed Ed25519 receipts with hash-chained context fields for tamper detection",
      "Inline PII detection and redaction (emails, SSNs, and other entity classes)",
      "AI Agent Scope Guard with per-agent natural-language scope definitions",
      "Semantic distance tracking across extended agent sessions (R7)",
      "Telemetry export to Splunk with documented JSON schema (R8)",
      "JIT credential issuance integrating HashiCorp Vault, CyberArk, AWS IAM (R9)",
    ],
    architecture:
      "Operant enforces AARM requirements at the MCP Gateway, a pre-execution interception point between the agent client and downstream MCP servers. Every tool call routes through the gateway, where the request is parsed at the protocol level, sensitive-entity scanners classify parameters, accumulated session context is loaded, the applicable policy is evaluated, and a decision is returned inline before the tool executes. Session context is captured and chained across the full agent loop — a single request ID links the original user prompt, every subsequent tool call, every detection event, and the final agent response. Every decision produces an AARM receipt containing action descriptors, requester context, policy decision, execution outcome, and an Ed25519 signature with key identifier.",
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
    keyFacts: [
      { label: "Headquarters", value: "San Francisco, USA" },
      { label: "Customers", value: "Chargebee + commercial customers" },
      { label: "Leadership", value: "Vrajesh Bhavsar, Priyanka Tembey, Ashley Roof (Co-founders)" },
      { label: "Compliance", value: "SOC 2 Type II (Advantage Partners)" },
      { label: "Memberships", value: "CNCF, OWASP Foundation, Coalition for Secure AI" },
      { label: "Verified", value: "May 2026" },
    ],
    contact: [
      { label: "Website", value: "operant.ai", href: "https://operant.ai" },
    ],
  },
  {
    slug: "mintmcp",
    name: "MintMCP",
    url: "https://mintmcp.com",
    tagline: "Enterprise governance for AI agents and MCP servers",
    conformanceLevel: "Core",
    verifiedDate: "April 2026",
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
    architecture:
      "MintMCP enforces AARM requirements through a centralized MCP governance layer that sits between agent clients and the MCP servers they access. Every tool call is intercepted pre-execution, evaluated against accumulated session context and policy, and logged with a tamper-evident receipt before the action is allowed to proceed.",
    requirements: [
      { id: "R1", title: "Pre-execution interception", status: "pass" },
      { id: "R2", title: "Context accumulation", status: "pass" },
      { id: "R3", title: "Policy evaluation with intent alignment", status: "pass" },
      { id: "R4", title: "Five authorization decisions", status: "pass" },
      { id: "R5", title: "Tamper-evident receipts", status: "pass" },
      { id: "R6", title: "Identity binding", status: "pass" },
      { id: "R7", title: "Semantic distance tracking", status: "na" },
      { id: "R8", title: "Telemetry export", status: "na" },
      { id: "R9", title: "Least privilege enforcement", status: "na" },
    ],
    keyFacts: [
      { label: "Focus", value: "MCP & Agent governance" },
      { label: "Verified", value: "April 2026" },
    ],
    contact: [
      { label: "Website", value: "mintmcp.com", href: "https://mintmcp.com" },
    ],
  },
];
