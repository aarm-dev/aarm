"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitListing } from "@/lib/actions";
import { MultiChips, SingleSelect } from "@/components/multi-chips";
import {
  CATEGORIES, SURFACES, STAGES, TYPES, AUDIENCES, DEPLOYMENTS,
  type Category, type Surface, type Stage, type ProductType, type Audience, type Deployment,
} from "@/db/taxonomy";

export default function NewBuilderPage() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [surfaces, setSurfaces] = useState<Surface[]>([]);
  const [stage, setStage] = useState<Stage | "">("");
  const [types, setTypes] = useState<ProductType[]>([]);
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [pocName, setPocName] = useState("");
  const [pocEmail, setPocEmail] = useState("");

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="mb-3 text-2xl font-bold text-neutral-900">Submitted for review</h1>
        <p className="text-neutral-500">
          Thanks — the AARM Technical Working Group will review your submission. Conformance level
          and positioning are set by the TWG.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900">Add your company</h1>
      <p className="mb-8 text-sm text-neutral-500">
        Submit your product to the AARM builder registry. The TWG reviews every submission before it
        goes live; conformance status is assigned separately.
      </p>

      <div className="space-y-6">
        <Field label="Company name *">
          <input value={name} onChange={(e) => setName(e.target.value)} className={input} placeholder="Acme Security" />
        </Field>
        <Field label="Website *">
          <input value={website} onChange={(e) => setWebsite(e.target.value)} className={input} placeholder="https://acme.security" />
        </Field>
        <Field label="One-line description *">
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={input} placeholder="What does your product do?" />
        </Field>

        <SingleSelect label="Primary category" options={CATEGORIES} value={category} onChange={setCategory} />
        <MultiChips label="Coverage surface" options={SURFACES} selected={surfaces} onChange={setSurfaces} />
        <SingleSelect label="Stage" options={STAGES} value={stage} onChange={setStage} />
        <MultiChips label="Type" options={TYPES} selected={types} onChange={setTypes} />
        <MultiChips label="Target audience" options={AUDIENCES} selected={audiences} onChange={setAudiences} />
        <MultiChips label="Deployment" options={DEPLOYMENTS} selected={deployments} onChange={setDeployments} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Point of contact — name">
            <input value={pocName} onChange={(e) => setPocName(e.target.value)} className={input} />
          </Field>
          <Field label="Point of contact — email">
            <input value={pocEmail} onChange={(e) => setPocEmail(e.target.value)} className={input} />
          </Field>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          disabled={pending || !name || !website || !description}
          onClick={() =>
            start(async () => {
              setError(null);
              try {
                await submitListing({
                  name, website, description,
                  category: category || undefined,
                  surfaces, stage: stage || undefined, types, audiences, deployments,
                  pocName: pocName || undefined, pocEmail: pocEmail || undefined,
                });
                setDone(true);
                router.refresh();
              } catch (e) {
                setError(e instanceof Error ? e.message : "Submission failed.");
              }
            })
          }
          className="rounded-lg px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-85 disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #F5923A 0%, #D45420 100%)" }}
        >
          {pending ? "Submitting…" : "Submit for review"}
        </button>
      </div>
    </div>
  );
}

const input =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-neutral-400";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-400">{label}</label>
      {children}
    </div>
  );
}
