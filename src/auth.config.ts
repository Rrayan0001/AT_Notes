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
     * NextAuth machinery requires a session. The request body never carries
     * the domain; it is read from this session everywhere else.
     */
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/api/auth")) return true;
      if (pathname === "/login" || pathname === "/signup") return true;

      const isLoggedIn = Boolean(auth?.user);
      if (isLoggedIn) return true;

      // Programmatic clients get a JSON rejection, browsers a login redirect.
      if (pathname.startsWith("/api")) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
      return Response.redirect(new URL("/login", request.nextUrl));
    },
    jwt({ token, user }) {
      if (user?.domain) token.domain = user.domain;
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
