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
export const isDbConfigured = !!process.env.DATABASE_URL;

export const db = isDbConfigured
  ? drizzle(neon(process.env.DATABASE_URL!), { schema })
  : null;

export { schema };
