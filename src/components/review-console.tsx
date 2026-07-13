"use client";

import { useState, useTransition } from "react";
import { getPaperForReview, saveReviewScores, completeReview } from "@/lib/actions";

type QueueItem = { id: string; number: number; title: string; status: string; reviewStatus: string; avg: number | null };
type Paper = { id: string; number: number; title: string; coreTopics: string | null; keyTakeaways: string | null; relevance: string | null; fileUrl: string | null; fileName: string | null };

const SECTIONS = [
  { key: "Core", label: "Core topics", field: "coreTopics" as const },
  { key: "Takeaways", label: "Key takeaways", field: "keyTakeaways" as const },
  { key: "Relevance", label: "Why it matters & who it's for", field: "relevance" as const },
];

export function ReviewConsole({ queue: initialQueue }: { queue: QueueItem[] }) {
  const [queue, setQueue] = useState(initialQueue);
  const [sel, setSel] = useState<Paper | null>(null);
  const [scores, setScores] = useState<Record<string, number | null>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  function open(id: string) {
    setMsg(null);
    start(async () => {
      const { paper, review } = await getPaperForReview(id);
      setSel(paper as Paper);
      setScores({ Core: review?.scoreCore ?? null, Takeaways: review?.scoreTakeaways ?? null, Relevance: review?.scoreRelevance ?? null });
      setComments({ Core: review?.commentCore ?? "", Takeaways: review?.commentTakeaways ?? "", Relevance: review?.commentRelevance ?? "" });
      setCompleted(!!review?.completed);
    });
  }

  const allScored = SECTIONS.every((s) => scores[s.key] != null);

  function persist() {
    if (!sel) return;
    return saveReviewScores(sel.id, {
      scoreCore: scores.Core, commentCore: comments.Core,
      scoreTakeaways: scores.Takeaways, commentTakeaways: comments.Takeaways,
      scoreRelevance: scores.Relevance, commentRelevance: comments.Relevance,
    });
  }

  function save() {
    start(async () => { await persist(); setMsg("Saved."); });
  }
  function finish() {
    if (!sel || !allScored) return;
    start(async () => {
      try {
        await persist();
        await completeReview(sel.id);
        setCompleted(true);
        setMsg("Review completed.");
        setQueue((q) => q.map((i) => (i.id === sel.id ? { ...i, reviewStatus: "completed" } : i)));
      } catch (e) {
        setMsg(e instanceof Error ? e.message : "Could not complete.");
      }
    });
  }

  const isPdf = sel?.fileUrl && /\.pdf($|\?)/i.test(sel.fileUrl);

  return (
    <div className="grid gap-6 md:grid-cols-[280px_1fr]">
      {/* Left list */}
      <div className="border border-neutral-800">
        <div className="border-b border-neutral-800 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500">Papers · {queue.length}</div>
        <div className="max-h-[70vh] overflow-y-auto">
          {queue.length === 0 && <div className="px-4 py-6 font-mono text-xs text-neutral-600">No papers to review.</div>}
          {queue.map((p) => (
            <button
              key={p.id}
              onClick={() => open(p.id)}
              className={`flex w-full items-center justify-between gap-2 border-b border-neutral-900 px-4 py-3 text-left transition-colors hover:bg-neutral-900 ${sel?.id === p.id ? "bg-neutral-900" : ""}`}
            >
              <div className="min-w-0">
                <div className="font-mono text-[11px] text-neutral-500">Paper #{p.number}</div>
                <div className="truncate font-mono text-sm text-neutral-200">{p.title}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className={`font-mono text-[10px] uppercase ${p.reviewStatus === "completed" ? "text-[#2EFF7B]" : p.reviewStatus === "in_progress" ? "text-[#FF7A00]" : "text-neutral-600"}`}>{p.reviewStatus.replace("_", " ")}</div>
                {p.avg != null && <div className="font-mono text-xs text-neutral-400">{p.avg.toFixed(1)}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right pane */}
      <div className="border border-neutral-800 p-6">
        {!sel ? (
          <div className="font-mono text-sm text-neutral-600">Select a paper to review. Submissions are anonymous.</div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">Paper #{sel.number}</div>
                <h2 className="mt-1 font-mono text-lg font-bold text-white">{sel.title}</h2>
              </div>
              <button
                onClick={finish}
                disabled={!allScored || pending || completed}
                title={allScored ? "" : "Score all three sections first"}
                className="shrink-0 border-2 border-[#2EFF7B] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-[#2EFF7B] transition-colors hover:bg-[#2EFF7B] hover:text-black disabled:opacity-30"
              >
                {completed ? "✓ Completed" : "Review completed"}
              </button>
            </div>

            {msg && <p className="font-mono text-xs text-neutral-400">{msg}</p>}

            {SECTIONS.map((s) => (
              <div key={s.key} className="border border-neutral-900 bg-neutral-950 p-5">
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#FF7A00]">{s.label}</div>
                <p className="mb-4 whitespace-pre-wrap font-mono text-sm text-neutral-300">{sel[s.field] || "—"}</p>
                <div className="flex items-center gap-4">
                  <input
                    type="range" min={1} max={10} value={scores[s.key] ?? 5}
                    onChange={(e) => setScores((v) => ({ ...v, [s.key]: Number(e.target.value) }))}
                    className="flex-1 accent-[#FF7A00]"
                  />
                  <span className="w-16 text-right font-mono text-sm">
                    {scores[s.key] != null ? <span className="text-white">{scores[s.key]}/10</span> : <span className="text-neutral-600">—</span>}
                  </span>
                </div>
                <div className="mt-1 flex justify-between font-mono text-[9px] uppercase tracking-widest text-neutral-600"><span>1 · bad</span><span>10 · amazing</span></div>
                <textarea
                  rows={2} placeholder="Comment"
                  value={comments[s.key] ?? ""}
                  onChange={(e) => setComments((v) => ({ ...v, [s.key]: e.target.value }))}
                  className="mt-3 w-full border border-neutral-800 bg-black px-3 py-2 font-mono text-sm text-neutral-100 placeholder-neutral-700 outline-none focus:border-[#FF7A00]"
                />
              </div>
            ))}

            {/* File preview */}
            {sel.fileUrl && (
              <div className="border border-neutral-900 bg-neutral-950 p-5">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500">Attached file — {sel.fileName || "file"}</div>
                {isPdf ? (
                  <iframe src={sel.fileUrl} className="h-96 w-full border border-neutral-800 bg-white" title="Paper file" />
                ) : (
                  <a href={sel.fileUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-[#2EFF7B] underline">Open file ↗</a>
                )}
              </div>
            )}

            {!completed && (
              <button onClick={save} disabled={pending} className="border border-neutral-700 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-neutral-300 hover:border-neutral-500 disabled:opacity-40">
                {pending ? "Saving…" : "Save progress"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
