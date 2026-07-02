"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { startConformance } from "@/lib/actions";

function YesNo({ value, onChange }: { value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div className="flex gap-2">
      {([["Yes", true], ["No", false]] as const).map(([label, v]) => (
        <button
          key={label}
          type="button"
          onClick={() => onChange(v)}
          className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors ${
            value === v ? "border-transparent bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function ConformanceStart() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [hasCert, setHasCert] = useState<boolean | null>(null);
  const [hasCustomers, setHasCustomers] = useState<boolean | null>(null);
  const [level, setLevel] = useState<"core" | "extended" | "">("");
  const [agreed, setAgreed] = useState(false);

  const eligible = hasCert === true && hasCustomers === true;
  const canSubmit = eligible && agreed && level !== "";

  return (
    <div className="space-y-8">
      <div className="space-y-6 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
        <Q label="Do you hold a recognized security certification (e.g. SOC 2 Type II, ISO 27001, FedRAMP) covering the environment your product runs in?">
          <YesNo value={hasCert} onChange={setHasCert} />
        </Q>
        <Q label="Do you have at least 5 active production customers on live workloads, and can you prove it?">
          <YesNo value={hasCustomers} onChange={setHasCustomers} />
        </Q>
        <Q label="Target conformance level">
          <div className="flex gap-2">
            {(["core", "extended"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                className={`rounded-lg border px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                  level === l ? "border-transparent bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                }`}
              >
                {l === "core" ? "Core (R1–R6)" : "Extended (R1–R9)"}
              </button>
            ))}
          </div>
        </Q>
      </div>

      {hasCert === false || hasCustomers === false ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Both conditions are required to run a conformance review. You can still list as an Aligned
          builder in the registry.
        </div>
      ) : null}

      <label className={`flex items-start gap-3 rounded-xl border p-4 text-sm transition-colors ${eligible ? "border-neutral-200 bg-white" : "border-neutral-100 bg-neutral-50 opacity-60"}`}>
        <input type="checkbox" disabled={!eligible} checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-neutral-900" />
        <span className="text-neutral-700">
          I understand the above is true, and that once I start the conformance review I will be
          required to provide evidence — without which a conformance review cannot be completed or granted.
        </span>
      </label>

      {error && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <button
        disabled={!canSubmit || pending}
        onClick={() =>
          start(async () => {
            setError(null);
            try {
              await startConformance({ hasSecurityCert: hasCert === true, hasFiveCustomers: hasCustomers === true, agreed, targetLevel: level as "core" | "extended" });
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Could not start the review.");
            }
          })
        }
        className="rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-85 disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #F5923A 0%, #D45420 100%)" }}
      >
        {pending ? "Starting…" : "Start my conformance review"}
      </button>
    </div>
  );
}

function Q({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-neutral-800">{label}</p>
      {children}
    </div>
  );
}
