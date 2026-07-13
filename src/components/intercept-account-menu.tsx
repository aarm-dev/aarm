"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";

type Props = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  isChair?: boolean;
  isEvaluator?: boolean;
};

export function InterceptAccountMenu({ name, email, image, isChair, isEvaluator }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const initial = (name || email || "?").trim()[0]?.toUpperCase() ?? "?";

  const items: { label: string; href: string; hint?: string }[] = [
    { label: "My profile", href: "/intercept/profile" },
  ];
  if (isChair) {
    items.push({ label: "Conference", href: "/admin/intercept", hint: "Submissions of interest" });
    items.push({ label: "Papers", href: "/intercept/review", hint: "Full access" });
  } else if (isEvaluator) {
    items.push({ label: "Papers", href: "/intercept/review" });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Account"
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[#FF7A00] bg-black font-mono text-xs font-bold text-[#FF7A00] transition-opacity hover:opacity-80"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-full w-full object-cover" />
        ) : (
          initial
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-56 border border-neutral-800 bg-[#0A0A0A] p-1.5 shadow-xl">
          <div className="border-b border-neutral-900 px-3 py-2">
            <div className="truncate font-mono text-sm text-white">{name || "Signed in"}</div>
            {email && <div className="truncate font-mono text-[11px] text-neutral-500">{email}</div>}
            {(isChair || isEvaluator) && (
              <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-[#FF7A00]">{isChair ? "Chair" : "Evaluator"}</div>
            )}
          </div>
          {items.map((it) => (
            <a key={it.href} href={it.href} className="block px-3 py-2 font-mono text-sm text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white">
              {it.label}
              {it.hint && <span className="ml-1 text-[10px] text-neutral-600">· {it.hint}</span>}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); signOut({ callbackUrl: "/intercept" }); }}
            className="mt-1 block w-full px-3 py-2 text-left font-mono text-sm text-neutral-500 transition-colors hover:bg-neutral-900 hover:text-neutral-200"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
