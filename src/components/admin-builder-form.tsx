"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateConformance } from "@/lib/actions";
import { MultiChips, SingleSelect } from "@/components/multi-chips";
import {
  CONFORMANCE_LEVELS, SURFACES, STAGES, TYPES, AUDIENCES, DEPLOYMENTS,
  INTERCEPTION_ARCHITECTURES, POLICY_MODELS, AUTH_DECISIONS,
  type ConformanceLevel, type Surface, type Stage, type ProductType, type Audience,
  type Deployment, type InterceptionArchitecture, type PolicyModel, type AuthDecision,
} from "@/db/taxonomy";
import type { BuilderRow } from "@/db/schema";

const REQS = [
  ["R1", "Pre-execution interception"], ["R2", "Context accumulation"],
  ["R3", "Policy + intent alignment"], ["R4", "Five decisions"],
  ["R5", "Tamper-evident receipts"], ["R6", "Identity binding"],
  ["R7", "Semantic drift tracking"], ["R8", "Telemetry export"],
  ["R9", "Least-privilege"],
] as const;
type Status = "pass" | "fail" | "na";

export function AdminBuilderForm({ builder }: { builder: BuilderRow }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [conformanceLevel, setConformanceLevel] = useState<ConformanceLevel | "">((builder.conformanceLevel as ConformanceLevel) ?? "");
  const [verifiedDate, setVerifiedDate] = useState(builder.verifiedDate ?? "");
  const [verifiedBy, setVerifiedBy] = useState(builder.verifiedBy ?? "");
  const [tagline, setTagline] = useState(builder.tagline ?? "");
  const [about, setAbout] = useState(builder.about ?? "");
  const [architecture, setArchitecture] = useState(builder.architecture ?? "");
  const [capabilities, setCapabilities] = useState((builder.capabilities ?? []).join("\n"));
  const [interception, setInterception] = useState<InterceptionArchitecture[]>(builder.interception ?? []);
  const [policyModel, setPolicyModel] = useState<PolicyModel | "">((builder.policyModel as PolicyModel) ?? "");
  const [decisions, setDecisions] = useState<AuthDecision[]>(builder.decisions ?? []);
  const [surfaces, setSurfaces] = useState<Surface[]>(builder.surfaces ?? []);
  const [stage, setStage] = useState<Stage | "">((builder.stage as Stage) ?? "");
  const [types, setTypes] = useState<ProductType[]>(builder.types ?? []);
  const [audiences, setAudiences] = useState<Audience[]>(builder.audiences ?? []);
  const [deployments, setDeployments] = useState<Deployment[]>(builder.deployments ?? []);
  const [reqs, setReqs] = useState<Record<string, Status>>(() => {
    const m: Record<string, Status> = {};
    for (const [id] of REQS) m[id] = (builder.requirements?.find((r) => r.id === id)?.status as Status) ?? "na";
    return m;
  });

  function save() {
    start(async () => {
      setError(null); setSaved(false);
      try {
        await updateConformance(builder.id, {
          conformanceLevel: (conformanceLevel || "aligned") as ConformanceLevel,
          verifiedDate: verifiedDate || null,
          verifiedBy: verifiedBy || null,
          tagline: tagline || null,
          about: about || null,
          architecture: architecture || null,
          capabilities: capabilities.split("\n").map((s) => s.trim()).filter(Boolean),
          interception,
          policyModel: (policyModel || null) as PolicyModel,
          decisions,
          surfaces, types, audiences, deployments,
          stage: (stage || null) as Stage,
          requirements: REQS.map(([id]) => ({ id, status: reqs[id] })),
        });
        setSaved(true);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed.");
      }
    });
  }

  return (
    <div className="space-y-7">
      <section className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">Conformance (TWG)</h2>
        <SingleSelect label="Conformance level" options={CONFORMANCE_LEVELS} value={conformanceLevel} onChange={setConformanceLevel} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Verified date"><input className={input} value={verifiedDate} onChange={(e) => setVerifiedDate(e.target.value)} placeholder="June 14, 2026" /></Field>
          <Field label="Verified by"><input className={input} value={verifiedBy} onChange={(e) => setVerifiedBy(e.target.value)} placeholder="AARM Conformance Agent" /></Field>
        </div>
        <Field label="Tagline"><input className={input} value={tagline} onChange={(e) => setTagline(e.target.value)} /></Field>
      </section>

      <section>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">Requirement coverage</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          {REQS.map(([id, title]) => (
            <div key={id} className="flex items-center gap-2 rounded-lg border border-neutral-100 px-3 py-2">
              <code className="font-mono text-xs font-bold" style={{ color: "#1A6EB5" }}>{id}</code>
              <span className="flex-1 truncate text-xs text-neutral-500" title={title}>{title}</span>
              <select value={reqs[id]} onChange={(e) => setReqs((r) => ({ ...r, [id]: e.target.value as Status }))} className="rounded border border-neutral-200 px-1 py-0.5 text-xs">
                <option value="pass">pass</option>
                <option value="fail">fail</option>
                <option value="na">n/a</option>
              </select>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">Technical profile</h2>
        <MultiChips label="Interception (R1)" options={INTERCEPTION_ARCHITECTURES} selected={interception} onChange={setInterception} />
        <SingleSelect label="Policy model (R3)" options={POLICY_MODELS} value={policyModel} onChange={setPolicyModel} />
        <MultiChips label="Decisions (R4)" options={AUTH_DECISIONS} selected={decisions} onChange={setDecisions} />
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">Classification</h2>
        <MultiChips label="Coverage" options={SURFACES} selected={surfaces} onChange={setSurfaces} />
        <SingleSelect label="Stage" options={STAGES} value={stage} onChange={setStage} />
        <MultiChips label="Type" options={TYPES} selected={types} onChange={setTypes} />
        <MultiChips label="Target" options={AUDIENCES} selected={audiences} onChange={setAudiences} />
        <MultiChips label="Deployment" options={DEPLOYMENTS} selected={deployments} onChange={setDeployments} />
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">Review content</h2>
        <Field label="Overview (about)"><textarea className={input} rows={3} value={about} onChange={(e) => setAbout(e.target.value)} /></Field>
        <Field label="Capabilities (one per line)"><textarea className={input} rows={5} value={capabilities} onChange={(e) => setCapabilities(e.target.value)} /></Field>
        <Field label="Architecture review"><textarea className={input} rows={8} value={architecture} onChange={(e) => setArchitecture(e.target.value)} /></Field>
      </section>

      {error && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-600">Saved.</p>}

      <button onClick={save} disabled={pending} className="rounded-lg px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-85 disabled:opacity-40" style={{ background: "linear-gradient(135deg, #1A6EB5 0%, #1E4FA0 100%)" }}>
        {pending ? "Saving…" : "Save conformance"}
      </button>
    </div>
  );
}

const input = "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-neutral-400";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-400">{label}</label>
      {children}
    </div>
  );
}
