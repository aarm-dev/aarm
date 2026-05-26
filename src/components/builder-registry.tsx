"use client";

import { useState } from "react";
import { BUILDERS, type Builder } from "@/data/builders";

function faviconUrl(url: string) {
  const domain = url.replace(/https?:\/\/(www\.)?/, "").split("/")[0];
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

function domain(url: string) {
  return url.replace(/https?:\/\/(www\.)?/, "").split("/")[0];
}

function ConformantBadge() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500 text-[10px] font-black text-white shadow-sm">
      ✓
    </div>
  );
}

function AlignedBadge() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[10px] font-black text-white shadow-sm">
      A
    </div>
  );
}

function BuilderRow({ b }: { b: Builder }) {
  return (
    <a
      href={b.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-neutral-100 bg-white p-3 transition-all hover:border-neutral-200 hover:shadow-sm"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
        <img src={faviconUrl(b.url)} alt="" width={22} height={22} className="rounded-sm" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-blue-600 group-hover:text-blue-700">
          {b.name}
        </div>
        <div className="truncate text-xs text-neutral-400">{domain(b.url)}</div>
      </div>
      {b.conformance === "Conformant" ? <ConformantBadge /> : <AlignedBadge />}
    </a>
  );
}

function TableRow({ b, index }: { b: Builder; index: number }) {
  return (
    <a
      href={b.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 border-b border-neutral-100 px-4 py-3 last:border-0 hover:bg-neutral-50/60 transition-colors"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50">
        <img src={faviconUrl(b.url)} alt="" width={18} height={18} className="rounded-sm" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-blue-600 group-hover:text-blue-700">
          {b.name}
        </div>
        <div className="truncate text-xs text-neutral-400">{domain(b.url)}</div>
      </div>
      <div className="hidden text-xs text-neutral-500 sm:block sm:max-w-xs sm:truncate">
        {b.desc}
      </div>
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[10px] font-black text-white">
        A
      </div>
    </a>
  );
}

const PAGE_SIZE = 15;

export function BuilderRegistry() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "Conformant" | "Aligned">("all");
  const [page, setPage] = useState(1);

  const conformantBuilders = BUILDERS.filter((b) => b.conformance === "Conformant");
  const alignedBuilders = BUILDERS.filter((b) => b.conformance === "Aligned");

  const q = search.toLowerCase();
  const filteredAligned = alignedBuilders.filter((b) => {
    if (q && !b.name.toLowerCase().includes(q) && !b.desc.toLowerCase().includes(q)) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredAligned.length / PAGE_SIZE);
  const pagedAligned = filteredAligned.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };

  return (
    <div className="space-y-10">
      {/* Conformant panel */}
      {(filter === "all" || filter === "Conformant") && (
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-neutral-900">
              Conformant Builders
            </h3>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 border border-green-100">
              {conformantBuilders.length} certified
            </span>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {conformantBuilders.map((b) => (
              <BuilderRow key={b.name} b={b} />
            ))}
          </div>
        </div>
      )}

      {/* Aligned section */}
      {(filter === "all" || filter === "Aligned") && (
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold text-neutral-900">
              Aligned Builders
            </h3>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
              {alignedBuilders.length} companies
            </span>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="h-8 w-44 rounded-lg border border-neutral-200 bg-white pl-3 pr-7 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-neutral-400 transition-colors"
                />
                {search && (
                  <button
                    onClick={() => handleSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
            {/* Table header */}
            <div className="flex items-center gap-4 border-b border-neutral-100 bg-neutral-50/60 px-4 py-2.5">
              <div className="w-8 shrink-0" />
              <div className="flex-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Company
              </div>
              <div className="hidden text-xs font-semibold uppercase tracking-wider text-neutral-400 sm:block sm:w-64">
                Description
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 w-7">
                Status
              </div>
            </div>

            {pagedAligned.length === 0 ? (
              <div className="px-4 py-12 text-center text-sm text-neutral-400">
                No results for &ldquo;{search}&rdquo;
              </div>
            ) : (
              pagedAligned.map((b, i) => <TableRow key={b.name} b={b} index={i} />)
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-end gap-1 border-t border-neutral-100 px-4 py-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 text-sm text-neutral-500 hover:border-neutral-300 disabled:opacity-30 transition-colors"
                >
                  ←
                </button>
                {Array.from({ length: Math.min(totalPages, 6) }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      page === n
                        ? "bg-neutral-900 text-white"
                        : "border border-neutral-200 text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                {totalPages > 6 && <span className="px-1 text-sm text-neutral-400">…</span>}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 text-sm text-neutral-500 hover:border-neutral-300 disabled:opacity-30 transition-colors"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter pills */}
      <div className="flex items-center gap-2">
        {(["all", "Conformant", "Aligned"] as const).map((f) => (
          <button
            key={f}
            onClick={() => { setFilter(f); setPage(1); }}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              filter === f
                ? "bg-neutral-900 text-white"
                : "border border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
            }`}
          >
            {f === "all" ? `All (${BUILDERS.length})` : f === "Conformant" ? `Conformant (${conformantBuilders.length})` : `Aligned (${alignedBuilders.length})`}
          </button>
        ))}
      </div>
    </div>
  );
}
