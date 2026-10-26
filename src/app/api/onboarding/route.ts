import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { and, eq, isNull } from "drizzle-orm";
import { auth } from "@/auth";
import { decode, encode } from "next-auth/jwt";
import { getDb, schema } from "@/db";
import { isRegistrableDomain, DOMAINS } from "@/lib/domains";

// Cookie name depends on the deployment being https or not, exactly as
// NextAuth names it; see /api/session which re-signs the same way.
const COOKIE_NAMES = ["__Secure-authjs.session-token", "authjs.session-token"];

const booking = z.object({
  domain: z.string().refine((value) => value in DOMAINS, "Unknown domain"),
});

/**
 * One-time domain seal for first-time Google users. The session must exist
 * and its user row must still have no domain; the write is guarded at the
 * SQL level (WHERE domain IS NULL) so "one email = one domain, forever"
 * cannot be broken by a stale tab or a double submit.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = booking.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid payload." },
      { status: 400 },
    );
  }

  const { domain } = parsed.data;
  if (!isRegistrableDomain(domain)) {
    return NextResponse.json({ error: `${DOMAINS[domain].label} is not open for registration yet.` }, { status: 400 });
  }

  try {
    const db = getDb();
    const sealed = await db
      .update(schema.users)
      .set({ domain })
      .where(and(eq(schema.users.id, session.user.id), isNull(schema.users.domain)))
      .returning();

    if (sealed.length === 0) {
      // Row already owns a domain (stale tab racing itself), or the session
      // user is unknown to the database. Either way there is nothing to do.
      return NextResponse.json({ error: "This session already belongs to a domain." }, { status: 409 });
    }

    // The session JWT was minted at sign-in, before a domain existed, so it
    // carries none. Bake the freshly sealed domain straight into the token
    // (same re-signing the /api/session route uses) so the client can walk
    // directly to the workbench — no second Google round-trip to mint the
    // domain into the session.
    const jar = await cookies();
    const name = COOKIE_NAMES.find((n) => jar.get(n)?.value);
    const raw = name ? jar.get(name)?.value : undefined;
    const secret = process.env.AUTH_SECRET;
    if (name && raw && secret) {
      const token = await decode({ secret, salt: name, token: raw }).catch(() => null);
      if (token) {
        const refreshed = await encode({
          secret,
          salt: name,
          maxAge: token.exp && token.iat ? token.exp - token.iat : undefined,
          token: { ...token, domain },
        });
        jar.set(name, refreshed, {
          httpOnly: true,
          secure: name.startsWith("__Secure-"),
          sameSite: "lax",
          path: "/",
          maxAge: token.exp && token.iat ? token.exp - token.iat : undefined,
        });
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("onboarding failed:", error);
    return NextResponse.json({ error: "Sealing failed. Is DATABASE_URL configured in .env?" }, { status: 500 });
  }
}
