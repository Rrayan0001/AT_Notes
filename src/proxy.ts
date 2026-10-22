import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Next.js 16 renamed the middleware convention to `proxy`; the exported auth
// wrapper runs the edge-safe config's `authorized` callback on every matched
// request (see proxy matcher in next.config.ts or below).
export default NextAuth(authConfig).auth;

// Static assets and build output never require a session. Without this the
// auth gate 302s stylesheet requests to /login and pages render unstyled
// until a session cookie exists.
export const config = {
  matcher: [
    // /api/session re-signs the token with a custom horizon; the NextAuth
    // middleware would re-emit the cookie at the default 30 days after it.
    "/((?!_next/static|_next/image|_next/webpack|favicon.ico|robots.txt|api/session|.*\\.(?:css|js|map|png|jpg|jpeg|gif|svg|ico|webp|woff2?)$).*)",
  ],
};
