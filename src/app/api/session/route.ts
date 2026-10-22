import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decode, encode } from "next-auth/jwt";

/**
 * The session horizon. NextAuth bakes one fixed expiry into every session
 * token; this route re-signs it after sign-in so "Keep me signed in" is real:
 * checked, the token lives 180 days; unchecked, it lapses after 24 hours.
 */
const DAY = 24 * 60 * 60;
const KEPT = 180 * DAY;
const FRESH = DAY;
const COOKIE_NAMES = ["__Secure-authjs.session-token", "authjs.session-token"];

export async function POST(request: Request) {
  const jar = await cookies();
  const name = COOKIE_NAMES.find((n) => jar.get(n)?.value);
  const raw = name ? jar.get(name)?.value : undefined;
  const secret = process.env.AUTH_SECRET;
  if (!name || !raw || !secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = await decode({ secret, salt: name, token: raw }).catch(() => null);
  if (!token) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { keep } = (await request.json().catch(() => ({}))) as { keep?: boolean };
  const maxAge = keep ? KEPT : FRESH;
  const jwt = await encode({ secret, salt: name, maxAge, token: { ...token } });
  jar.set(name, jwt, {
    httpOnly: true,
    secure: name.startsWith("__Secure-"),
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return NextResponse.json({ ok: true, maxAge });
}
