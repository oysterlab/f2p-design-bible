// Builds the translation workbench from extracted/sources.json:
//   1. translated/_manifest.json — per-article metadata (title, byline, source URL,
//      resolved image paths) that the Korean files carry in their frontmatter.
//   2. <outDir>/<collection>/<slug>.md — clean English markdown, one file per
//      article, used as the reading copy while translating.
// Run: node scripts/prepare-translation.mjs [outDir]
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve, relative, join, posix } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");
const rawRoot = join(projectRoot, "raw");
const sourcesPath = join(projectRoot, "extracted/sources.json");
const manifestPath = join(projectRoot, "translated/_manifest.json");
const outDir = resolve(process.argv[2] ?? join(projectRoot, ".translation-src"));

const sources = JSON.parse(await readFile(sourcesPath, "utf8"));

const decodeEntities = (value) =>
  value
    .replace(/&nbsp;/g, " ")
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&hellip;|&#8230;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();

const meta = (html, attr, value) => {
  const patterns = [
    new RegExp(`<meta[^>]*${attr}="${value}"[^>]*content="([^"]*)"`, "i"),
    new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${attr}="${value}"`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeEntities(match[1]);
  }
  return "";
};

// Site chrome collapsed to `|`-separated text so bylines can be read positionally.
const flatten = (html) => {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
  return decodeEntities(
    stripped
      .replace(/<[^>]+>/g, "|")
      .replace(/\|+/g, "|")
      .replace(/[ \t\n\r]+/g, " "),
  );
};

const MONTHS = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};
const isoDate = (year, month, day) =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

// Each source site exposes byline and canonical URL differently.
const readers = {
  bible(html, article) {
    // This mirror splits numbers into their own spans ("Chapter |5| of |15|"),
    // so the byline only reads back once the separators are dropped.
    const loose = flatten(html).replace(/\|/g, " ").replace(/\s+/g, " ");
    const byline = loose.match(/(\d{1,2}) ([A-Za-z]+) (\d{4}) · ([^·]+) · (\d+) min read/);
    const chapter = loose.match(/Chapter (\d+) of (\d+)/);
    const published = meta(html, "property", "article:published_time");
    return {
      url: meta(html, "property", "og:url") || `https://mobilefreetoplay.com/bible/${article.slug}/`,
      site: "mobilefreetoplay.com",
      author: meta(html, "property", "article:author") || byline?.[4]?.trim() || "Tom Kinniburgh",
      date: published ? published.slice(0, 10)
        : byline ? isoDate(byline[3], MONTHS[byline[2].slice(0, 3).toLowerCase()], byline[1])
        : "",
      dateLabel: "",
      readMinutes: byline ? Number(byline[5]) : null,
      order: chapter ? Number(chapter[1]) : null,
      summary: meta(html, "property", "og:description"),
    };
  },
  dof(html, article) {
    const flat = flatten(html);
    const date = article.file.match(/blog\/(\d{4})\/(\d{1,2})\/(\d{1,2})\//);
    return {
      url: meta(html, "property", "og:url"),
      site: "deconstructoroffun.com",
      author: meta(html, "itemprop", "author") || flat.match(/\|Written by ([^,|]+)/)?.[1]?.trim() || "",
      date: date ? isoDate(date[1], Number(date[2]), Number(date[3])) : "",
      dateLabel: "",
      readMinutes: null,
      order: null,
      summary: meta(html, "property", "og:description"),
    };
  },
  gameanalytics(html, article) {
    const flat = flatten(html);
    const byline = flat.match(/\|([^|]{2,60})\|Last updated: ([A-Za-z]{3})[a-z]* (\d{1,2}), (\d{4})\|/);
    return {
      url: `https://www.gameanalytics.com/blog/${article.slug}`,
      site: "gameanalytics.com",
      author: byline?.[1]?.trim() ?? "",
      date: byline ? isoDate(byline[4], MONTHS[byline[2].toLowerCase()], byline[3]) : "",
      dateLabel: byline ? `Last updated: ${byline[2]} ${byline[3]}, ${byline[4]}` : "",
      readMinutes: null,
      order: null,
      summary: meta(html, "name", "description"),
    };
  },
};

// og:title carries the site suffix on two of the three mirrors.
const cleanTitle = (title) =>
  decodeEntities(title)
    .replace(/\s+[—–-]\s+(GameAnalytics|Mobile Free To Play|Deconstructor of Fun)\s*$/i, "")
    .trim();

// Image srcs are relative to their own HTML file; re-anchor them at the repo root
// so a translated file can point at the archived asset. Absolute CDN URLs still
// have a local copy under <mirror>/<host>/<path>, so prefer that over the network.
const repoPathOf = (absolute) =>
  posix.join("raw", relative(rawRoot, absolute).split(/[\\/]/).join("/"));

const resolveImage = (src, articleFile) => {
  if (/^https?:/i.test(src)) {
    const url = new URL(src);
    const mirrorRoot = articleFile.split("/")[0];
    // Squarespace percent-encodes "+" in the URL; the mirrored file keeps it literal.
    const mirrored = join(rawRoot, mirrorRoot, url.host, decodeURIComponent(url.pathname));
    for (const candidate of [`${mirrored}${url.search}`, mirrored]) {
      if (existsSync(candidate)) {
        return { path: repoPathOf(candidate), exists: true, external: false };
      }
    }
    return { path: src, exists: true, external: true };
  }
  const absolute = resolve(join(rawRoot, dirname(articleFile)), decodeURIComponent(src));
  return { path: repoPathOf(absolute), exists: existsSync(absolute), external: false };
};

const collectionDirs = {
  bible: "bible",
  dof: "deconstructor-of-fun",
  gameanalytics: "gameanalytics",
};

const manifest = { generatedFrom: "extracted/sources.json", collections: {} };
let totalMissing = 0;

for (const [id, articles] of Object.entries(sources)) {
  const entries = [];

  for (const article of articles) {
    const html = await readFile(join(rawRoot, article.file), "utf8");
    const info = readers[id](html, article);
    const title = cleanTitle(article.title);

    const images = article.blocks
      .filter((block) => block.type === "image")
      .map((block, index) => {
        const resolved = resolveImage(block.src, article.file);
        if (!resolved.exists) totalMissing += 1;
        return {
          index: index + 1,
          alt: block.alt,
          path: resolved.path,
          external: resolved.external === true,
          missing: !resolved.exists,
        };
      });

    entries.push({
      slug: article.slug,
      titleEn: title,
      file: `${collectionDirs[id]}/${article.slug}.md`,
      source: article.file,
      words: article.words,
      images,
      ...info,
      summary: cleanTitle(info.summary),
    });

    // Reading copy: block types become markdown so structure survives the round trip.
    let imageIndex = 0;
    const body = article.blocks
      .map((block) => {
        if (block.type === "image") {
          const image = images[imageIndex];
          imageIndex += 1;
          // Pre-formed so the translated file can carry the line across verbatim;
          // translated/<dir>/<slug>.md sits two levels under the repo root.
          const href = image.external ? image.path : `../../${image.path}`;
          return `![${image.alt}](${href})`;
        }
        if (block.type === "heading") return `${"#".repeat(block.level)} ${block.text}`;
        if (block.type === "listItem") return `- ${block.text}`;
        if (block.type === "quote") return `> ${block.text}`;
        if (block.type === "caption") return `_caption:_ ${block.text}`;
        return block.text;
      })
      .join("\n\n");

    const header = [
      `<!-- ${title}`,
      `     ${info.url}`,
      `     ${[info.author, info.date].filter(Boolean).join(" · ")}`,
      `     ${article.words} words · ${images.length} images -->`,
    ].join("\n");

    const outPath = join(outDir, collectionDirs[id], `${article.slug}.md`);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, `${header}\n\n${body}\n`, "utf8");
  }

  entries.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.slug.localeCompare(b.slug));
  manifest.collections[id] = { dir: collectionDirs[id], articles: entries };
  const missing = entries.reduce(
    (sum, entry) => sum + entry.images.filter((image) => image.missing).length,
    0,
  );
  const unknown = entries.filter((entry) => !entry.author || !entry.date).length;
  console.log(
    `${id.padEnd(14)} ${String(entries.length).padStart(3)} articles  ` +
      `${String(missing).padStart(3)} missing images  ${unknown} incomplete bylines`,
  );
}

await mkdir(dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`\nReading copies → ${outDir}`);
console.log(`Manifest       → ${manifestPath}  (${totalMissing} unresolved image paths)`);
