import { Workbench } from "@/components/workbench";
import { ComingSoon } from "@/components/coming-soon";
import automationBundle from "@/data/index.json";
import awsBundle from "@/data/index-aws.json";
import azureBundle from "@/data/index-azure.json";
import type { Chunk, IndexBundle } from "@/lib/types";
import { auth } from "@/auth";
import { getDomain } from "@/lib/domains";
import { shelfRanges } from "@/lib/shelf";

const BUNDLES: Record<string, IndexBundle> = {
  automation: automationBundle as unknown as IndexBundle,
  aws: awsBundle as unknown as IndexBundle,
  azure: azureBundle as unknown as IndexBundle,
};

export default async function Home() {
  const session = await auth();
  const user = session?.user
    ? {
        name: session.user.name ?? session.user.email ?? "you",
        email: session.user.email ?? "",
        domain: session.user.domain,
      }
    : null;

  const domain = getDomain(user?.domain);

  // Only ingested domains have a retrieval index to chat against yet.
  if (
    user &&
    domain &&
    domain.ingested &&
    user.domain &&
    Object.hasOwn(BUNDLES, user.domain)
  ) {
    const { chunks } = BUNDLES[user.domain];
    const maxPage = (chunks as Chunk[]).reduce((m, c) => Math.max(m, c.page), 0);
    return (
      <Workbench
        user={user}
        maxPage={maxPage}
        shelf={shelfRanges(user.domain)}
        domainLabel={domain?.label}
      />
    );
  }

  return (
    <ComingSoon
      domainLabel={domain?.label ?? ""}
      user={user}
    />
  );
}
