import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  primaryKey,
  integer,
  uuid,
} from "drizzle-orm/pg-core";
import type {
  Category,
  Surface,
  Stage,
  ProductType,
  Audience,
  Deployment,
  InterceptionArchitecture,
  PolicyModel,
  AuthDecision,
  ConformanceLevel,
  ListingStatus,
} from "./taxonomy";

/** R1–R9 coverage record for verified builders. */
export type RequirementRecord = {
  id: string; // R1..R9
  status: "pass" | "fail" | "na";
  notes?: string;
}[];

export const builders = pgTable("builders", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),

  // ── Identity (TWG sets at approval) ──
  name: text("name").notNull(),
  website: text("website"),
  domain: text("domain"), // derived from website; used for claim matching

  // ── Marketing + classification (company-editable once claimed) ──
  description: text("description"),
  logoUrl: text("logo_url"),
  category: text("category").$type<Category>(),
  secondaryCategory: text("secondary_category").$type<Category>(),
  surfaces: jsonb("surfaces").$type<Surface[]>().default([]),
  stage: text("stage").$type<Stage>(),
  types: jsonb("types").$type<ProductType[]>().default([]),
  audiences: jsonb("audiences").$type<Audience[]>().default([]),
  deployments: jsonb("deployments").$type<Deployment[]>().default([]),

  // ── Conformance + technical axes (TWG-only) ──
  conformanceLevel: text("conformance_level").$type<ConformanceLevel>().default("aligned"),
  verifiedDate: text("verified_date"),
  verifiedBy: text("verified_by"),
  tagline: text("tagline"),
  about: text("about"),
  architecture: text("architecture"),
  interception: jsonb("interception").$type<InterceptionArchitecture[]>().default([]),
  policyModel: text("policy_model").$type<PolicyModel>(),
  decisions: jsonb("decisions").$type<AuthDecision[]>().default([]),
  requirements: jsonb("requirements").$type<RequirementRecord>().default([]),
  capabilities: jsonb("capabilities").$type<string[]>().default([]),
  keyFacts: jsonb("key_facts").$type<{ label: string; value: string }[]>().default([]),

  // ── Point of contact (team-visible, flagged when missing) ──
  pocName: text("poc_name"),
  pocEmail: text("poc_email"),

  // ── Conformance request (owner-initiated, TWG-tracked) ──
  conformanceRequestStatus: text("conformance_request_status")
    .$type<"not_started" | "started" | "in_review" | "verified" | "declined">()
    .default("not_started"),
  conformanceTargetLevel: text("conformance_target_level").$type<"core" | "extended">(),
  conformanceAssessmentId: text("conformance_assessment_id"), // MCP run id, shown to owner

  // ── Positioning (TWG-only) ──
  featured: boolean("featured").default(false),
  sortOrder: integer("sort_order").default(0), // original registry order (seed-owned)
  priority: integer("priority"), // admin override; lower = higher. null = use sortOrder

  // ── Lifecycle ──
  status: text("status").$type<ListingStatus>().notNull().default("pending"),
  createdBy: text("created_by"), // user id of submitter
  claimedBy: text("claimed_by"), // user id of verified owner
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const claims = pgTable("claims", {
  id: uuid("id").defaultRandom().primaryKey(),
  builderId: uuid("builder_id")
    .notNull()
    .references(() => builders.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  userEmail: text("user_email").notNull(),
  method: text("method").$type<"domain_match" | "manual">().notNull(),
  status: text("status").$type<"pending" | "approved" | "rejected">().notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  reviewedBy: text("reviewed_by"),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
});

// ── Auth.js (NextAuth) tables — Drizzle adapter shape ──

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  isAdmin: boolean("is_admin").default(false),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// INTERCEPT event — early-access signups (lives in the existing Neon DB).
export const interceptSignups = pgTable("intercept_signup", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  company: text("company"),
  role: text("role").$type<"builder" | "breaker" | "defender" | "">(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type BuilderRow = typeof builders.$inferSelect;
export type NewBuilderRow = typeof builders.$inferInsert;
export type ClaimRow = typeof claims.$inferSelect;
