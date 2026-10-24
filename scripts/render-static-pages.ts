import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { SHELVES } from "../src/lib/shelf";

const ROOT = process.cwd();
const STATIC_ROOT = join(ROOT, "public", "pages");
const WIDTH = 760;

const PDFTOCAIRO = "/opt/homebrew/bin/pdftocairo";
const MAGICK = "/opt/homebrew/bin/magick";

let rendered = 0;
let skipped = 0;

for (const [domain, volumes] of Object.entries(SHELVES)) {
  const dir = join(STATIC_ROOT, domain);
  mkdirSync(dir, { recursive: true });
  for (const volume of volumes) {
    const pdfPath = join(ROOT, volume.pdf);
    if (!existsSync(pdfPath)) {
      console.error(`MISSING PDF: ${volume.pdf}`);
      continue;
    }
    for (let page = volume.from; page <= volume.to; page++) {
      const local = page - volume.from + 1;
      const out = join(dir, `${page}-${WIDTH}.webp`);
      if (existsSync(out)) { skipped++; continue; }
      const tmp = `/tmp/sp-${domain}-${page}-${WIDTH}`;
      const cairo = spawnSync(PDFTOCAIRO, ["-f", String(local), "-l", String(local), "-jpeg", "-singlefile", "-scale-to", String(WIDTH), pdfPath, tmp]);
      if (cairo.status !== 0) { console.error(`cairo fail ${domain}/${page}`); continue; }
      const conv = spawnSync(MAGICK, [`${tmp}.jpg`, "-quality", "76", out]);
      if (conv.status !== 0) { console.error(`magick fail ${domain}/${page}`); continue; }
      rendered++;
    }
    console.log(`${domain}/${volume.id}: done (page ${volume.from}-${volume.to})`);
  }
}
console.log(`rendered: ${rendered}, already present: ${skipped}`);
