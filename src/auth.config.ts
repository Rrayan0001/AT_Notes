import type { NextAuthConfig } from "next-auth";
import type { Provider } from "@auth/core/providers";
import { DOMAINS } from "@/lib/domains";

/**
 * Edge-safe half of the auth configuration — imported by middleware.
 * It must never import the database client.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  providers: [] as Provider[],
  callbacks: {
    /**
     * The single access gate: everything except the auth pages and the
     * NextAuth machinery requires a session. First-time Google users sign in
     * without a domain yet — they are routed to /signup (onboarding) where
     * one is sealed. The request body never carries the domain; it is read
     * from this session everywhere else.
     */
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/api/auth")) return true;
      if (pathname === "/signup") return true;

      const isLoggedIn = Boolean(auth?.user);
      if (!isLoggedIn) {
        // /login always renders for the anonymous visitor; elsewhere send
        // programmatic clients a JSON rejection and browsers to the desk.
        if (pathname === "/login") return true;
        if (pathname.startsWith("/api")) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        return Response.redirect(new URL("/login", request.nextUrl));
      }

      // A fully-sealed session has no business on the login desk: visiting it
      // would let Auth.js throw OAuthAccountNotLinked on the next Google
      // round-trip. Send the user back to the workbench; switching identity
      // goes through sign-out in the header instead.
      if (pathname === "/login" && auth?.user?.domain) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      // Sealing the domain is the one API a domain-less session may call —
      // every other request waits until the seal is done.
      if (pathname.startsWith("/api/onboarding")) return true;

      // Signed in but no domain sealed yet: every page lands on onboarding.
      if (!auth?.user?.domain) {
        if (pathname.startsWith("/api")) {
          return Response.json({ error: "No domain sealed yet." }, { status: 401 });
        }
        return Response.redirect(new URL("/signup", request.nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) token.domain = user.domain ?? undefined;
      return token;
    },
    session({ session, token }) {
      const domain = token.domain as string | undefined;
      if (session.user && domain && Object.hasOwn(DOMAINS, domain)) {
        session.user.domain = domain;
      }
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
} satisfies NextAuthConfig;
