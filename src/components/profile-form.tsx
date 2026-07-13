"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveSpeakerProfile } from "@/lib/actions";
import type { SpeakerProfileRow } from "@/db/schema";

const field =
  "w-full border border-neutral-700 bg-black px-3 py-2.5 font-mono text-sm text-neutral-100 placeholder-neutral-600 outline-none focus:border-[#FF7A00]";
const label = "mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500";

export function ProfileForm({ profile }: { profile: SpeakerProfileRow | null }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState(profile?.firstName ?? "");
  const [lastName, setLastName] = useState(profile?.lastName ?? "");
  const [title, setTitle] = useState(profile?.title ?? "");
  const [companyWebsite, setCompanyWebsite] = useState(profile?.companyWebsite ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");

  const canSave = firstName.trim() && lastName.trim() && bio.trim();

  return (
    <div className="space-y-5 border border-neutral-800 bg-neutral-950 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className={label}>First name *</label><input className={field} value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
        <div><label className={label}>Surname *</label><input className={field} value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
        <div><label className={label}>Title</label><input className={field} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Staff Security Engineer" /></div>
        <div><label className={label}>Company website</label><input className={field} value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} placeholder="https://…" /></div>
      </div>
      <div><label className={label}>Bio *</label><textarea rows={3} className={field} value={bio} onChange={(e) => setBio(e.target.value)} /></div>

      {error && <p className="font-mono text-sm text-[#FF3B30]">{error}</p>}
      {saved && <p className="font-mono text-sm text-[#2EFF7B]">Profile saved.</p>}

      <button
        disabled={!canSave || pending}
        onClick={() =>
          start(async () => {
            setError(null); setSaved(false);
            try {
              await saveSpeakerProfile({ firstName, lastName, bio, title, companyWebsite });
              setSaved(true);
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Could not save.");
            }
          })
        }
        className="border-2 border-[#FF7A00] bg-[#FF7A00] px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-[#FF7A00] disabled:opacity-40"
      >
        {pending ? "Saving…" : profile ? "[ Update Profile ]" : "[ Create Profile ]"}
      </button>
    </div>
  );
}
