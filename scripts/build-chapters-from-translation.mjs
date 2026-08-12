// Assembles content/chapters/*.md from two sources that stay separately editable:
//   translated/<collection>/<slug>.md   the faithful Korean translation (본문)
//   content/commentary/<collection>-<slug>.md  deck + 해석 + 사례 + 적용 체크리스트
// Images are re-pointed at the staged, compressed copies under public/images/.
// Run: node scripts/build-chapters-from-translation.mjs
import { readFile, writeFile, readdir, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");
const translatedRoot = join(projectRoot, "translated");
const commentaryRoot = join(projectRoot, "content/commentary");
const chapterRoot = join(projectRoot, "content/chapters");
const imageRoot = join(projectRoot, "public/images");

const manifest = JSON.parse(await readFile(join(translatedRoot, "_manifest.json"), "utf8"));

// Book structure. Every slug listed here becomes one chapter, numbered in order.
const PARTS = [
  {
    file: "01-part1-bible.md",
    number: 1,
    title: "F2P 바이블",
    deck: "Core Loop에서 시작해 세션, Retention, 경제, Gacha, 수익화, 광고, 마케팅, 라이브 운영까지 F2P를 구성하는 시스템을 의존 순서대로 쌓아 올린다.",
    collection: "bible",
    slugs: null, // null = the collection's own chapter order
  },
  {
    file: "02-part2-hybridcasual.md",
    number: 2,
    title: "하이브리드캐주얼",
    deck: "하이퍼캐주얼 이후의 지배적 모델이 된 하이브리드캐주얼을, 그것을 정의한 퍼블리셔의 포트폴리오 데이터로 확인한다.",
    collection: "dof",
    slugs: null,
  },
  {
    file: "03-part3-deconstruction.md",
    number: 3,
    title: "시스템 해체분석",
    deck: "상위 매출 게임의 Core Loop와 메타, 경제, 수익화를 하나씩 뜯어 같은 언어로 비교한다.",
    collection: "gameanalytics",
    slugs: [
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
      "vainglory-doesnt-make-one-will",
      "zelda-tears-of-the-kingdom-review",
    ],
  },
  {
    file: "04-part4-production.md",
    number: 4,
    title: "제작과 퍼블리싱",
    deck: "프로토타입에서 출시까지의 이터레이션 순서, 퍼블리싱 계약과 스튜디오 운영을 만든 사람들의 말로 확인한다.",
    collection: "gameanalytics",
    slugs: [
      "prototype-phases-for-hit-casual-game-purple-diver-voodoo",
      "key-lessons-from-developing-roller-splat-voodoo-neon-play",
      "how-noor-games-reached-a-d1-retention-of-62-with-the-game-lumbercraft",
      "reaching-2-million-dau-interview-frvr",
      "html5-games-viral-potential",
      "publishing-pro-gamefam-roblox",
      "beasts-of-burden",
      "claws-of-furry-rezzed-interview-2",
      "lifeline-3-minute-games-interview",
      "disco-elysium-rezzed-2018-interview",
      "cloudhead-games-advice-jumping-to-vr",
      "interview-ric-cowley-pocketgamer",
    ],
  },
  {
    file: "05-part5-design.md",
    number: 5,
    title: "디자인과 플랫폼",
    deck: "아트 스타일과 게이미피케이션, 플랫폼 이식과 장르 실험이 시스템 설계와 만나는 지점을 살핀다.",
    collection: "gameanalytics",
    slugs: [
      "incredible-game-design-examples",
      "top-gamification-app-examples",
      "adapting-games-for-mobile",
      "five-mobile-games-that-nailed-shifting-to-vr",
      "budget-games-top-the-charts-by-focusing-on-story",
      "10-best-digital-board-games",
      "5-indie-games-released-november",
      "everything-we-know-about-sugartown",
    ],
  },
];

const frontmatterOf = (text) => {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return { fields: {}, body: text };
  const fields = {};
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^([a-z_]+):\s*(.*)$/);
    if (pair) fields[pair[1]] = pair[2].replace(/^["']|["']$/g, "").trim();
  }
  return { fields, body: text.slice(match[0].length) };
};

// Staged filenames carry their post-compression extension, so read them off
// disk rather than trusting the pre-compression map.
const stagedImages = async (collection, slug) => {
  const directory = join(imageRoot, collection, slug);
  if (!existsSync(directory)) return [];
  return (await readdir(directory))
    .filter((name) => /^\d{2}\./.test(name))
    .sort()
    .map((name) => `images/${collection}/${slug}/${name}`);
};

const escapeQuotes = (value) => value.replace(/"/g, "'");

// Rewrites the translation into the manuscript dialect the book builder parses.
function renderOriginal(body, { images, title, noteId }) {
  const lines = body.split("\n");
  const out = [];
  let imageIndex = 0;
  let firstParagraphDone = false;

  for (let cursor = 0; cursor < lines.length; cursor += 1) {
    const line = lines[cursor].trim();
    if (!line) continue;

    // The chapter heading already carries the title; the trailing rule and
    // source line are replaced by a numbered footnote.
    if (/^#\s+[^#]/.test(line)) continue;
    if (line === "---") continue;
    if (/^원문:\s*\[/.test(line)) continue;

    const image = line.match(/^!\[([^\]]*)\]\([^)]+\)$/);
    if (image) {
      const src = images[imageIndex];
      imageIndex += 1;
      if (!src) continue;
      // A following _italic_ line is this figure's caption in the translation.
      let caption = "";
      const next = (lines[cursor + 1] ?? "").trim();
      const captionMatch = next.match(/^_(.+)_$/);
      if (captionMatch) {
        caption = captionMatch[1];
        cursor += 1;
      }
      const alt = image[1] || caption || `${title} 수록 이미지 ${imageIndex}`;
      out.push(
        caption
          ? `![${escapeQuotes(alt)}](${src} "${escapeQuotes(caption)}")`
          : `![${escapeQuotes(alt)}](${src})`,
      );
      continue;
    }

    // Keep the article's own section titles, one level below the chapter's.
    const heading = line.match(/^#{2,4}\s+(.*)$/);
    if (heading) {
      out.push(`### ${heading[1]}`);
      continue;
    }

    // Standalone links and bare URLs survive as callouts so the address stays
    // readable — the book renderer strips markdown link targets.
    const soloLink = line.match(/^\[([^\]]+)\]\((https?:[^)]+)\)$/);
    if (soloLink) {
      out.push(`> [callout:${soloLink[1]}] ${soloLink[2]}`);
      continue;
    }
    if (/^https?:\/\/\S+$/.test(line)) {
      out.push(`> [callout:영상] ${line}`);
      continue;
    }

    const caption = line.match(/^_(.+)_$/);
    if (caption) {
      out.push(caption[1]);
      continue;
    }

    if (!firstParagraphDone && !/^[->|#]/.test(line)) {
      out.push(`${line}[^${noteId}]`);
      firstParagraphDone = true;
      continue;
    }
    out.push(line);
  }
  return out.join("\n\n");
}

// content/chapters is entirely generated output, front and back matter included,
// so it is cleared first: a renamed or dropped part must not linger.
await mkdir(chapterRoot, { recursive: true });
for (const name of await readdir(chapterRoot)) {
  if (/^\d{2}-.+\.md$/.test(name)) await rm(join(chapterRoot, name));
}


// Resolve the running order once, up front, so commentary can cross-reference
// other chapters by slug ({{ch:some-slug}}) instead of a hand-written number
// that silently rots whenever the book is re-ordered.
const orderedArticles = new Map();
{
  let position = 0;
  for (const part of PARTS) {
    const articles = manifest.collections[part.collection].articles;
    const chosen = part.slugs
      ? part.slugs.map((slug) => {
          const found = articles.find((article) => article.slug === slug);
          if (!found) throw new Error(`${part.file}: unknown slug ${slug}`);
          return found;
        })
      : articles;
    for (const article of chosen) {
      position += 1;
      orderedArticles.set(article.slug, position);
    }
  }
}

const resolveReferences = (text, sourceFile) =>
  text.replace(/\{\{ch:([a-z0-9-]+)\}\}/g, (_, slug) => {
    const found = orderedArticles.get(slug);
    if (!found) throw new Error(`${sourceFile}: unknown chapter reference ${slug}`);
    return String(found);
  });

// Front and back matter are hand-written but carry the same {{ch:slug}} tokens.
for (const [source, target] of [
  ["_frontmatter.md", "00-frontmatter.md"],
  ["_backmatter.md", "99-backmatter.md"],
]) {
  const path = join(commentaryRoot, source);
  const text = await readFile(path, "utf8");
  await writeFile(join(chapterRoot, target), resolveReferences(text, path), "utf8");
}

const chapters = [];
let number = 0;
const missingCommentary = [];

for (const part of PARTS) {
  const articles = manifest.collections[part.collection].articles;
  const chosen = part.slugs
    ? part.slugs.map((slug) => {
        const found = articles.find((article) => article.slug === slug);
        if (!found) throw new Error(`${part.file}: unknown slug ${slug}`);
        return found;
      })
    : articles;

  const body = [`# 제${part.number}부. ${part.title}`, "", `> [deck] ${part.deck}`, ""];
  const notes = [];

  for (const article of chosen) {
    number += 1;
    const translated = await readFile(join(translatedRoot, article.file), "utf8");
    const { fields, body: koreanBody } = frontmatterOf(translated);

    const commentaryPath = join(commentaryRoot, `${part.collection}-${article.slug}.md`);
    if (!existsSync(commentaryPath)) {
      missingCommentary.push(`${part.collection}-${article.slug}`);
      continue;
    }
    const commentaryRaw = await readFile(commentaryPath, "utf8");
    const { fields: commentaryFields, body: commentary } = frontmatterOf(commentaryRaw);

    const images = await stagedImages(part.collection, article.slug);
    const noteId = `src-${article.slug}`;
    const dateLabel = article.dateLabel ? `최종 수정 ${fields.published}` : fields.published;

    body.push(
      `# ${number}장. ${fields.title}`,
      "",
      `> [deck] ${resolveReferences(commentaryFields.deck ?? fields.title, commentaryPath)}`,
      "",
      "## 원문",
      "",
      renderOriginal(koreanBody, { images, title: fields.title, noteId }),
      "",
      resolveReferences(commentary.trim(), commentaryPath),
      "",
    );

    notes.push(
      `[^${noteId}]: ${fields.title_en} — ${article.author} · ${dateLabel} · ${fields.site}, [원문](${article.url})`,
    );

    chapters.push({ number, title: fields.title, part: part.number, images: images.length });
  }

  // A part with no finished commentary yet would fail the book builder, so it
  // simply does not get written until at least one of its chapters is ready.
  if (!notes.length) continue;
  body.push("## 출처", "", ...notes.map((note) => `${note}\n`));
  await mkdir(chapterRoot, { recursive: true });
  await writeFile(join(chapterRoot, part.file), `${body.join("\n")}\n`, "utf8");
}

if (missingCommentary.length) {
  console.log(`\n해설 원고 없음 (${missingCommentary.length}개):`);
  for (const slug of missingCommentary) console.log(`  content/commentary/${slug}.md`);
}

console.log(
  `\n${PARTS.length} parts, ${chapters.length}/${
    Object.values(manifest.collections).reduce((sum, c) => sum + c.articles.length, 0)
  } chapters, ${chapters.reduce((sum, c) => sum + c.images, 0)} images`,
);
