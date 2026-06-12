import type { Metadata } from "next";
import Link from "next/link";
import { BuilderRegistry } from "@/components/builder-registry";
import { getApprovedBuilders } from "@/lib/builders";

export const metadata: Metadata = {
  title: "Builder Registry — AARM",
  description: "Companies building AARM-conformant and AARM-aligned AI agent runtime security products.",
};

// Read the live DB on each request so profile edits show immediately.
export const dynamic = "force-dynamic";

export default async function BuildersPage() {
  const builders = await getApprovedBuilders();
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Builders
        </p>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl tracking-tight">
          Builder Registry
        </h1>
        <p className="max-w-2xl text-muted-foreground text-sm leading-relaxed">
          Compare the products building AARM-conformant systems and tools for the AI agent
          runtime security problem space — by conformance, policy model, interception, and coverage.
        </p>
      </div>

      {/* Legend */}
      <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="rounded-full bg-green-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-green-700">Core</span>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-blue-700">Extended</span>
          satisfy AARM requirements (R1–R6 / R1–R9) ·{" "}
          <Link href="/conformance" className="font-medium" style={{ color: "#1A6EB5" }}>get verified →</Link>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-neutral-400">Aligned</span>
          building in the same space ·{" "}
          <Link href="/builders/new" className="font-medium" style={{ color: "#1A6EB5" }}>add your company →</Link>
        </span>
      </div>

      <BuilderRegistry builders={builders} />
    </div>
  );
}
