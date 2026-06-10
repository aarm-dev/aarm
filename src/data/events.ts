export type EventStatus = "upcoming" | "coming-soon" | "past";
export type EventTag = "Conference" | "Summit" | "Community" | "Meetup";

export type AARMEvent = {
  id: string;
  name: string;
  url?: string;
  date: string;          // display string, e.g. "August 2026"
  dateISO?: string;      // ISO date for sorting, e.g. "2026-08-01"
  location?: string;
  description?: string;
  status: EventStatus;
  tag: EventTag;
  /** When true, a subtle banner appears on the homepage hero */
  spotlight: boolean;
};

export const EVENTS: AARMEvent[] = [
  {
    id: "aauth-night",
    name: "AAuth Night: Moving Beyond OAuth",
    url: "https://lu.ma/a2h25m60",
    date: "2026",
    location: "111 Minna St, San Francisco, CA",
    description:
      "An evening exploring authentication challenges for AI agents — featuring talks and demos on AAuth, a new auth protocol for agents built by OAuth author Dick Hardt. Topics include running agents without API keys, mission-bounded authority, multi-agent delegation, and production authentication patterns.",
    status: "upcoming",
    tag: "Community",
    spotlight: true,
  },
  {
    id: "blackhat-ciso-summit-2026",
    name: "Black Hat CISO Summit 2026",
    url: "https://www.blackhat.com/us-26/summit-sessions/schedule/index.html?track[]=ciso-summit#the-ai-arms-race-from-governance-to-runtime-control-in-an-autonomous-threat-landscape-55609",
    date: "August 2026",
    dateISO: "2026-08-01",
    location: "Las Vegas, NV",
    description:
      "AARM featured at the Black Hat CISO Summit — session: \"The AI Arms Race: From Governance to Runtime Control in an Autonomous Threat Landscape.\"",
    status: "upcoming",
    tag: "Summit",
    spotlight: true,
  },
  {
    id: "aarm-con",
    name: "AARM Con",
    date: "Fall 2026",
    dateISO: "2026-10-01",
    description:
      "The first dedicated conference for AI agent runtime security. Details coming soon.",
    status: "coming-soon",
    tag: "Conference",
    spotlight: false,
  },
];

export const spotlightEvents = EVENTS.filter(
  (e) => e.spotlight && e.status === "upcoming"
);
