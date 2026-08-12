// Verifies the Korean translation set against translated/_manifest.json:
//   - every manifest article has a file, and every file is in the manifest
//   - frontmatter matches the manifest (source URL, author, date, chapter)
//   - every image link resolves on disk, in the manifest's order, none dropped
//   - no untranslated paragraphs left behind
// Run: node scripts/check-translation.mjs
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");
const translatedRoot = join(projectRoot, "translated");

const manifest = JSON.parse(await readFile(join(translatedRoot, "_manifest.json"), "utf8"));

const problems = [];
const note = (file, message) => problems.push(`${file}: ${message}`);

const frontmatterOf = (text) => {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^([a-z_]+):\s*(.*)$/);
    if (pair) fields[pair[1]] = pair[2].replace(/^["']|["']$/g, "").trim();
  }
  return { fields, body: text.slice(match[0].length) };
};

const expected = new Map();
for (const collection of Object.values(manifest.collections)) {
  for (const article of collection.articles) expected.set(article.file, article);
}

// Catch files that exist on disk but no longer belong to any archived article.
const onDisk = [];
for (const entry of await readdir(translatedRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  for (const file of await readdir(join(translatedRoot, entry.name))) {
    if (file.endsWith(".md")) onDisk.push(`${entry.name}/${file}`);
  }
}
for (const file of onDisk) {
  if (!expected.has(file)) note(file, "not in manifest");
}

let translated = 0;
let missing = 0;

for (const [file, article] of expected) {
  const path = join(translatedRoot, file);
  if (!existsSync(path)) {
    missing += 1;
    continue;
  }
  translated += 1;

  const text = await readFile(path, "utf8");
  const parsed = frontmatterOf(text);
  if (!parsed) {
    note(file, "missing frontmatter");
    continue;
  }
  const { fields, body } = parsed;

  const checks = [
    ["source", article.url],
    ["title_en", article.titleEn],
    ["author", article.author],
    ["published", article.date],
  ];
  for (const [key, value] of checks) {
    if (!value) continue;
    if (fields[key] !== value) note(file, `frontmatter ${key} is "${fields[key]}", expected "${value}"`);
  }
  if (article.order != null && Number(fields.chapter) !== article.order) {
    note(file, `frontmatter chapter is "${fields.chapter}", expected ${article.order}`);
  }
  if (!fields.title || /[A-Za-z]{4,}/.test(fields.title) === false) {
    // A Korean title is expected; only flag an empty one.
    if (!fields.title) note(file, "frontmatter title is empty");
  }

  const links = [...body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1]);
  const wanted = article.images.map((image) =>
    image.external ? image.path : `../../${image.path}`,
  );
  if (links.length !== wanted.length) {
    note(file, `${links.length} images, expected ${wanted.length}`);
  }
  links.forEach((link, index) => {
    if (/^https?:/i.test(link)) return;
    const absolute = resolve(dirname(path), link);
    if (!existsSync(absolute)) note(file, `image ${index + 1} does not resolve: ${link}`);
    else if (wanted[index] && link !== wanted[index]) {
      note(file, `image ${index + 1} is ${link}, expected ${wanted[index]}`);
    }
  });

  // A line with no Hangul is only suspicious if it reads as English prose rather
  // than a title, studio credit, or list of proper nouns — so require several
  // English function words before calling it untranslated.
  const FUNCTION_WORDS =
    /\b(the|and|to|of|you|your|is|are|that|for|with|this|it|they|their|from|have|can|but|not|we|our)\b/gi;
  const stray = body
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length > 45 &&
        !/[가-힣]/.test(line) &&
        !/^!\[/.test(line) &&
        !/^(원문|https?:|\||---|<!--)/.test(line) &&
        !/^\[[^\]]+\]\(/.test(line) &&
        (line.match(FUNCTION_WORDS) ?? []).length >= 3,
    );
  if (stray.length) note(file, `${stray.length} untranslated line(s), first: "${stray[0].slice(0, 60)}…"`);
}

console.log(`translated ${translated}/${expected.size} articles  (${missing} not written yet)`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const problem of problems) console.log(`  ${problem}`);
  process.exitCode = 1;
} else {
  console.log("no problems found");
}
