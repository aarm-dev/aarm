import type { Metadata } from "next";
import { EVENTS } from "@/data/events";

export const metadata: Metadata = {
  title: "Events — AARM",
  description:
    "AARM events, conferences, and community gatherings around AI agent runtime security.",
};

const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  Conference: { bg: "rgba(26,110,181,0.06)", text: "#1A6EB5", border: "rgba(26,110,181,0.18)" },
  Summit:     { bg: "rgba(245,146,58,0.06)", text: "#D45420", border: "rgba(245,146,58,0.2)" },
  Community:  { bg: "rgba(21,128,61,0.06)",  text: "#15803D", border: "rgba(21,128,61,0.2)" },
  Meetup:     { bg: "rgba(107,114,128,0.06)", text: "#4B5563", border: "rgba(107,114,128,0.2)" },
};

const statusLabel: Record<string, { label: string; dot: string }> = {
  upcoming:     { label: "Upcoming",    dot: "bg-green-500" },
  "coming-soon": { label: "Coming soon", dot: "bg-yellow-400" },
  past:         { label: "Past",        dot: "bg-neutral-300" },
};

export default function EventsPage() {
  const upcoming = EVENTS.filter((e) => e.status === "upcoming");
  const comingSoon = EVENTS.filter((e) => e.status === "coming-soon");
  const past = EVENTS.filter((e) => e.status === "past");

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="border-b border-blue-100" style={{ backgroundColor: "#EEF4FF" }}>
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-sm text-blue-700 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Cloud Security Alliance
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Events
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-neutral-500">
            Conferences, summits, and community gatherings where AARM and the agentic runtime security conversation is happening.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">Upcoming</span>
              <div className="h-px flex-1 bg-neutral-100" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {upcoming.map((event) => {
                const tag = tagColors[event.tag];
                const status = statusLabel[event.status];
                return (
                  <div
                    key={event.id}
                    className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide"
                          style={{ backgroundColor: tag.bg, color: tag.text, border: `1px solid ${tag.border}` }}
                        >
                          {event.tag}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-neutral-400">
                          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                      </div>
                      {event.spotlight && (
                        <span className="rounded-full bg-yellow-50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-yellow-600 border border-yellow-100">
                          ★ spotlight
                        </span>
                      )}
                    </div>

                    <h2 className="mb-1.5 text-base font-bold text-neutral-900 leading-snug">{event.name}</h2>

                    <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
                      <span>{event.date}</span>
                      {event.location && <span>{event.location}</span>}
                    </div>

                    {event.description && (
                      <p className="mb-5 text-sm leading-relaxed text-neutral-500 flex-1">{event.description}</p>
                    )}

                    {event.url && (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
                        style={{ color: "#1A6EB5" }}
                      >
                        Register / learn more ↗
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Coming Soon */}
        {comingSoon.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">Coming Soon</span>
              <div className="h-px flex-1 bg-neutral-100" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {comingSoon.map((event) => {
                const tag = tagColors[event.tag];
                return (
                  <div
                    key={event.id}
                    className="flex flex-col rounded-2xl border border-neutral-100 bg-neutral-50/50 p-6"
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide opacity-60"
                        style={{ backgroundColor: tag.bg, color: tag.text, border: `1px solid ${tag.border}` }}
                      >
                        {event.tag}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-neutral-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                        Coming soon
                      </span>
                    </div>

                    <h2 className="mb-1.5 text-base font-bold text-neutral-700 leading-snug">{event.name}</h2>

                    <div className="mb-3 text-xs text-neutral-400">{event.date}</div>

                    {event.description && (
                      <p className="text-sm leading-relaxed text-neutral-400">{event.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Past */}
        {past.length > 0 && (
          <section>
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">Past</span>
              <div className="h-px flex-1 bg-neutral-100" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <div key={event.id} className="rounded-xl border border-neutral-100 p-4 opacity-60">
                  <div className="mb-1.5 text-sm font-medium text-neutral-700">{event.name}</div>
                  <div className="text-xs text-neutral-400">{event.date}{event.location ? ` · ${event.location}` : ""}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
