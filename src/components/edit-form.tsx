"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateOwnedBuilder } from "@/lib/actions";
import { MultiChips, SingleSelect } from "@/components/multi-chips";
import {
  CATEGORIES, SURFACES, STAGES, TYPES, AUDIENCES, DEPLOYMENTS,
  type Category, type Surface, type Stage, type ProductType, type Audience, type Deployment,
} from "@/db/taxonomy";
import type { BuilderRow } from "@/db/schema";

export function EditForm({ builder }: { builder: BuilderRow }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [description, setDescription] = useState(builder.description ?? "");
  const [logoUrl, setLogoUrl] = useState(builder.logoUrl ?? "");
  const [category, setCategory] = useState<Category | "">((builder.category as Category) ?? "");
  const [surfaces, setSurfaces] = useState<Surface[]>(builder.surfaces ?? []);
  const [stage, setStage] = useState<Stage | "">((builder.stage as Stage) ?? "");
  const [types, setTypes] = useState<ProductType[]>(builder.types ?? []);
  const [audiences, setAudiences] = useState<Audience[]>(builder.audiences ?? []);
  const [deployments, setDeployments] = useState<Deployment[]>(builder.deployments ?? []);

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
      <SingleSelect label="Primary category" options={CATEGORIES} value={category} onChange={setCategory} />
      <MultiChips label="Coverage surface" options={SURFACES} selected={surfaces} onChange={setSurfaces} />
      <SingleSelect label="Stage" options={STAGES} value={stage} onChange={setStage} />
      <MultiChips label="Type" options={TYPES} selected={types} onChange={setTypes} />
      <MultiChips label="Target audience" options={AUDIENCES} selected={audiences} onChange={setAudiences} />
      <MultiChips label="Deployment" options={DEPLOYMENTS} selected={deployments} onChange={setDeployments} />

      <div className="rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-3 text-xs text-neutral-500">
        Conformance level, verified date, interception architecture, policy model, and the
        authorization-decision matrix are set by the AARM Technical Working Group and aren&apos;t
        editable here.
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {saved && <p className="text-sm text-green-600">Saved.</p>}

      <button
        disabled={pending}
        onClick={() =>
          start(async () => {
            setError(null);
            setSaved(false);
            try {
              await updateOwnedBuilder(builder.id, {
                description, logoUrl,
                category: category || undefined,
                surfaces, stage: stage || undefined, types, audiences, deployments,
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
