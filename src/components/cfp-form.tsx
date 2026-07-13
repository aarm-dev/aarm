"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { submitPaper } from "@/lib/actions";
import type { PaperRow } from "@/db/schema";

const field =
  "w-full border border-neutral-700 bg-black px-3 py-2.5 font-mono text-sm text-neutral-100 placeholder-neutral-600 outline-none focus:border-[#FF7A00]";
const label = "mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500";

export function CfpForm({ paper }: { paper: PaperRow | null }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [talkTitle, setTalkTitle] = useState(paper?.title ?? "");
  const [coreTopics, setCoreTopics] = useState(paper?.coreTopics ?? "");
  const [keyTakeaways, setKeyTakeaways] = useState(paper?.keyTakeaways ?? "");
  const [relevance, setRelevance] = useState(paper?.relevance ?? "");

  const [fileUrl, setFileUrl] = useState(paper?.fileUrl ?? "");
  const [fileName, setFileName] = useState(paper?.fileName ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadNote, setUploadNote] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== "application/pdf" && !/\.pdf$/i.test(f.name)) {
      setUploadNote("PDF files only."); e.target.value = ""; return;
    }
    setUploading(true); setUploadNote(null);
    try {
      const safe = f.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const blob = (await Promise.race([
        upload(`intercept-papers/${safe}`, f, {
          access: "public",
          handleUploadUrl: "/api/intercept/upload",
          contentType: "application/pdf",
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Upload timed out — try again, or submit without a file.")), 90_000)),
      ])) as { url: string };
      setFileUrl(blob.url);
      setFileName(f.name);
    } catch (e) {
      setUploadNote(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const canSubmit = talkTitle && coreTopics && keyTakeaways && relevance;

  return (
    <div className="space-y-6">
      <div className="border border-neutral-800 bg-neutral-950 p-6 space-y-5">
        <div><label className={label}>Title of talk *</label><input className={field} value={talkTitle} onChange={(e) => setTalkTitle(e.target.value)} /></div>
        <div><label className={label}>Core topics you want to cover *</label><textarea rows={4} className={field} value={coreTopics} onChange={(e) => setCoreTopics(e.target.value)} /></div>
        <div><label className={label}>Key takeaways *</label><textarea rows={4} className={field} value={keyTakeaways} onChange={(e) => setKeyTakeaways(e.target.value)} /></div>
        <div><label className={label}>Why it matters &amp; who it&apos;s for *</label><textarea rows={4} className={field} value={relevance} onChange={(e) => setRelevance(e.target.value)} /></div>

        <div>
          <label className={label}>Supporting paper (PDF only — optional)</label>
          <input type="file" accept="application/pdf,.pdf" onChange={onFile} className="block w-full font-mono text-xs text-neutral-400 file:mr-3 file:border file:border-neutral-700 file:bg-black file:px-3 file:py-1.5 file:font-mono file:text-xs file:uppercase file:tracking-widest file:text-[#FF7A00]" />
          {uploading && <p className="mt-2 font-mono text-xs text-neutral-500">Uploading…</p>}
          {fileName && !uploading && <p className="mt-2 font-mono text-xs text-[#2EFF7B]">Attached: {fileName}</p>}
          {uploadNote && <p className="mt-2 font-mono text-xs text-neutral-500">{uploadNote}</p>}
        </div>
      </div>

      {error && <p className="border border-[#FF3B30] bg-[#FF3B30]/10 px-3 py-2 font-mono text-sm text-[#FF3B30]">{error}</p>}

      <button
        disabled={!canSubmit || pending || uploading}
        onClick={() =>
          start(async () => {
            setError(null);
            try {
              await submitPaper({ talkTitle, coreTopics, keyTakeaways, relevance, fileUrl: fileUrl || undefined, fileName: fileName || undefined });
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Submission failed.");
            }
          })
        }
        className="border-2 border-[#FF7A00] bg-[#FF7A00] px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-[#FF7A00] disabled:opacity-40"
      >
        {pending ? "Submitting…" : paper ? "[ Update Submission ]" : "[ Submit Paper ]"}
      </button>
    </div>
  );
}
