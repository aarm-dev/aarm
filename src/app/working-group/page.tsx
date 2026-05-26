import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Working Group — AARM",
  description:
    "The AARM Technical Working Group. Security practitioners, researchers, and builders shaping the future of AI agent security.",
};

const leadership = [
  {
    name: "Herman Errico",
    title: "Senior Product Manager",
    company: "Vanta",
    role: "Author",
    bio: "Co-founder and primary author of the AARM specification. Leads the working group and specification development at the Cloud Security Alliance.",
  },
  {
    name: "Akul Loomba",
    title: "Product Manager",
    company: "Independent",
    role: "Co-Author",
    bio: "Co-author of the AARM specification and core contributor to the conformance framework and builder registry.",
  },
  {
    name: "Diana Kelley",
    title: "Cybersecurity Strategist & Author",
    company: "Independent",
    role: "Contributor",
    bio: "Cybersecurity executive, author, and advisor with deep expertise in enterprise security architecture and emerging technology risk.",
  },
  {
    name: "Chris Hughes",
    title: "CISO Advisor & Author",
    company: "Independent",
    role: "Contributor",
    bio: "Cybersecurity author, podcast host, and CISO advisor focused on software supply chain security and AI risk.",
  },
];

const members = [
  {
    name: "Phil Venables",
    title: "Partner",
    company: "Ballistic Ventures",
  },
  {
    name: "Ken Huang",
    title: "AI Researcher & Author",
    company: "Distributedapps.AI",
  },
  {
    name: "Anthony Scarfe",
    title: "Deputy CISO",
    company: "Elastic",
  },
  {
    name: "Camille Stewart Gloster",
    title: "Co-founder",
    company: "Foundation Layer Institute",
  },
  {
    name: "Hema Kak Kalsi",
    title: "Engineering Leader",
    company: "Independent",
  },
  {
    name: "Alex Foley",
    title: "Cybersecurity Group Manager",
    company: "Truist",
  },
  {
    name: "Kavya Pearlman",
    title: "Founder & Researcher",
    company: "XRSI",
  },
  {
    name: "Krti Tallam",
    title: "Sr Member of Technical Staff",
    company: "KamiwazaAI",
  },
  {
    name: "Matthew Rosenquist",
    title: "Founder & CISO Advisor",
    company: "Cybersecurity Insights",
  },
  {
    name: "Prasenjit Sinha",
    title: "iOS Engineer",
    company: "Gusto",
  },
  {
    name: "Saikiran Rallabandi",
    title: "IEEE Senior Member",
    company: "IEEE",
  },
  {
    name: "Shanita Sojan",
    title: "Cyber Team Lead",
    company: "Darktrace",
  },
];

const contributions = [
  {
    area: "Specification",
    desc: "Draft, review, and refine AARM requirements. Propose additions and flag ambiguities.",
  },
  {
    area: "Conformance",
    desc: "Define and validate the testing protocol. Review evidence packages from builders.",
  },
  {
    area: "Community",
    desc: "Engage builders, publish research, and grow the AARM ecosystem.",
  },
  {
    area: "Threat Modeling",
    desc: "Identify new attack classes and validate coverage of the AARM threat model.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

function avatarColor(name: string) {
  const colors = [
    { bg: "#EEF4FF", text: "#1A6EB5" },
    { bg: "#F0FDF4", text: "#15803D" },
    { bg: "#FFF7ED", text: "#C2410C" },
    { bg: "#FDF4FF", text: "#7E22CE" },
    { bg: "#F0F9FF", text: "#0369A1" },
    { bg: "#FFF1F2", text: "#BE123C" },
  ];
  const i = name.charCodeAt(0) % colors.length;
  return colors[i];
}

export default function WorkingGroupPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="border-b border-blue-100"
        style={{ backgroundColor: "#EEF4FF" }}
      >
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-sm text-blue-700 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Cloud Security Alliance
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Technical Working Group
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-500">
            Security practitioners, researchers, and builders shaping the open
            standard for AI agent runtime security.
          </p>
        </div>
      </section>

      {/* Mission strip */}
      <section className="border-b border-neutral-100 py-14">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Open specification",
                desc: "AARM is a vendor-neutral, community-driven standard — no single company controls the roadmap.",
              },
              {
                title: "Practitioner-led",
                desc: "Every requirement is proposed, debated, and validated by practitioners with real-world security experience.",
              },
              {
                title: "Publicly auditable",
                desc: "All specification changes, conformance decisions, and working group discussions happen in the open.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="mb-2 font-semibold text-neutral-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-b border-neutral-100 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">Leadership</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {leadership.map((person) => {
              const color = avatarColor(person.name);
              return (
                <div
                  key={person.name}
                  className="flex gap-4 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold"
                    style={{ backgroundColor: color.bg, color: color.text }}
                  >
                    {initials(person.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-neutral-900">{person.name}</span>
                      <span
                        className="rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide"
                        style={{
                          backgroundColor: "rgba(26,110,181,0.08)",
                          color: "#1A6EB5",
                        }}
                      >
                        {person.role}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-neutral-500">
                      {person.title} · {person.company}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">{person.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contributors */}
      <section className="border-b border-neutral-100 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">Contributors</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((person) => {
              const color = avatarColor(person.name);
              return (
                <div
                  key={person.name}
                  className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-white p-4"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
                    style={{ backgroundColor: color.bg, color: color.text }}
                  >
                    {initials(person.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-neutral-900">{person.name}</div>
                    <div className="truncate text-xs text-neutral-500">
                      {person.title} · {person.company}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to contribute */}
      <section className="border-b border-neutral-100 bg-neutral-50/50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">
              How the working group operates
            </h2>
            <p className="mx-auto max-w-xl text-neutral-500">
              The TWG governs the AARM specification, conformance process, and builder registry through open collaboration.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contributions.map((item) => (
              <div
                key={item.area}
                className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm"
              >
                <div
                  className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                  style={{ backgroundColor: "#1A6EB5" }}
                >
                  {item.area[0]}
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-neutral-900">{item.area}</h3>
                <p className="text-xs leading-relaxed text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div
            className="rounded-2xl p-10 text-center"
            style={{ background: "linear-gradient(135deg, #1A6EB5 0%, #1E4FA0 100%)" }}
          >
            <h2 className="mb-3 text-2xl font-bold text-white">Join the working group</h2>
            <p className="mx-auto mb-7 max-w-lg text-blue-100">
              The working group is open to security practitioners, researchers, and builders who want to shape the future of AI agent security.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://cloudsecurityalliance.org/research/working-groups/autonomous-action-runtime-management-aarm"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-7 py-3 text-sm font-bold text-blue-700 transition-opacity hover:opacity-90"
              >
                Apply via CSA →
              </a>
              <a
                href="https://github.com/aarm-dev/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                View spec on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
