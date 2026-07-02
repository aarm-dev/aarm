"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function AvatarMenu() {
  const { data: session } = useSession();
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

  const user = session?.user;
  if (!user) return null;
  const isAdmin = Boolean((user as { isAdmin?: boolean }).isAdmin);
  const initial = (user.name || user.email || "?").trim()[0]?.toUpperCase() ?? "?";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-900 text-xs font-bold text-white transition-opacity hover:opacity-85"
        aria-label="Account menu"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="h-full w-full object-cover" />
        ) : (
          initial
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg">
          <div className="border-b border-neutral-100 px-3 py-2">
            <div className="truncate text-sm font-medium text-neutral-900">{user.name || "Signed in"}</div>
            <div className="truncate text-xs text-neutral-400">{user.email}</div>
          </div>
          <MenuLink href="/company" onClick={() => setOpen(false)}>Company page</MenuLink>
          <MenuLink href="/my-conformance" onClick={() => setOpen(false)}>My conformance</MenuLink>
          {isAdmin && <MenuLink href="/admin" onClick={() => setOpen(false)}>Admin</MenuLink>}
          <button
            onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
            className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function MenuLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="block rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100">
      {children}
    </Link>
  );
}
