"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { requestClaim } from "@/lib/actions";

// Subtle "manage this listing" control shown at the bottom of a builder page.
// Wording avoids "claim" — most teams listed themselves; this is about
// verifying you work there so you can keep the listing up to date.
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

  const link = "text-sm font-semibold transition-opacity hover:opacity-70";

  if (isOwner) {
    return (
      <a href={`/builders/${slug}/edit`} className={link} style={{ color: "#1A6EB5" }}>
        Manage this listing →
      </a>
    );
  }

  // Owned by someone else — nothing to do here (footer notes who maintains it).
  if (claimedByOther) return null;

  if (hasPendingClaim) {
    return <span className="text-sm text-neutral-400">Verification pending review</span>;
  }

  if (msg) return <span className="text-sm text-neutral-500">{msg}</span>;

  if (!isAuthed) {
    return (
      <a href={`/login?next=/builders/${slug}`} className={link} style={{ color: "#1A6EB5" }}>
        Work here? Manage this listing →
      </a>
    );
  }

  return (
    <button
      disabled={pending}
      onClick={() =>
        start(async () => {
          try {
            const r = await requestClaim(builderId);
            if (r.status === "approved") {
              setMsg("Verified — you can now manage this listing.");
              router.refresh();
            } else {
              setMsg("Request submitted — the AARM team will verify and follow up.");
            }
          } catch (e) {
            setMsg(e instanceof Error ? e.message : "Something went wrong.");
          }
        })
      }
      className={`${link} disabled:opacity-50`}
      style={{ color: "#1A6EB5" }}
    >
      {pending ? "Submitting…" : "Work here? Manage this listing →"}
    </button>
  );
}
