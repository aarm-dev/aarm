// INTERCEPT event content. Edit here without touching layout code.

export const EVENT = {
  name: "INTERCEPT",
  tagline: "Builders & Breakers of Agentic Runtime Security",
  dateStamp: "OCT 14 2026",
  location: "[LOCATION TBD]",
  aarmUrl: "https://aarm.dev",
};

export type Track = "builders" | "breakers" | "defenders";

export type Speaker = {
  name: string;
  title: string;
  company: string;
  track?: Track | "emcee";
  photo?: string;
  placeholder?: boolean;
};

export const EMCEE: Speaker = {
  name: "Allie Howe",
  title: "Founder & CEO · OWASP ASI Lead · Host, Insecure Agents Podcast",
  company: "Growth Cyber",
  track: "emcee",
  // Confirm the actual headshot + usage rights with Allie before publishing.
};

export const SPEAKERS: Speaker[] = [
  { name: "TBA", title: "Speaker", company: "AARM member", track: "builders", placeholder: true },
  { name: "TBA", title: "Speaker", company: "AARM member", track: "breakers", placeholder: true },
  { name: "TBA", title: "Speaker", company: "AARM member", track: "builders", placeholder: true },
  { name: "TBA", title: "Speaker", company: "AARM member", track: "breakers", placeholder: true },
  { name: "TBA", title: "Keynote", company: "TBA", placeholder: true },
  { name: "TBA", title: "Panelist", company: "TBA", placeholder: true },
];

// Single-day program. Session rows within Builders/Breakers are filled by AARM
// member companies — left as labeled placeholders.
export const PROGRAM = {
  zones: [
    { key: "keynote", label: "Keynote Stage", desc: "Opening keynote to set the agenda for agentic runtime security." },
    { key: "panel", label: "Panel Area", desc: "Moderated panels across the day." },
    { key: "expo", label: "Exhibitor Expo", desc: "Runs all day, alongside every track." },
  ],
  tracks: {
    builders: [
      { time: "TBD", title: "Builders session — slot open", by: "AARM member company" },
      { time: "TBD", title: "Builders session — slot open", by: "AARM member company" },
      { time: "TBD", title: "Builders session — slot open", by: "AARM member company" },
    ],
    breakers: [
      { time: "TBD", title: "Breakers session — slot open", by: "AARM member company" },
      { time: "TBD", title: "Breakers session — slot open", by: "AARM member company" },
      { time: "TBD", title: "Breakers session — slot open", by: "AARM member company" },
    ],
    defenders: [
      { time: "TBD", title: "Defenders session — slot open", by: "AARM member company" },
      { time: "TBD", title: "Defenders session — slot open", by: "AARM member company" },
      { time: "TBD", title: "Defenders session — slot open", by: "AARM member company" },
    ],
  },
};

export const SPONSOR_TIERS = [
  { tier: "Extended Conformant", note: "Top-tier sponsors", slots: 4 },
  { tier: "Core Conformant", note: "Sponsors", slots: 6 },
];
