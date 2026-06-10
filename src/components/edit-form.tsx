"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateOwnedBuilder } from "@/lib/actions";
import { MultiChips, SingleSelect } from "@/components/multi-chips";
import {
  SURFACES, STAGES, TYPES, AUDIENCES, DEPLOYMENTS,
  INTERCEPTION_ARCHITECTURES, POLICY_MODELS, AUTH_DECISIONS,
  type Surface, type Stage, type ProductType, type Audience, type Deployment,
  type InterceptionArchitecture, type PolicyModel, type AuthDecision,
} from "@/db/taxonomy";
import type { BuilderRow } from "@/db/schema";

export function EditForm({ builder }: { builder: BuilderRow }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [description, setDescription] = useState(builder.description ?? "");
  const [logoUrl, setLogoUrl] = useState(builder.logoUrl ?? "");
  const [surfaces, setSurfaces] = useState<Surface[]>(builder.surfaces ?? []);
  const [stage, setStage] = useState<Stage | "">((builder.stage as Stage) ?? "");
  const [types, setTypes] = useState<ProductType[]>(builder.types ?? []);
  const [audiences, setAudiences] = useState<Audience[]>(builder.audiences ?? []);
  const [deployments, setDeployments] = useState<Deployment[]>(builder.deployments ?? []);
  const [interception, setInterception] = useState<InterceptionArchitecture[]>(builder.interception ?? []);
  const [policyModel, setPolicyModel] = useState<PolicyModel | "">((builder.policyModel as PolicyModel) ?? "");
  const [decisions, setDecisions] = useState<AuthDecision[]>(builder.decisions ?? []);
  const [pocName, setPocName] = useState(builder.pocName ?? "");
  const [pocEmail, setPocEmail] = useState(builder.pocEmail ?? "");

  const pocValid = pocName.trim().length > 0 && /^\S+@\S+\.\S+$/.test(pocEmail.trim());

  return (
    <div className="space-y-6">
      <div>
        <label className={labelCls}>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={input} />
      </div>
      <div>
        <label className={labelCls}>Logo URL</label>
        <input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className={input} placeholder="https://…" />
      </div>
      <MultiChips label="Coverage surface" options={SURFACES} selected={surfaces} onChange={setSurfaces} />
      <SingleSelect label="Stage" options={STAGES} value={stage} onChange={setStage} />
      <MultiChips label="Type" options={TYPES} selected={types} onChange={setTypes} />
      <MultiChips label="Target audience" options={AUDIENCES} selected={audiences} onChange={setAudiences} />
      <MultiChips label="Deployment" options={DEPLOYMENTS} selected={deployments} onChange={setDeployments} />

      <div className="border-t border-neutral-100 pt-6">
        <h2 className="mb-1 text-sm font-semibold text-neutral-900">Technical profile</h2>
        <p className="mb-5 text-xs text-neutral-400">
          Self-reported — how your product works against the AARM spec.
        </p>
        <div className="space-y-6">
          <MultiChips label="Interception architecture (R1)" options={INTERCEPTION_ARCHITECTURES} selected={interception} onChange={setInterception} />
          <SingleSelect label="Policy model (R3)" options={POLICY_MODELS} value={policyModel} onChange={setPolicyModel} />
          <MultiChips label="Authorization decisions (R4)" options={AUTH_DECISIONS} selected={decisions} onChange={setDecisions} />
        </div>
      </div>

      <div className="border-t border-neutral-100 pt-6">
        <h2 className="mb-1 text-sm font-semibold text-neutral-900">Point of contact <span className="text-red-500">*</span></h2>
        <p className="mb-5 text-xs text-neutral-400">
          Required. Who the AARM working group reaches about this listing (team-only, not shown publicly).
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Name</label>
            <input value={pocName} onChange={(e) => setPocName(e.target.value)} className={input} placeholder="Jane Doe" />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input value={pocEmail} onChange={(e) => setPocEmail(e.target.value)} className={input} placeholder="jane@company.com" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-3 text-xs text-neutral-500">
        Conformance level, verified date, and the R1–R9 pass/fail matrix are the AARM Technical
        Working Group&apos;s verified verdict and aren&apos;t editable here.
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {saved && <p className="text-sm text-green-600">Saved.</p>}

      {!pocValid && <p className="text-xs text-neutral-400">Add a point-of-contact name and a valid email to save.</p>}

      <button
        disabled={pending || !pocValid}
        onClick={() =>
          start(async () => {
            setError(null);
            setSaved(false);
            try {
              await updateOwnedBuilder(builder.id, {
                description, logoUrl,
                surfaces, stage: stage || undefined, types, audiences, deployments,
                interception, policyModel: policyModel || undefined, decisions,
                pocName: pocName.trim(), pocEmail: pocEmail.trim(),
              });
              setSaved(true);
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Save failed.");
            }
          })
        }
        className="rounded-lg px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-85 disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #1A6EB5 0%, #1E4FA0 100%)" }}
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}

const input =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-neutral-400";
const labelCls = "mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-400";
