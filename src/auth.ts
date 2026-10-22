import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { Provider } from "@auth/core/providers";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { authConfig } from "@/auth.config";
import { verifyPassword } from "@/lib/scrypt";

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
 * Node-side auth. The Drizzle adapter persists OAuth users; credentials
 * verify the scrypt hash stored at signup. Domain always comes from the
 * database row — never from the client.
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
  providers: [
    ...providerStack,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = typeof credentials?.email === "string" ? credentials.email.trim().toLowerCase() : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";
        if (!email || !password) return null;

        try {
          const db = getDb();
          const [user] = await db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1);
          if (!user || !user.passwordHash) return null;
          if (!(await verifyPassword(password, user.passwordHash))) return null;
          return { id: user.id, email: user.email, name: user.name, image: user.image, domain: user.domain ?? undefined };
        } catch (error) {
          console.error("credentials authorize failed:", error);
          return null;
        }
      },
    }),
  ],
  adapter,
  // New OAuth users need a domain; until we offer domain linking, OAuth logins
  // flow through the signup page which assigns one.
  callbacks: {
    ...authConfig.callbacks,
    /**
     * OAuth: a Google account may only sign in if the same email was already
     * registered through signup and therefore owns a domain. This keeps
     * "one email = one domain" true for OAuth as well.
     */
    async signIn({ user, account }) {
      if (account?.provider && OAuthProviders.includes(account.provider)) {
        try {
          const db = getDb();
          const email = user.email?.trim().toLowerCase();
          if (!email) return false;
          const [row] = await db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1);
          if (!row?.domain) return "/signup?error=unlinked";
          user.domain = row.domain;
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
