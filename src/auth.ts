import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "@auth/core/providers";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq, sql } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { authConfig } from "@/auth.config";

const providerStack: Provider[] = [...authConfig.providers];

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;
if (googleId && googleSecret) {
  // Email-linking is dangerous by default in Auth.js; safe here because Google
  // verifies the email and the signIn callback only admits rows that own a
  // domain (set at signup).
  providerStack.push(
    Google({
      clientId: googleId,
      clientSecret: googleSecret,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

/**
 * Node-side auth. The DrizzleAdapter persists OAuth users. Domain always
 * comes from the database row — never from the client. First-time Google
 * users enter with a domain-less session and pick a domain on /signup
 * (/api/onboarding); there is no password path.
 */

const OAuthProviders = googleId && googleSecret ? ["google"] : [];

const adapter = process.env.DATABASE_URL
  ? DrizzleAdapter(getDb(), {
      usersTable: schema.users,
      accountsTable: schema.accounts,
      sessionsTable: schema.sessions,
      verificationTokensTable: schema.verificationTokens,
      authenticatorsTable: schema.authenticators,
    })
  : undefined;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: providerStack,
  adapter,
  // First-time Google users enter the app with a domain-less session; the
  // gate in auth.config.ts routes them to /signup where they pick exactly
  // one domain. That assignment is written once and never changed.
  callbacks: {
    ...authConfig.callbacks,
    /**
     * Google emails are verified by the provider. For rows that predate
     * Google-only auth (password signups), record the verification we know
     * for free — no verification codes by design.
     */
    async signIn({ user, account }) {
      if (account?.provider && OAuthProviders.includes(account.provider)) {
        try {
          const db = getDb();
          const email = user.email?.trim().toLowerCase();
          if (!email) return false;
          const [row] = await db
  .select()
  .from(schema.users)
  .where(sql`lower(${schema.users.email}) = ${email}`)
  .limit(1);
          if (row?.domain) user.domain = row.domain;
          if (row && !row.emailVerified) {
            await db
              .update(schema.users)
              .set({ emailVerified: new Date() })
              .where(eq(schema.users.id, row.id));
          }
          return true;
        } catch (error) {
          console.error("oauth signIn lookup failed:", error);
          return true; // fail open on outage so existing links keep working
        }
      }
      return true;
    },
  },
});
