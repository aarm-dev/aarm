// AARM builder registry classification taxonomy.
// Tier 1 (category, surface, stage, type, audience, deployment) is fillable by anyone.
// Tier 2 (interception, policyModel, decisions) is spec-grounded and TWG-verified.

/** Primary product category — derived from the actual registry clusters. */
export const CATEGORIES = [
  "Runtime enforcement / control plane",
  "MCP / tool / API gateway",
  "Identity, access & authorization",
  "Discovery, posture & governance",
  "Threat detection & response",
  "Audit, receipts & assurance",
  "Data / wire-protocol security",
  "Endpoint / local runtime",
] as const;
export type Category = (typeof CATEGORIES)[number];

/** Where the product operates (multi). */
export const SURFACES = ["MCP", "SaaS", "Endpoint", "Cloud", "Data/DB", "API", "Network"] as const;
export type Surface = (typeof SURFACES)[number];

/** Company stage. */
export const STAGES = ["Founding", "Developing", "PoC", "Launched"] as const;
export type Stage = (typeof STAGES)[number];

/** Licensing model (multi — supports Open Core). */
export const TYPES = ["Open Source", "Commercial", "Open Core"] as const;
export type ProductType = (typeof TYPES)[number];

/** Target audience (multi). */
export const AUDIENCES = ["SMB", "Mid-market", "Enterprise", "Developers", "Public Sector"] as const;
export type Audience = (typeof AUDIENCES)[number];

/** Deployment model (multi). */
export const DEPLOYMENTS = ["SaaS", "Self-hosted", "Hybrid"] as const;
export type Deployment = (typeof DEPLOYMENTS)[number];

// ── Tier 2: spec-grounded technical axes (TWG-verified) ──────────────────────

/** AARM spec §6 reference architectures (R1 interception). Multi. */
export const INTERCEPTION_ARCHITECTURES = [
  "Protocol Gateway", // §6.1 — network-layer proxy
  "SDK Instrumentation", // §6.2 — agent-framework integration
  "Kernel eBPF", // §6.3 — syscall-level hooks
  "Vendor Integration", // §6.4 — platform-native
] as const;
export type InterceptionArchitecture = (typeof INTERCEPTION_ARCHITECTURES)[number];

/** Policy evaluation model (R3). */
export const POLICY_MODELS = ["Deterministic", "Non-deterministic", "Hybrid"] as const;
export type PolicyModel = (typeof POLICY_MODELS)[number];

/** Authorization decisions implemented (R4). Multi. */
export const AUTH_DECISIONS = ["ALLOW", "DENY", "MODIFY", "STEP_UP", "DEFER"] as const;
export type AuthDecision = (typeof AUTH_DECISIONS)[number];

export const CONFORMANCE_LEVELS = ["none", "aligned", "core", "extended"] as const;
export type ConformanceLevel = (typeof CONFORMANCE_LEVELS)[number];

export const LISTING_STATUSES = ["pending", "approved", "rejected"] as const;
export type ListingStatus = (typeof LISTING_STATUSES)[number];

export const CLAIM_STATUSES = ["pending", "approved", "rejected"] as const;
export type ClaimStatus = (typeof CLAIM_STATUSES)[number];
