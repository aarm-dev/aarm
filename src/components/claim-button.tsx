"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { requestClaim } from "@/lib/actions";

export function ClaimButton({
  builderId,
  isAuthed,
  isOwner,
  claimedByOther,
  hasPendingClaim,
  slug,
}: {
  builderId: string;
  isAuthed: boolean;
  isOwner: boolean;
  claimedByOther?: boolean;
  hasPendingClaim?: boolean;
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

  // Already owned by someone else — no claiming.
  if (claimedByOther) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-400">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Claimed
      </span>
    );
  }

  // This user has a claim awaiting TWG review.
  if (hasPendingClaim) {
    return (
      <span className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-500">
        Claim pending review
      </span>
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
