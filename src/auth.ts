import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { users, accounts, sessions, verificationTokens } from "@/db/schema";

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Adapter is only attached when the DB is configured; otherwise auth is inert
  // (the public site still renders from the static fallback).
  adapter: db
    ? DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
      })
    : undefined,
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    GitHub({ allowDangerousEmailAccountLinking: true }),
  ],
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        const email = session.user.email?.toLowerCase() ?? "";
        // Admin = on the allowlist OR flagged in the DB.
        const dbUser = user as { isAdmin?: boolean; isChair?: boolean; isEvaluator?: boolean };
        const isAdmin = adminEmails.includes(email) || Boolean(dbUser.isAdmin);
        (session.user as { isAdmin?: boolean }).isAdmin = isAdmin;
        (session.user as { isChair?: boolean }).isChair = isAdmin || Boolean(dbUser.isChair);
        (session.user as { isEvaluator?: boolean }).isEvaluator =
          isAdmin || Boolean(dbUser.isChair) || Boolean(dbUser.isEvaluator);
        (session.user as { emailDomain?: string }).emailDomain = email.split("@")[1] ?? "";
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
});
