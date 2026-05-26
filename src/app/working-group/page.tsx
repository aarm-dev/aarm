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
  companyDomain: string;
  role: string;
  bio?: string;
  photo?: string;
  linkedin?: string;
};

function logoUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

const leadership: Member[] = [
  {
    name: "Herman Errico",
    title: "Author of AARM · PM",
    company: "Vanta",
    companyDomain: "vanta.com",
    role: "Author",
    photo: "/team/herman-errico.png",
    linkedin: "https://www.linkedin.com/in/hermanerrico/",
  },
  {
    name: "Akul Loomba",
    title: "Co-chair, AARM Working Group · PM",
    company: "Microsoft",
    companyDomain: "microsoft.com",
    role: "Co-Chair",
    linkedin: "https://www.linkedin.com/in/akulloomba/",
  },
  {
    name: "Diana Kelley",
    title: "Co-chair, AARM Working Group · CISO",
    company: "Noma",
    companyDomain: "noma.security",
    role: "Co-Chair",
    linkedin: "https://www.linkedin.com/in/dianakelleysecuritycurve/",
  },
  {
    name: "Chris Hughes",
    title: "Co-chair, AARM Working Group · VP Security Strategy",
    company: "Zenity",
    companyDomain: "zenity.io",
    role: "Co-Chair",
    linkedin: "https://www.linkedin.com/in/resilientcyber/",
  },
];

const members: Member[] = [
  {
    name: "Phil Venables",
    title: "Partner",
    company: "Ballistic Ventures",
    companyDomain: "ballisticventures.com",
    role: "Contributor",
    photo: "/team/phil-venables.jpg",
    linkedin: "https://www.linkedin.com/in/philvenables/",
  },
  {
    name: "Ken Huang",
    title: "AI Researcher & Author",
    company: "Distributedapps.AI",
    companyDomain: "distributedapps.ai",
    role: "Contributor",
    photo: "/team/ken-huang.jpg",
    linkedin: "https://www.linkedin.com/in/kenhuang8/",
  },
  {
    name: "Anthony Scarfe",
    title: "Deputy CISO",
    company: "Elastic",
    companyDomain: "elastic.co",
    role: "Contributor",
    photo: "/team/anthony-scarfe.jpg",
    linkedin: "https://www.linkedin.com/in/anthonyscarfe/",
  },
  {
    name: "Camille Stewart Gloster",
    title: "Co-founder",
    company: "Foundation Layer Institute",
    companyDomain: "foundationlayer.org",
    role: "Contributor",
    photo: "/team/camille-stewart.jpg",
    linkedin: "https://www.linkedin.com/in/camillestewartesq/",
  },
  {
    name: "Hema Kak Kalsi",
    title: "Engineering Leader",
    company: "Independent",
    companyDomain: "linkedin.com",
    role: "Contributor",
    photo: "/team/hema-kak-kalsi.jpg",
    linkedin: "https://www.linkedin.com/in/hemakalsi/",
  },
  {
    name: "Alex Foley",
    title: "Cybersecurity Group Manager",
    company: "Truist",
    companyDomain: "truist.com",
    role: "Contributor",
    photo: "/team/alex-foley.jpg",
    linkedin: "https://www.linkedin.com/in/alexanderfoley/",
  },
  {
    name: "Kavya Pearlman",
    title: "Founder & Researcher",
    company: "XRSI",
    companyDomain: "xrsi.org",
    role: "Contributor",
    photo: "/team/kavya-pearlman.png",
    linkedin: "https://www.linkedin.com/in/kavya-pearlman/",
  },
  {
    name: "Krti Tallam",
    title: "Sr Member of Technical Staff",
    company: "KamiwazaAI",
    companyDomain: "kamiwaza.ai",
    role: "Contributor",
    photo: "/team/krti-tallam.png",
    linkedin: "https://www.linkedin.com/in/krti-tallam/",
  },
  {
    name: "Matthew Rosenquist",
    title: "Founder & CISO Advisor",
    company: "Cybersecurity Insights",
    companyDomain: "cybersecurity-insights.com",
    role: "Contributor",
    photo: "/team/matthew-rosenquist.jpg",
    linkedin: "https://www.linkedin.com/in/matthewrosenquist/",
  },
  {
    name: "Prasenjit Sinha",
    title: "iOS Engineer",
    company: "Gusto",
    companyDomain: "gusto.com",
    role: "Contributor",
    photo: "/team/prasenjit-sinha.jpg",
    linkedin: "https://www.linkedin.com/in/prasenjit-sinha-b6395759/",
  },
  {
    name: "Saikiran Rallabandi",
    title: "IEEE Senior Member",
    company: "IEEE",
    companyDomain: "ieee.org",
    role: "Contributor",
    photo: "/team/saikiran-rallabandi.jpg",
    linkedin: "https://www.linkedin.com/in/saikiranrallabandi/",
  },
  {
    name: "Shanita Sojan",
    title: "Cyber Team Lead",
    company: "Darktrace",
    companyDomain: "darktrace.com",
    role: "Contributor",
    photo: "/team/shanita-sojan.jpg",
    linkedin: "https://www.linkedin.com/in/shanita-sojan/",
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
              <a
                key={person.name}
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <Avatar person={person} size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-neutral-900">{person.name}</span>
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide"
                      style={{ backgroundColor: "rgba(26,110,181,0.08)", color: "#1A6EB5" }}
                    >
                      {person.role}
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs text-neutral-500">
                    {person.title}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <img src={logoUrl(person.companyDomain)} alt={person.company} width={14} height={14} className="rounded-sm" />
                    <span className="text-xs font-medium text-neutral-600">{person.company}</span>
                  </div>
                </div>
              </a>
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
              <a
                key={person.name}
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-white p-4 transition-shadow hover:shadow-sm"
              >
                <Avatar person={person} size="sm" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-neutral-900">{person.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <img src={logoUrl(person.companyDomain)} alt={person.company} width={12} height={12} className="rounded-sm shrink-0" />
                    <div className="truncate text-xs text-neutral-500">{person.title} · {person.company}</div>
                  </div>
                </div>
              </a>
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
