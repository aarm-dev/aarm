# AARM — Autonomous Action Runtime Management

**The system category for agentic runtime security.**

[![arXiv](https://img.shields.io/badge/arXiv-2602.09433-b31b1b.svg)](https://arxiv.org/abs/2602.09433)
[![CSA](https://img.shields.io/badge/Cloud_Security_Alliance-TWG-0066cc)](https://cloudsecurityalliance.org/research/working-groups/autonomous-action-runtime-management-aarm)
[![Spec](https://img.shields.io/badge/spec-v1.0-green)](https://aarm.dev/spec)
[![License](https://img.shields.io/badge/license-CC_BY_4.0-lightgrey)](LICENSE)

---

Autonomous Action Runtime Management (AARM) is an open system specification for securing AI-driven actions at runtime. It defines what a runtime security system must do — not how to build it. An AARM system intercepts actions before execution, evaluates them against policy and contextual intent, enforces authorization decisions (allow, deny, modify, defer, or step-up), and records tamper-evident receipts binding action, context, and outcome for forensic reconstruction.

```
Agent proposes action
        │
        ▼
┌───────────────────┐
│  AARM Control     │  ← intercept every action
│  Plane            │  ← accumulate session context
│                   │  ← evaluate against policy + intent
│  ALLOW / DENY /   │  ← decide with 5 possible outcomes
│  MODIFY / STEP_UP │  ← produce tamper-evident receipt
│  / DEFER          │
└───────────────────┘
        │
        ▼
 Action executes (or doesn't)
```

---

## Specification

| ID | Requirement | Level | Conformance |
|----|-------------|-------|-------------|
| R1 | Pre-execution interception | MUST | Core |
| R2 | Context accumulation | MUST | Core |
| R3 | Policy evaluation with intent alignment | MUST | Core |
| R4 | Five authorization decisions | MUST | Core |
| R5 | Tamper-evident receipts | MUST | Core |
| R6 | Identity binding | MUST | Core |
| R7 | Semantic distance tracking | SHOULD | Extended |
| R8 | Telemetry export (OpenTelemetry) | SHOULD | Extended |
| R9 | Least-privilege enforcement | SHOULD | Extended |

**AARM Core** — satisfy R1–R6. Baseline conformance.  
**AARM Extended** — satisfy R1–R9. Full governance maturity.

Full specification: [aarm.dev/spec](https://aarm.dev/spec) · arXiv: [2602.09433](https://arxiv.org/abs/2602.09433)

---

## Threat Model

AARM addresses 11 attack classes on agentic AI systems:

`Prompt injection` `Data exfiltration` `Confused deputy` `Goal hijacking` `Memory poisoning` `Intent drift` `Cross-agent propagation` `Over-privileged credentials` `Side-channel leakage` `Environmental manipulation` `Malicious tool output`

---

## Conformance

Builders can claim one of two conformance levels:

```
AARM Core     ✓  R1 R2 R3 R4 R5 R6
AARM Extended ✦  R1 R2 R3 R4 R5 R6 R7 R8 R9
```

To claim conformance:

1. Satisfy all MUST requirements for your target level
2. Complete the testing protocol and compile an evidence package
3. Engage with the working group before submitting
4. Submit your evidence — review takes up to 14 days

→ [aarm.dev/conformance](https://aarm.dev/conformance)

---

## Builder Registry

Products that have claimed AARM conformance are listed at [aarm.dev/builders](https://aarm.dev/builders). The registry is community-verified — builders submit evidence, the TWG reviews.

To get listed, open an issue or submit a PR with your evidence package.

---

## Working Group

AARM is a [Cloud Security Alliance](https://cloudsecurityalliance.org) Technical Working Group project. The TWG governs the specification, conformance process, and builder registry through open collaboration.

**Authors:** Herman Errico (Vanta), Akul Loomba  
**Contributors:** 12 security practitioners, researchers, and builders — [full list](https://aarm.dev/working-group)

→ [Join the TWG](https://cloudsecurityalliance.org/research/working-groups/autonomous-action-runtime-management-aarm)

---

## This Repo

This repository contains the source for [aarm.dev](https://aarm.dev) — the spec site, builder registry, and conformance requirements.

```
src/
├── app/
│   ├── spec/          ← full specification (v1.0)
│   ├── conformance/   ← requirements + how to claim
│   ├── builders/      ← builder registry + detail pages
│   └── working-group/ ← TWG members
├── data/
│   ├── builders.ts    ← registry data
│   └── builder-details.ts
└── components/
```

**Stack:** Next.js · TypeScript · Tailwind CSS · Vercel

```bash
npm install
npm run dev     # → localhost:3000
npm run build   # type-check + build
```

---

## Contributing

Specification changes, new builder submissions, and conformance feedback are all welcome.

- **Spec changes** — open an issue describing the proposed requirement change
- **Builder submissions** — open a PR adding your entry to `src/data/builders.ts`
- **Conformance questions** — open a discussion or reach out via the TWG

→ [github.com/aarm-dev/aarm](https://github.com/aarm-dev/aarm)

---

<sub>AARM is an open standard. Specification text is licensed under CC BY 4.0. Website source is MIT.</sub>
