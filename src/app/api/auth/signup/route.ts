import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { hashPassword } from "@/lib/scrypt";
import { DOMAINS } from "@/lib/domains";
import { PASSWORD_MAX, PASSWORD_MIN, passwordRequirementMessage } from "@/lib/password";

const booking = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().max(PASSWORD_MAX).refine(
    (value) => passwordRequirementMessage(value) === null,
    {
      message: `Password needs ${PASSWORD_MIN}+ characters with upper and lower case letters, a digit and a symbol.`,
    }
  ),
  domain: z.string().refine((value) => value in DOMAINS, "Unknown domain"),
});

/**
 * Account creation. The user picks exactly one domain here; that column is
 * never updated by any code path afterwards.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = booking.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid signup payload." },
      { status: 400 },
    );
  }
  const { name, email, password, domain } = parsed.data;
  const domainConfig = DOMAINS[domain];
  if (!domainConfig.open) {
    return NextResponse.json({ error: `${domainConfig.label} is not open for registration yet.` }, { status: 400 });
  }

  try {
    const db = getDb();
    const [existing] = await db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1);
    if (existing?.domain && existing?.passwordHash) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }
    const passwordHash = await hashPassword(password);
    if (existing) {
      // A Google/GitHub attempt stub-created this row before the person chose
      // a domain (schema: domain is nullable for adapter stubs). Completing
      // signup here activates it; the domain stays locked from now on.
      await db
        .update(schema.users)
        .set({ name, passwordHash, domain })
        .where(eq(schema.users.id, existing.id));
      return NextResponse.json({ ok: true }, { status: 201 });
    }
    await db.insert(schema.users).values({ name, email, passwordHash, domain });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("signup failed:", error);
    return NextResponse.json(
      { error: "Signup failed. Is DATABASE_URL configured in .env? Run `npm run db:push` after adding it." },
      { status: 500 },
    );
  }
}
