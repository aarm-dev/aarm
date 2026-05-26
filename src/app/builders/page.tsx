import type { Metadata } from "next";
import Link from "next/link";
import { BuilderRegistry } from "@/components/builder-registry";

export const metadata: Metadata = {
  title: "Builder Registry — AARM",
  description: "Companies building AARM-conformant and AARM-aligned AI agent runtime security products.",
};

export default function BuildersPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-12">
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

      {/* Legend */}
      <div className="mb-10 overflow-hidden rounded-lg border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">status</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">meaning</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">how to get listed</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/30">
              <td className="px-4 py-3">
                <code className="font-mono text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded uppercase tracking-wide">
                  Conformant
                </code>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">
                Satisfies AARM specification requirements (R1–R6 Core or R1–R9 Extended)
              </td>
              <td className="px-4 py-3 text-xs">
                <Link href="/conformance" className="font-medium transition-opacity hover:opacity-70" style={{ color: "#1A6EB5" }}>
                  Complete the testing protocol →
                </Link>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <code className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase tracking-wide">
                  Aligned
                </code>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">
                Building in the same problem space; no conformance testing required
              </td>
              <td className="px-4 py-3 text-xs">
                <a
                  href="https://github.com/aarm-dev/aarm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium transition-opacity hover:opacity-70"
                  style={{ color: "#1A6EB5" }}
                >
                  Submit a PR on GitHub →
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <BuilderRegistry />
    </div>
  );
}
