import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb, schema } from "@/db";
import { isAdminEmail } from "@/lib/admin";

const unlockSchema = z.object({ email: z.string().email() });

/**
 * Admin-only: clear the target account's switch cooldown by resetting
 * `domain_changed_at` to null, which restores its one free switch. No other
 * privileged effect exists.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = unlockSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Provide a valid account email." }, { status: 400 });
  }

  try {
    const db = getDb();
    const cleared = await db
      .update(schema.users)
      .set({ domainChangedAt: null })
      .where(eq(schema.users.email, parsed.data.email.toLowerCase()))
      .returning();
    if (cleared.length === 0) {
      return NextResponse.json({ error: "No account with that email." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, email: cleared[0].email }, { status: 200 });
  } catch (error) {
    console.error("admin unlock failed:", error);
    return NextResponse.json({ error: "Unlock failed." }, { status: 500 });
  }
}
