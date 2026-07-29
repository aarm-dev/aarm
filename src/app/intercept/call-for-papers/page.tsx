import type { Metadata } from "next";
import Link from "next/link";
import { Press_Start_2P, JetBrains_Mono } from "next/font/google";
import { EVENT } from "@/data/intercept";

const pixel = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-pixel" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-i" });

export const metadata: Metadata = {
  title: "Call for Papers — INTERCEPT",
  description:
    "INTERCEPT Call for Papers — open now, closes October 1, 2026. Blind-reviewed talks for builders, breakers, and defenders of agentic runtime security. An AARM event, Feb 2027, San Francisco.",
};

const AMBER = "#FF7A00";
const GREEN = "#2EFF7B";
const RED = "#FF3B30";
const OVERLEAF = "https://www.overleaf.com/latex/templates/ieee-conference-template/grfzhhncsfqn";

const TRACKS = [
  {
    icon: "🔨",
    name: "Builders",
    color: AMBER,
    blurb: "You build the controls. Interception architectures, policy engines, AI and MCP gateways, SDK instrumentation, identity binding, per-session context, and everything it takes to make an agent stack AARM-conformant.",
    wants: ["Reference architectures for runtime interception", "Policy-engine and decision-model design", "Context accumulation and intent alignment at action time", "Identity, receipts, and tamper-evident audit"],
  },
  {
    icon: "💥",
    name: "Breakers",
    color: RED,
    blurb: "You take it apart. Prompt injection that reaches a tool call, bypassing runtime controls, tool-call abuse, adversarial evaluations, and real exploits against production agent stacks.",
    wants: ["Attacks that turn a prompt into an unauthorized action", "Bypasses of gateways, policy, or DLP", "Adversarial evals and red-team methodology", "Real-world incident walkthroughs"],
  },
  {
    icon: "🛡️",
    name: "Defenders",
    color: GREEN,
    blurb: "You run it in production. Deploying runtime security at scale, monitoring, incident response, telemetry into the SOC, least-privilege enforcement, and the governance that holds it together.",
    wants: ["Production deployment and rollout stories", "Detection, telemetry, and SOC integration", "Post-incident response for agentic systems", "Governance and least-privilege in practice"],
  },
];

const FORMATS = [
  { name: "Standard session", detail: "20-minute talk + 10 minutes Q&A" },
  { name: "Lightning talk", detail: "10 minutes, one sharp idea" },
  { name: "Live demo", detail: "Show the system doing the thing — not slides about it" },
];

const TIMELINE = [
  { phase: "Submissions open now", window: "Closes October 1, 2026", color: GREEN },
  { phase: "Blind review", window: "October 2026", color: AMBER },
  { phase: "Accept / reject notifications", window: "By October 31, 2026", color: RED },
  { phase: "INTERCEPT", window: `${EVENT.dateStamp} · ${EVENT.location}`, color: "#8AB4FF" },
];

export default function CallForPapersPage() {
  return (
    <div className={`${pixel.variable} ${mono.variable} min-h-screen bg-[#0A0A0A] text-neutral-200`} style={{ fontFamily: "var(--font-mono-i)" }}>
      {/* scanline overlay */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] opacity-[0.06]" style={{ backgroundImage: "repeating-linear-gradient(to bottom, #fff 0, #fff 1px, transparent 1px, transparent 3px)" }} />

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-neutral-900 bg-[#0A0A0A]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/intercept" className="text-sm tracking-tight text-white" style={{ fontFamily: "var(--font-pixel)" }}>INTERCEPT</Link>
          <div className="flex items-center gap-4">
            <Link href="/intercept" className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 transition-colors hover:text-white">← Event</Link>
            <Link href="/intercept/cfp" className="border border-[#FF7A00] px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-[#FF7A00] transition-colors hover:bg-[#FF7A00] hover:text-black">
              [ Submit a Paper ]
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="border-b border-neutral-900">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-neutral-500">An AARM event · {EVENT.dateStamp} · {EVENT.location}</div>
            <h1 className="mx-auto leading-[1.15] text-white" style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(1.8rem, 7vw, 4rem)" }}>
              CALL FOR<br />PAPERS
            </h1>
            <p className="mx-auto mt-8 max-w-2xl font-mono text-base leading-relaxed text-neutral-300">
              INTERCEPT is the conference for the people who actually do the work on agentic runtime security —
              builders, breakers, and defenders. No marketers. No product pitches. Show us what you shipped,
              broke, or defended.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="border border-[#2EFF7B] px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-[#2EFF7B]">● Open now</span>
              <span className="border border-neutral-700 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-neutral-400">Closes October 1, 2026</span>
            </div>
            <div className="mt-8">
              <Link href="/intercept/cfp" className="inline-block border-2 border-[#FF7A00] bg-[#FF7A00] px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-[#FF7A00]">
                [ Submit a Paper ]
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-16 px-6 py-16">
          {/* Tracks */}
          <Section title="Three tracks">
            <p className="mb-8 max-w-2xl font-mono text-sm leading-relaxed text-neutral-400">
              {EVENT.tagline}. Pick the track that matches how you spend your day. If your talk spans two, submit to the one it leans toward.
            </p>
            <div className="space-y-4">
              {TRACKS.map((t) => (
                <div key={t.name} className="border border-neutral-800 bg-neutral-950 p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{t.icon}</span>
                    <h3 className="font-mono text-lg font-bold uppercase tracking-widest" style={{ color: t.color }}>{t.name}</h3>
                  </div>
                  <p className="mb-4 font-mono text-sm leading-relaxed text-neutral-300">{t.blurb}</p>
                  <ul className="grid gap-1.5 sm:grid-cols-2">
                    {t.wants.map((w) => (
                      <li key={w} className="flex gap-2 font-mono text-xs text-neutral-500">
                        <span style={{ color: t.color }}>›</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* Formats */}
          <Section title="Talk formats">
            <div className="grid gap-4 sm:grid-cols-3">
              {FORMATS.map((f) => (
                <div key={f.name} className="border border-neutral-800 bg-neutral-950 p-5">
                  <div className="mb-1.5 font-mono text-sm font-bold text-white">{f.name}</div>
                  <div className="font-mono text-xs leading-relaxed text-neutral-500">{f.detail}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* What makes a great submission / what doesn't belong */}
          <Section title="What we're looking for">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border-l-2 border-[#2EFF7B] bg-[#2EFF7B]/[0.06] p-6">
                <div className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-[#2EFF7B]">✓ A great submission</div>
                <ul className="space-y-2 font-mono text-sm leading-relaxed text-neutral-300">
                  <li>Real systems you shipped, attacked, or ran in production</li>
                  <li>Failures and what they taught you — we welcome war stories</li>
                  <li>Measurable outcomes: numbers, benchmarks, before/after</li>
                  <li>Code, artifacts, or a live demo that proves the point</li>
                  <li>New techniques against the agentic runtime threat surface</li>
                </ul>
              </div>
              <div className="border-l-2 border-[#FF3B30] bg-[#FF3B30]/[0.06] p-6">
                <div className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-[#FF3B30]">✕ What doesn&apos;t belong</div>
                <ul className="space-y-2 font-mono text-sm leading-relaxed text-neutral-300">
                  <li>Product pitches and vendor marketing</li>
                  <li>Theoretical claims with no evidence or artifacts</li>
                  <li>Recycled conference-circuit keynotes</li>
                  <li>Anything you can&apos;t show working</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Submission requirements */}
          <Section title="What to submit">
            <div className="space-y-4">
              <Req n="1" title="A conference paper — IEEE format (PDF)">
                Format your paper with the{" "}
                <a href={OVERLEAF} target="_blank" rel="noopener noreferrer" className="text-[#FF7A00] underline hover:text-white">Overleaf IEEE conference template ↗</a>{" "}
                and export to PDF (under 4MB). The paper is required.
              </Req>
              <Req n="2" title="Three short sections">
                In the submission form you&apos;ll give your core topics, your key takeaways, and why it matters &amp; who it&apos;s for. These are what the reviewers score.
              </Req>
              <Req n="3" title="Keep it anonymous">
                Blind review means no author or company name anywhere — not in the title, the sections, or the paper.{" "}
                <span className="text-[#FF3B30]">A paper with a reference to an author or company will be deleted.</span>
              </Req>
            </div>
          </Section>

          {/* Review process */}
          <Section title="How review works">
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat k="Blind" v="Reviewers never see who you are — only the work." />
              <Stat k="3 evaluators" v="Each scores your three sections 1–10 with written comments." />
              <Stat k="Chair decision" v="Accept / reject is made once at least three reviews are complete." />
            </div>
            <p className="mt-4 font-mono text-sm leading-relaxed text-neutral-500">
              Once a decision is made, you get every reviewer&apos;s scores and comments back — accepted or not. Some papers may be
              selected on a rolling basis before October 31.
            </p>
          </Section>

          {/* Timeline */}
          <Section title="Timeline">
            <div className="border-l border-neutral-800">
              {TIMELINE.map((t) => (
                <div key={t.phase} className="relative pl-6 pb-6 last:pb-0">
                  <span className="absolute left-0 top-1.5 -translate-x-1/2 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                  <div className="font-mono text-sm text-white">{t.phase}</div>
                  <div className="mt-0.5 font-mono text-xs text-neutral-500">{t.window}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* Benefits */}
          <Section title="If your paper is accepted">
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                "Free admission to INTERCEPT",
                "Your talk recorded and published",
                "A stage in front of the people building the standard",
                "Your paper credited in the AARM community",
              ].map((b) => (
                <li key={b} className="flex gap-2 border border-neutral-800 bg-neutral-950 px-4 py-3 font-mono text-sm text-neutral-300">
                  <span className="text-[#2EFF7B]">✓</span> {b}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-xs text-neutral-600">
              ✛ Travel and lodging are not covered. All participants agree to the event code of conduct.
            </p>
          </Section>

          {/* CTA */}
          <div className="border border-neutral-800 bg-neutral-950 p-8 text-center">
            <h2 className="mb-3 text-white" style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(1rem, 3.5vw, 1.6rem)" }}>READY?</h2>
            <p className="mx-auto mb-6 max-w-md font-mono text-sm text-neutral-400">Sign in, build your speaker profile, and submit your paper. Submissions close October 1, 2026.</p>
            <Link href="/intercept/cfp" className="inline-block border-2 border-[#FF7A00] bg-[#FF7A00] px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-[#FF7A00]">
              [ Submit a Paper ]
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-neutral-900 px-6 py-10 text-center">
        <Link href="/intercept" className="font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-white">← Back to INTERCEPT</Link>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 text-white" style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(1rem, 3.5vw, 1.7rem)" }}>{title}</h2>
      {children}
    </section>
  );
}

function Req({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 border border-neutral-800 bg-neutral-950 p-5">
      <div className="shrink-0 font-mono text-lg font-bold text-[#FF7A00]" style={{ fontFamily: "var(--font-pixel)", fontSize: "0.9rem" }}>{n}</div>
      <div>
        <div className="mb-1 font-mono text-sm font-bold text-white">{title}</div>
        <p className="font-mono text-sm leading-relaxed text-neutral-400">{children}</p>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-neutral-800 bg-neutral-950 p-5">
      <div className="mb-1.5 font-mono text-sm font-bold uppercase tracking-widest text-[#FF7A00]">{k}</div>
      <div className="font-mono text-xs leading-relaxed text-neutral-400">{v}</div>
    </div>
  );
}
