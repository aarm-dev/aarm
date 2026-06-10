"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { requestClaim } from "@/lib/actions";

export function ClaimButton({
  builderId,
  isAuthed,
  isOwner,
  slug,
}: {
  builderId: string;
  isAuthed: boolean;
  isOwner: boolean;
  slug: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  if (isOwner) {
    return (
      <a
        href={`/builders/${slug}/edit`}
        className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
        style={{ background: "linear-gradient(135deg, #1A6EB5 0%, #1E4FA0 100%)" }}
      >
        Edit your listing →
      </a>
    );
  }

  if (!isAuthed) {
    return (
      <a
        href={`/login?next=/builders/${slug}`}
        className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
      >
        Claim this listing
      </a>
    );
  }

  if (msg) return <span className="text-sm text-neutral-500">{msg}</span>;

  return (
    <button
      disabled={pending}
      onClick={() =>
        start(async () => {
          try {
            const r = await requestClaim(builderId);
            if (r.status === "approved") {
              setMsg("Verified — you can now edit this listing.");
              router.refresh();
            } else {
              setMsg("Claim submitted — the TWG will verify and follow up.");
            }
          } catch (e) {
            setMsg(e instanceof Error ? e.message : "Something went wrong.");
          }
        })
      }
      className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50"
    >
      {pending ? "Claiming…" : "Claim this listing"}
    </button>
  );
}
