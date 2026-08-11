// Copies the images referenced by the selected raw articles into public/images/<collection>/
// and writes an image map the manuscript authoring step reads.
import { copyFile, mkdir, readFile, writeFile, access } from "node:fs/promises";
import { dirname, resolve, join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const rawRoot = resolve(here, "../raw");
const publicRoot = resolve(here, "../public/images");
const sourcesPath = resolve(here, "../extracted/sources.json");
const mapPath = resolve(here, "../extracted/image-map.json");

const sources = JSON.parse(await readFile(sourcesPath, "utf8"));

// Chapter selection. Order here is the order chapters appear in the book.
const selection = {
  bible: null, // null = every article, ordered by the site's own chapter number
  dof: null,
  gameanalytics: [
    "coin-master-social-casino",
    "meta-features-social-casino-games",
    "crack-the-match-3-code-part-2",
    "three-things-mobile-game-developers-can-learn-candy-crush",
    "golfclash-swing-success",
    "how-tennis-clash-scored-a-golden-set",
    "blog-marvel-snap-marvel-contest-cod-mobile-mass-market-hit",
    "everything-you-can-learn-from-fall-guys-ultimate-knockdown",
    "how-stumble-guys-hit-225m-downloads",
    "pvp-modes-in-casual-games-disney-harry-potter-board-kings-love-nikki",
    "six-games-that-successfully-layer-in-meta-mechanics",
    "incredible-game-design-examples",
    "key-lessons-from-developing-roller-splat-voodoo-neon-play",
    "prototype-phases-for-hit-casual-game-purple-diver-voodoo",
    "how-noor-games-reached-a-d1-retention-of-62-with-the-game-lumbercraft",
  ],
};

const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

// Raw srcs are either relative to the HTML file that referenced them, or the
// original absolute CDN URL (lazy-loaded `data-src`). wget mirrored the latter
// under `<collection>/<host>/<path>` with percent-escapes already decoded.
const resolveRawImage = (articleFile, src) => {
  const cleaned = src.split("#")[0];
  if (/^https?:/.test(cleaned)) {
    const url = new URL(cleaned);
    const collectionRoot = articleFile.split("/")[0];
    const decoded = decodeURIComponent(url.pathname);
    return normalize(join(rawRoot, collectionRoot, url.host, decoded));
  }
  return normalize(resolve(rawRoot, dirname(articleFile), cleaned));
};

const slugOf = (article) => {
  const parts = article.file.split("/");
  const last = parts[parts.length - 1];
  return last === "index.html" ? parts[parts.length - 2] : last.replace(/\.html$/, "");
};

const imageMap = {};
let copied = 0;
let missing = 0;

for (const [collection, wanted] of Object.entries(selection)) {
  const all = sources[collection];
  const chosen = wanted
    ? wanted
        .map((slug) => all.find((article) => slugOf(article) === slug))
        .filter(Boolean)
    : all;

  if (wanted && chosen.length !== wanted.length) {
    const found = new Set(chosen.map(slugOf));
    for (const slug of wanted) if (!found.has(slug)) console.warn(`  ! no article for slug: ${slug}`);
  }

  for (const article of chosen) {
    const slug = slugOf(article);
    const targetDirectory = join(publicRoot, collection, slug);
    let index = 0;
    const entries = [];

    for (const block of article.blocks) {
      if (block.type !== "image") continue;
      const source = resolveRawImage(article.file, block.src);
      if (!source || !(await exists(source))) {
        missing += 1;
        continue;
      }
      index += 1;
      const extension = extname(source.split("?")[0]) || ".png";
      const name = `${String(index).padStart(2, "0")}${extension}`;
      await mkdir(targetDirectory, { recursive: true });
      await copyFile(source, join(targetDirectory, name));
      copied += 1;
      entries.push({ src: `images/${collection}/${slug}/${name}`, alt: block.alt, raw: block.src });
    }
    imageMap[`${collection}/${slug}`] = entries;
  }
  console.log(`${collection.padEnd(14)} ${chosen.length} articles staged`);
}

await mkdir(dirname(mapPath), { recursive: true });
await writeFile(mapPath, `${JSON.stringify(imageMap, null, 2)}\n`, "utf8");
console.log(`\ncopied ${copied} images, ${missing} unresolved -> ${mapPath}`);
