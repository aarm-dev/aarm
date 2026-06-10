import type { Metadata } from "next";
import Link from "next/link";
import { BuilderRegistry } from "@/components/builder-registry";
import { getApprovedBuilders } from "@/lib/builders";

export const metadata: Metadata = {
  title: "Builder Registry — AARM",
  description: "Companies building AARM-conformant and AARM-aligned AI agent runtime security products.",
};

export default async function BuildersPage() {
  const builders = await getApprovedBuilders();
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Builders
          </p>
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl tracking-tight">
            Builder Registry
          </h1>
          <p className="max-w-xl text-muted-foreground text-sm leading-relaxed">
            Companies building AARM-conformant systems and products aligned with the
            AI agent runtime security problem space.
          </p>
        </div>
        <Link
          href="/builders/new"
          className="shrink-0 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-85"
          style={{ background: "linear-gradient(135deg, #F5923A 0%, #D45420 100%)" }}
        >
          Add your company
        </Link>
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
          building in the same space
        </span>
      </div>

      <BuilderRegistry builders={builders} />
    </div>
  );
}
