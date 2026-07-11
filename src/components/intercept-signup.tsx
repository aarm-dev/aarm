"use client";

import { useState, useTransition } from "react";
import { submitInterceptSignup } from "@/lib/actions";

export function InterceptSignup() {
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState<"builder" | "breaker" | "">("");

  const field =
    "w-full border border-neutral-700 bg-black px-3 py-2.5 font-mono text-sm text-neutral-100 placeholder-neutral-600 outline-none focus:border-[#FF7A00]";

  if (done) {
    return (
      <div className="border border-[#2EFF7B] bg-[#2EFF7B]/5 p-8 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">Request received</div>
        <div className="mt-2 font-mono text-2xl font-bold text-[#2EFF7B]">ACCESS: GRANTED</div>
        <p className="mt-3 font-mono text-sm text-neutral-400">
          You&apos;re on the list. Watch your inbox for your INTERCEPT access details.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
      <div className="space-y-3">
        <input className={field} type="email" placeholder="EMAIL *" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="grid gap-3 sm:grid-cols-2">
          <input className={field} placeholder="NAME" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={field} placeholder="COMPANY" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div>
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">Are you a…</div>
          <div className="grid grid-cols-2 gap-3">
            {([["builder", "#2EFF7B"], ["breaker", "#FF3B30"]] as const).map(([r, color]) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(role === r ? "" : r)}
                className="border px-3 py-2.5 font-mono text-sm uppercase tracking-widest transition-colors"
                style={
                  role === r
                    ? { borderColor: color, color, backgroundColor: `${color}14` }
                    : { borderColor: "#404040", color: "#a3a3a3" }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="font-mono text-sm text-[#FF3B30]">{error}</p>}

        <button
          disabled={pending || !email}
          onClick={() =>
            start(async () => {
              setError(null);
              try {
                await submitInterceptSignup({ email, name, company, role });
                setDone(true);
              } catch (e) {
                setError(e instanceof Error ? e.message : "Submission failed.");
              }
            })
          }
          className="mt-2 w-full border-2 border-[#FF7A00] bg-[#FF7A00] px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-[#FF7A00] disabled:opacity-40"
        >
          {pending ? "Submitting…" : "[ Submit for Review ]"}
        </button>
      </div>
    </div>
  );
}
