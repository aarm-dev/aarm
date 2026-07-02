"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteBuilder } from "@/lib/actions";

export function DeleteBuilderButton({ builderId, name }: { builderId: string; name: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 text-xs">
        <span className="text-neutral-500">Delete {name}?</span>
        <button
          disabled={pending}
          onClick={() => start(async () => { await deleteBuilder(builderId); router.refresh(); })}
          className="font-semibold text-red-600 hover:underline disabled:opacity-50"
        >
          {pending ? "Deleting…" : "Yes, delete"}
        </button>
        <button onClick={() => setConfirming(false)} className="text-neutral-400 hover:text-neutral-700">Cancel</button>
      </span>
    );
  }
  return (
    <button onClick={() => setConfirming(true)} className="text-xs font-medium text-neutral-400 hover:text-red-600">
      Delete
    </button>
  );
}
