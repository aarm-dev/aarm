"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setBuilderOrdering } from "@/lib/actions";
import type { BuilderRow } from "@/db/schema";

type Row = Pick<BuilderRow, "id" | "name" | "featured" | "priority" | "conformanceLevel">;

export function OrderingTable({ builders }: { builders: Row[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [rows, setRows] = useState(builders);
  const [savedId, setSavedId] = useState<string | null>(null);

  function update(id: string, patch: Partial<Row>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function save(r: Row) {
    start(async () => {
      await setBuilderOrdering(r.id, {
        priority: r.priority === null || r.priority === undefined ? null : Number(r.priority),
        featured: r.featured ?? false,
      });
      setSavedId(r.id);
      setTimeout(() => setSavedId(null), 1500);
      router.refresh();
    });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-100">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50">
          <tr className="border-b border-neutral-100">
            <th className="px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Company</th>
            <th className="px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Featured</th>
            <th className="px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-400">Priority</th>
            <th className="px-4 py-2.5"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-neutral-50 last:border-0">
              <td className="px-4 py-2.5 font-medium text-neutral-800">
                {r.name}
                {(r.conformanceLevel === "core" || r.conformanceLevel === "extended") && (
                  <span className="ml-2 font-mono text-[10px] uppercase text-green-600">{r.conformanceLevel}</span>
                )}
              </td>
              <td className="px-4 py-2.5">
                <input
                  type="checkbox"
                  checked={r.featured ?? false}
                  onChange={(e) => update(r.id, { featured: e.target.checked })}
                  className="h-4 w-4 accent-neutral-900"
                />
              </td>
              <td className="px-4 py-2.5">
                <input
                  type="number"
                  value={r.priority ?? ""}
                  placeholder="—"
                  onChange={(e) => update(r.id, { priority: e.target.value === "" ? null : Number(e.target.value) })}
                  className="w-20 rounded-md border border-neutral-200 px-2 py-1 text-sm outline-none focus:border-neutral-400"
                />
              </td>
              <td className="px-4 py-2.5 text-right">
                <button
                  disabled={pending}
                  onClick={() => save(r)}
                  className="rounded-md border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 disabled:opacity-50"
                >
                  {savedId === r.id ? "Saved ✓" : "Save"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
