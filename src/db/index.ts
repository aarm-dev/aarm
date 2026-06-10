import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

/**
 * Neon-backed Drizzle client.
 *
 * `DATABASE_URL` is injected automatically by the Vercel ↔ Neon integration.
 * It is never committed — see .env.example for the placeholder.
 *
 * `isDbConfigured` lets the app fall back to the static seed registry until
 * Neon is provisioned, so the public site never breaks mid-migration.
 */
// Accept the common names the Vercel ↔ Neon integration may emit, so a prefix
// hiccup can't silently disable the DB.
const DATABASE_URL =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING;

export const isDbConfigured = !!DATABASE_URL;

export const db = isDbConfigured ? drizzle(neon(DATABASE_URL!), { schema }) : null;

export { schema };
