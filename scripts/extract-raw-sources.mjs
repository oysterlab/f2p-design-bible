// Extracts article text + image references from the mirrored HTML in ebook/raw/
// into a normalized JSON manifest used as the translation source of truth.
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const rawRoot = resolve(here, "../raw");
const outputPath = resolve(here, "../extracted/sources.json");

const decode = (value) =>
  value
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&hellip;|&#8230;/g, "…")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

// Pull the main article container, falling back to <body> when absent.
const bodyOf = (html, selectors) => {
  for (const re of selectors) {
    const match = html.match(re);
    if (match) return match[1];
  }
  return html;
};

// Walk block-level tags in document order so headings/paragraphs/images/lists interleave correctly.
function blocksFrom(section) {
  const blocks = [];
  const pattern =
    /<(h2|h3|h4|p|li|blockquote|img|figcaption)\b([^>]*)>([\s\S]*?)<\/\1>|<img\b([^>]*)\/?>/gi;
  let match;
  while ((match = pattern.exec(section))) {
    const tag = (match[1] || "img").toLowerCase();
    const attrs = match[2] || match[4] || "";
    const inner = match[3] || "";

    if (tag === "img") {
      const src =
        attrs.match(/\bdata-src="([^"]+)"/i)?.[1] ?? attrs.match(/\bsrc="([^"]+)"/i)?.[1] ?? "";
      const alt = decode(attrs.match(/\balt="([^"]*)"/i)?.[1] ?? "");
      if (src && !/^data:/.test(src)) blocks.push({ type: "image", src, alt });
      continue;
    }

    const text = decode(inner);
    if (!text || text.length < 2) continue;
    if (/^(h2|h3|h4)$/.test(tag)) blocks.push({ type: "heading", level: Number(tag[1]), text });
    else if (tag === "li") blocks.push({ type: "listItem", text });
    else if (tag === "blockquote") blocks.push({ type: "quote", text });
    else if (tag === "figcaption") blocks.push({ type: "caption", text });
    else blocks.push({ type: "paragraph", text });
  }
  return blocks;
}

const titleOf = (html) =>
  decode(
    html.match(/<meta property="og:title" content="([^"]+)"/i)?.[1] ??
      html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ??
      html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ??
      "",
  );

async function walk(directory) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(full)));
    else if (entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

// Each mirrored page wraps the article in site chrome (breadcrumbs, chapter
// index, "related reading" cards, footer). `start`/`end` cut the body out of it
// so only the author's own blocks and images survive into the manuscript.
const collections = [
  {
    id: "bible",
    root: join(rawRoot, "mobilefreetoplay-bible/mobilefreetoplay.com/bible"),
    selectors: [/<article[^>]*>([\s\S]*?)<\/article>/i, /<main[^>]*>([\s\S]*?)<\/main>/i],
    skip: (path) => /bible\/index\.html$/.test(path),
    start: (block) => block.type === "paragraph" && /^Chapter \d+ of \d+$/.test(block.text),
    end: (block) => block.type === "listItem" && /^01Getting Started in Mobile/.test(block.text),
    drop: (block) => block.type !== "image" && /^["'}\s>]*$/.test(block.text ?? ""),
  },
  {
    id: "dof",
    root: join(rawRoot, "deconstructoroffun-habby"),
    selectors: [
      /<div class="sqs-block-content">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/i,
      /<main[^>]*>([\s\S]*?)<\/main>/i,
    ],
    skip: () => false,
    start: null,
    end: (block) =>
      block.type === "paragraph" && /^Here’s something extra you might enjoy/.test(block.text),
    drop: () => false,
  },
  {
    id: "gameanalytics",
    root: join(rawRoot, "gameanalytics-deconstructions"),
    selectors: [/<article[^>]*>([\s\S]*?)<\/article>/i, /<main[^>]*>([\s\S]*?)<\/main>/i],
    skip: (path) => /game-deconstructions\.html$/.test(path),
    start: (block) => block.type === "paragraph" && /^min read$/.test(block.text),
    end: (block) => block.type === "heading" && /^Other posts you might like$/i.test(block.text),
    // Site-wide furniture (logos, badges, author avatars) lives in a different
    // asset bucket than the blog images.
    drop: (block) => block.type === "image" && /671f96478ccdbf0c35cccb78/.test(block.src),
  },
];

function trimToBody(blocks, collection) {
  let body = blocks;
  if (collection.start) {
    const index = body.findIndex(collection.start);
    if (index >= 0) body = body.slice(index + 1);
  }
  if (collection.end) {
    const index = body.findIndex(collection.end);
    if (index >= 0) body = body.slice(0, index);
  }
  return body.filter((block) => !collection.drop(block));
}

const output = {};
for (const collection of collections) {
  const files = (await walk(collection.root)).filter((path) => !collection.skip(path));
  const articles = [];
  for (const file of files.sort()) {
    const html = await readFile(file, "utf8");
    const section = bodyOf(html, collection.selectors);
    const blocks = trimToBody(blocksFrom(section), collection);
    const words = blocks
      .filter((block) => block.type !== "image")
      .reduce((total, block) => total + block.text.split(/\s+/).length, 0);
    articles.push({
      file: file.replace(`${rawRoot}/`, ""),
      slug: file.split("/").pop().replace(/(index)?\.html$/, "").replace(/\/$/, "") ||
        file.split("/").slice(-2)[0],
      title: titleOf(html),
      words,
      images: blocks.filter((block) => block.type === "image").length,
      blocks,
    });
  }
  output[collection.id] = articles;
  const totalWords = articles.reduce((sum, article) => sum + article.words, 0);
  const totalImages = articles.reduce((sum, article) => sum + article.images, 0);
  console.log(
    `${collection.id.padEnd(14)} ${String(articles.length).padStart(3)} articles  ${String(totalWords).padStart(7)} words  ${String(totalImages).padStart(4)} images`,
  );
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`\nWrote ${outputPath}`);
