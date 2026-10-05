import { Workbench } from "@/components/workbench";
import bundle from "@/data/index.json";
import type { Chunk, IndexBundle } from "@/lib/types";

export default function Home() {
  const { chunks } = bundle as unknown as IndexBundle;
  const maxPage = (chunks as Chunk[]).reduce((m, c) => Math.max(m, c.page), 0);

  return <Workbench maxPage={maxPage} />;
}