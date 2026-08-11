// Downscales staged manuscript images to a print/web-sensible width.
// Animated GIFs are left untouched: `sips` would flatten them to one frame.
import { readdir, stat } from "node:fs/promises";
import { execFile } from "node:child_process";
import { join, resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const here = dirname(fileURLToPath(import.meta.url));
const roots = ["bible", "dof", "gameanalytics"].map((name) =>
  resolve(here, "../public/images", name),
);
const MAX_WIDTH = 1400;

async function walk(directory) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(full)));
    else found.push(full);
  }
  return found;
}

let resized = 0;
let skipped = 0;
let before = 0;
let after = 0;

for (const root of roots) {
  for (const file of await walk(root)) {
    before += (await stat(file)).size;
    if (extname(file).toLowerCase() === ".gif") {
      after += (await stat(file)).size;
      continue;
    }
    try {
      const { stdout } = await run("sips", ["-g", "pixelWidth", file]);
      const width = Number(stdout.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0);
      if (width > MAX_WIDTH) {
        await run("sips", ["-Z", String(MAX_WIDTH), file, "--out", file]);
        resized += 1;
      }
    } catch {
      // Some files carry a mismatched extension (WebP named .png). sips can read
      // but not rewrite those; leaving them at source resolution is harmless.
      skipped += 1;
    }
    after += (await stat(file)).size;
  }
}

const mb = (value) => `${(value / 1024 / 1024).toFixed(1)}M`;
console.log(`resized ${resized} images, skipped ${skipped} · ${mb(before)} -> ${mb(after)}`);
