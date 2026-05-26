import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Working Group — AARM",
  description:
    "The AARM Technical Working Group. Security practitioners, researchers, and builders shaping the future of AI agent security.",
};

type Member = {
  name: string;
  title: string;
  company: string;
  role: string;
  bio?: string;
  photo?: string;
};

const leadership: Member[] = [
  {
    name: "Herman Errico",
    title: "Author of AARM · PM",
    company: "Vanta",
    role: "Author",
    photo: "/team/herman-errico.png",
  },
  {
    name: "Akul Loomba",
    title: "Co-chair, AARM Working Group · PM",
    company: "Microsoft",
    role: "Co-Chair",
  },
  {
    name: "Diana Kelley",
    title: "Co-chair, AARM Working Group · CISO",
    company: "Noma",
    role: "Co-Chair",
  },
  {
    name: "Chris Hughes",
    title: "Co-chair, AARM Working Group · VP Security Strategy",
    company: "Zenity",
    role: "Co-Chair",
  },
];

const members: Member[] = [
  {
    name: "Phil Venables",
    title: "Partner",
    company: "Ballistic Ventures",
    role: "Contributor",
    photo: "/team/phil-venables.jpg",
  },
  {
    name: "Ken Huang",
    title: "AI Researcher & Author",
    company: "Distributedapps.AI",
    role: "Contributor",
    photo: "/team/ken-huang.jpg",
  },
  {
    name: "Anthony Scarfe",
    title: "Deputy CISO",
    company: "Elastic",
    role: "Contributor",
    photo: "/team/anthony-scarfe.jpg",
  },
  {
    name: "Camille Stewart Gloster",
    title: "Co-founder",
    company: "Foundation Layer Institute",
    role: "Contributor",
    photo: "/team/camille-stewart.jpg",
  },
  {
    name: "Hema Kak Kalsi",
    title: "Engineering Leader",
    company: "Independent",
    role: "Contributor",
    photo: "/team/hema-kak-kalsi.jpg",
  },
  {
    name: "Alex Foley",
    title: "Cybersecurity Group Manager",
    company: "Truist",
    role: "Contributor",
    photo: "/team/alex-foley.jpg",
  },
  {
    name: "Kavya Pearlman",
    title: "Founder & Researcher",
    company: "XRSI",
    role: "Contributor",
    photo: "/team/kavya-pearlman.png",
  },
  {
    name: "Krti Tallam",
    title: "Sr Member of Technical Staff",
    company: "KamiwazaAI",
    role: "Contributor",
    photo: "/team/krti-tallam.png",
  },
  {
    name: "Matthew Rosenquist",
    title: "Founder & CISO Advisor",
    company: "Cybersecurity Insights",
    role: "Contributor",
    photo: "/team/matthew-rosenquist.jpg",
  },
  {
    name: "Prasenjit Sinha",
    title: "iOS Engineer",
    company: "Gusto",
    role: "Contributor",
    photo: "/team/prasenjit-sinha.jpg",
  },
  {
    name: "Saikiran Rallabandi",
    title: "IEEE Senior Member",
    company: "IEEE",
    role: "Contributor",
    photo: "/team/saikiran-rallabandi.jpg",
  },
  {
    name: "Shanita Sojan",
    title: "Cyber Team Lead",
    company: "Darktrace",
    role: "Contributor",
    photo: "/team/shanita-sojan.jpg",
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
  return colors[name.charCodeAt(0) % colors.length];
}

function Avatar({ person, size }: { person: Member; size: "lg" | "sm" }) {
  const dim = size === "lg" ? "h-14 w-14" : "h-10 w-10";
  const textSize = size === "lg" ? "text-sm" : "text-xs";
  const rounded = size === "lg" ? "rounded-2xl" : "rounded-xl";

  if (person.photo) {
    return (
      <img
        src={person.photo}
        alt={person.name}
        className={`${dim} ${rounded} shrink-0 object-cover`}
      />
    );
  }

  const color = avatarColor(person.name);
  return (
    <div
      className={`${dim} ${rounded} ${textSize} flex shrink-0 items-center justify-center font-bold`}
      style={{ backgroundColor: color.bg, color: color.text }}
    >
      {initials(person.name)}
    </div>
  );
}

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
                title: "System category specification",
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
            {leadership.map((person) => (
              <div
                key={person.name}
                className="flex gap-4 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
              >
                <Avatar person={person} size="lg" />
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
                  {person.bio && (
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">{person.bio}</p>
                  )}
                </div>
              </div>
            ))}
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
            {members.map((person) => (
              <div
                key={person.name}
                className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-white p-4"
              >
                <Avatar person={person} size="sm" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-neutral-900">{person.name}</div>
                  <div className="truncate text-xs text-neutral-500">
                    {person.title} · {person.company}
                  </div>
                </div>
              </div>
            ))}
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
                href="https://github.com/aarm-dev/aarm"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
