import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // Injected by the Vercel ↔ Neon integration; placeholder in .env.example.
    url: process.env.DATABASE_URL!,
  },
});
