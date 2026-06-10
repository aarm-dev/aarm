"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { BuilderRow } from "@/db/schema";
import { CATEGORIES, SURFACES } from "@/db/taxonomy";

function faviconUrl(domain?: string | null) {
  return `https://www.google.com/s2/favicons?domain=${domain ?? ""}&sz=64`;
}
function isConformant(b: BuilderRow) {
  return b.conformanceLevel === "core" || b.conformanceLevel === "extended";
}

function Card({ b }: { b: BuilderRow }) {
  const conformant = isConformant(b);
  return (
    <Link
      href={`/builders/${b.slug}`}
      className="group flex flex-col rounded-2xl border bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderColor: conformant ? "#D1FAE5" : "#F0F0F0" }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.logoUrl || faviconUrl(b.domain)} alt="" width={22} height={22} className="rounded-sm" />
          </div>
          <span className="font-semibold text-neutral-900">{b.name}</span>
        </div>
        {conformant ? (
          <span className="shrink-0 rounded-full border border-green-100 bg-green-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-green-700">
            {b.conformanceLevel === "extended" ? "✦ extended" : "✓ core"}
          </span>
        ) : (
          <span className="shrink-0 rounded-full border border-neutral-100 bg-neutral-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-neutral-400">
            aligned
          </span>
        )}
      </div>
      <p className="mb-3 flex-1 text-sm leading-relaxed text-neutral-500 line-clamp-2">{b.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {b.category && (
          <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600">{b.category.split(" / ")[0]}</span>
        )}
        {(b.surfaces ?? []).slice(0, 3).map((s) => (
          <span key={s} className="rounded-md border border-neutral-200 px-2 py-0.5 text-[11px] text-neutral-500">{s}</span>
        ))}
      </div>
    </Link>
  );
}

export function BuilderRegistry({ builders }: { builders: BuilderRow[] }) {
  const [search, setSearch] = useState("");
  const [conf, setConf] = useState<"all" | "conformant" | "aligned">("all");
  const [category, setCategory] = useState<string>("");
  const [surface, setSurface] = useState<string>("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return builders.filter((b) => {
      if (q && !b.name.toLowerCase().includes(q) && !(b.description ?? "").toLowerCase().includes(q)) return false;
      if (conf === "conformant" && !isConformant(b)) return false;
      if (conf === "aligned" && isConformant(b)) return false;
      if (category && b.category !== category) return false;
      if (surface && !(b.surfaces ?? []).includes(surface as never)) return false;
      return true;
    });
  }, [builders, search, conf, category, surface]);

  const conformant = filtered.filter(isConformant);
  const aligned = filtered.filter((b) => !isConformant(b));

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search builders…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-neutral-400"
        />
        <div className="flex items-center gap-1.5">
          {(["all", "conformant", "aligned"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setConf(f)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-all ${conf === f ? "bg-neutral-900 text-white" : "border border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-10 flex flex-wrap gap-3">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-600 outline-none focus:border-neutral-400">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={surface} onChange={(e) => setSurface(e.target.value)} className="h-9 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-600 outline-none focus:border-neutral-400">
          <option value="">All surfaces</option>
          {SURFACES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {filtered.length !== builders.length && (
          <span className="self-center font-mono text-xs text-neutral-400">{filtered.length} shown</span>
        )}
      </div>

      {conformant.length > 0 && (
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">Conformant</span>
            <div className="h-px flex-1 bg-neutral-100" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {conformant.map((b) => <Card key={b.id} b={b} />)}
          </div>
        </div>
      )}

      {aligned.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">Aligned</span>
            <div className="h-px flex-1 bg-neutral-100" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aligned.map((b) => <Card key={b.id} b={b} />)}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="py-20 text-center font-mono text-sm text-neutral-400">no results</div>
      )}
    </div>
  );
}
