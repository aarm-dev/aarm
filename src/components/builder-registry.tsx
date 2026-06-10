"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { BuilderRow } from "@/db/schema";
import { SURFACES, POLICY_MODELS } from "@/db/taxonomy";

function faviconUrl(domain?: string | null) {
  return `https://www.google.com/s2/favicons?domain=${domain ?? ""}&sz=64`;
}
function isConformant(b: BuilderRow) {
  return b.conformanceLevel === "core" || b.conformanceLevel === "extended";
}
function confRank(b: BuilderRow) {
  return b.conformanceLevel === "extended" ? 2 : b.conformanceLevel === "core" ? 1 : 0;
}
type SortKey = "default" | "name" | "conformance";
type SortDir = "asc" | "desc";

function ConfBadge({ b }: { b: BuilderRow }) {
  if (b.conformanceLevel === "extended")
    return <span className="whitespace-nowrap rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-blue-700">Extended</span>;
  if (b.conformanceLevel === "core")
    return <span className="whitespace-nowrap rounded-full border border-green-200 bg-green-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-green-700">Core</span>;
  return <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-neutral-400">Aligned</span>;
}

export function BuilderRegistry({ builders }: { builders: BuilderRow[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [conf, setConf] = useState<"all" | "conformant" | "aligned">("all");
  const [surface, setSurface] = useState("");
  const [policy, setPolicy] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    const filtered = builders.filter((b) => {
      if (q && !b.name.toLowerCase().includes(q) && !(b.description ?? "").toLowerCase().includes(q)) return false;
      if (conf === "conformant" && !isConformant(b)) return false;
      if (conf === "aligned" && isConformant(b)) return false;
      if (surface && !(b.surfaces ?? []).includes(surface as never)) return false;
      if (policy && b.policyModel !== policy) return false;
      return true;
    });
    // Default = the order delivered by the server (featured → priority →
    // original order). Filtering is stable, so just keep it.
    if (sortKey === "default") return filtered;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else cmp = confRank(a) - confRank(b) || (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
      return cmp * dir;
    });
  }, [builders, search, conf, surface, policy, sortKey, sortDir]);

  const filtersActive = search || conf !== "all" || surface || policy;

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative">
          <svg className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4-4" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="h-9 w-48 rounded-lg border border-neutral-200 bg-white pl-8 pr-3 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-neutral-400"
          />
        </div>
        <Select value={conf} onChange={(v) => setConf(v as typeof conf)} options={[["all", "All conformance"], ["conformant", "Conformant"], ["aligned", "Aligned"]]} />
        <Select value={surface} onChange={setSurface} options={[["", "All coverage"], ...SURFACES.map((s) => [s, s] as [string, string])]} />
        <Select value={policy} onChange={setPolicy} options={[["", "All policies"], ...POLICY_MODELS.map((p) => [p, p] as [string, string])]} />
        <span className="ml-auto font-mono text-xs text-neutral-400">{rows.length} of {builders.length}</span>
        {filtersActive && (
          <button
            onClick={() => { setSearch(""); setConf("all"); setSurface(""); setPolicy(""); setSortKey("default"); }}
            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-500 hover:bg-neutral-50"
          >
            Clear
          </button>
        )}
      </div>

      {/* Data grid */}
      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full min-w-[920px] text-sm">
          <thead className="sticky top-0 bg-neutral-50">
            <tr className="border-b border-neutral-200">
              <Th label="Company" sortable onSort={() => toggleSort("name")} active={sortKey === "name"} dir={sortDir} />
              <Th label="Conformance" sortable onSort={() => toggleSort("conformance")} active={sortKey === "conformance"} dir={sortDir} />
              <Th label="Policy" />
              <Th label="Coverage" />
              <Th label="Type" />
              <Th label="Target" />
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr
                key={b.id}
                onClick={() => router.push(`/builders/${b.slug}`)}
                className="cursor-pointer border-b border-neutral-100 transition-colors last:border-0 hover:bg-blue-50/40"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.logoUrl || faviconUrl(b.domain)} alt="" width={18} height={18} className="rounded-sm" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-neutral-900">{b.name}</div>
                      <div className="truncate text-xs text-neutral-400">{b.domain}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3"><ConfBadge b={b} /></td>
                <td className="px-4 py-3 text-neutral-600">{b.policyModel || <span className="text-neutral-300">—</span>}</td>
                <td className="px-4 py-3"><CellChips items={b.surfaces} /></td>
                <td className="px-4 py-3"><CellChips items={b.types} /></td>
                <td className="px-4 py-3"><CellChips items={b.audiences} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="py-16 text-center font-mono text-sm text-neutral-400">no results</div>}
      </div>
    </div>
  );
}

function CellChips({ items }: { items?: string[] | null }) {
  if (!items || items.length === 0) return <span className="text-neutral-300">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((s) => (
        <span key={s} className="whitespace-nowrap rounded border border-neutral-200 px-1.5 py-0.5 text-[11px] text-neutral-500">{s}</span>
      ))}
    </div>
  );
}

function Th({
  label, sortable, onSort, active, dir,
}: {
  label: string;
  sortable?: boolean;
  onSort?: () => void;
  active?: boolean;
  dir?: SortDir;
}) {
  return (
    <th className="px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">
      {sortable ? (
        <button onClick={onSort} className="flex items-center gap-1 hover:text-neutral-700">
          {label}
          <span className={active ? "text-neutral-700" : "text-neutral-300"}>{active && dir === "asc" ? "▲" : "▼"}</span>
        </button>
      ) : (
        label
      )}
    </th>
  );
}

function Select({
  value, onChange, options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-lg border border-neutral-200 bg-white px-2.5 text-sm text-neutral-600 outline-none focus:border-neutral-400"
    >
      {options.map(([v, label]) => (
        <option key={v} value={v}>{label}</option>
      ))}
    </select>
  );
}
