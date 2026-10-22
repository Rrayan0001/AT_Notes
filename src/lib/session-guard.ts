import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDomain } from "@/lib/domains";

export type DomainGuard =
  | { ok: true; userId: string; domainId: string }
  | { ok: false; response: NextResponse };

/**
 * Session-based domain authorization for the retrieval API.
 *
 * The user's domain is read from the signed session, never from the request
 * body or query string, so a client cannot widen its own access. Two failures:
 * 401 when there is no session, 503 when the domain exists but its corpus is
 * not chunked + embedded yet.
 */
export async function guardDomainAccess(options?: {
  requireIngested?: boolean;
}): Promise<DomainGuard> {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const domain = getDomain(user.domain);
  if (!domain) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Account has no valid domain." }, { status: 403 }),
    };
  }

  if (options?.requireIngested !== false && !domain.ingested) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: `The ${domain.label} corpus is not ingested yet.` },
        { status: 503 },
      ),
    };
  }

  return { ok: true, userId: user.id, domainId: domain.id };
}
