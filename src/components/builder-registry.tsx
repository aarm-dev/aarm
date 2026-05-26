"use client";

import { useState } from "react";
import { BUILDERS, type Builder } from "@/data/builders";

function faviconUrl(url: string) {
  const domain = url.replace(/https?:\/\/(www\.)?/, "").split("/")[0];
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

type Filter = "all" | "Conformant" | "Aligned";

function ConformantCard({ b }: { b: Builder }) {
  return (
    <a
      href={b.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderColor: "#D1FAE5" }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
            <img src={faviconUrl(b.url)} alt="" width={24} height={24} className="rounded-sm" />
          </div>
          <span className="font-semibold text-neutral-900">{b.name}</span>
        </div>
        <span className="shrink-0 rounded-full border border-green-100 bg-green-50 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-green-700">
          ✓ conformant
        </span>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-neutral-500">{b.desc}</p>
      <div className="mt-4 text-xs font-medium text-neutral-400 transition-colors group-hover:text-neutral-600">
        Visit {b.url.replace(/https?:\/\/(www\.)?/, "").split("/")[0]} →
      </div>
    </a>
  );
}

function AlignedCard({ b }: { b: Builder }) {
  return (
    <a
      href={b.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-xl border border-neutral-100 bg-white p-4 transition-all hover:border-neutral-200 hover:shadow-sm"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50">
        <img src={faviconUrl(b.url)} alt="" width={18} height={18} className="rounded-sm" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-neutral-800 group-hover:text-neutral-900">{b.name}</span>
          <span className="text-xs text-neutral-300">↗</span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-neutral-400">{b.desc}</p>
      </div>
    </a>
  );
}

export function BuilderRegistry() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const q = search.toLowerCase();
  const filtered = BUILDERS.filter((b) => {
    if (q && !b.name.toLowerCase().includes(q) && !b.desc.toLowerCase().includes(q)) return false;
    if (filter !== "all" && b.conformance !== filter) return false;
    return true;
  });

  const conformant = filtered.filter((b) => b.conformance === "Conformant");
  const aligned = filtered.filter((b) => b.conformance === "Aligned");

  const conformantTotal = BUILDERS.filter((b) => b.conformance === "Conformant").length;
  const alignedTotal = BUILDERS.length - conformantTotal;

  return (
    <div>
      {/* Search + filter */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search builders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 rounded-lg border border-neutral-200 bg-white pl-3 pr-8 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {(["all", "Conformant", "Aligned"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                filter === f
                  ? "bg-neutral-900 text-white"
                  : "border border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
              }`}
            >
              {f === "all"
                ? `All (${BUILDERS.length})`
                : f === "Conformant"
                ? `Conformant (${conformantTotal})`
                : `Aligned (${alignedTotal})`}
            </button>
          ))}
        </div>

        {filtered.length !== BUILDERS.length && (
          <span className="font-mono text-xs text-neutral-400">{filtered.length} shown</span>
        )}
      </div>

      {/* Conformant */}
      {conformant.length > 0 && (
        <div className="mb-10">
          {filter === "all" && (
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">Conformant</span>
              <div className="h-px flex-1 bg-neutral-100" />
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {conformant.map((b) => <ConformantCard key={b.name} b={b} />)}
          </div>
        </div>
      )}

      {/* Aligned */}
      {aligned.length > 0 && (
        <div>
          {filter === "all" && (
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">Aligned</span>
              <div className="h-px flex-1 bg-neutral-100" />
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {aligned.map((b) => <AlignedCard key={b.name} b={b} />)}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="py-20 text-center font-mono text-sm text-neutral-400">
          no results for &ldquo;{search}&rdquo;
        </div>
      )}
    </div>
  );
}
