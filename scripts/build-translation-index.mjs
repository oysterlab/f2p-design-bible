// Writes translated/README.md from the Korean files' own frontmatter, so the
// index always matches what is actually on disk.
// Run: node scripts/build-translation-index.mjs
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const translatedRoot = resolve(here, "../translated");

const manifest = JSON.parse(await readFile(join(translatedRoot, "_manifest.json"), "utf8"));

const frontmatterOf = (text) => {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return {};
  const fields = {};
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^([a-z_]+):\s*(.*)$/);
    if (pair) fields[pair[1]] = pair[2].replace(/^["']|["']$/g, "").trim();
  }
  return fields;
};

const SECTIONS = [
  {
    id: "bible",
    heading: "제1부. The Bible — mobilefreetoplay.com",
    note: "Tom Kinniburgh가 쓴 15개 장. Core Loop에서 시작해 세션, Retention, 경제, Gacha, Monetization, 광고, 마케팅, 라이브 운영까지 순서대로 쌓아 올린다.",
    numbered: true,
  },
  {
    id: "dof",
    heading: "제2부. 하이브리드캐주얼 — deconstructoroffun.com",
    note: "HABBY의 하이브리드캐주얼 모델을 데이터로 해부한 글.",
    numbered: false,
  },
  {
    id: "gameanalytics",
    heading: "제3부. 해체분석과 인터뷰 — gameanalytics.com",
    note: "게임 해체분석, 개발사 인터뷰, 장르 분석 33편. 원문 슬러그 순으로 배열했다.",
    numbered: false,
  },
];

const rows = [];
let totalWords = 0;

for (const section of SECTIONS) {
  const collection = manifest.collections[section.id];
  const entries = [];
  for (const article of collection.articles) {
    const fields = frontmatterOf(await readFile(join(translatedRoot, article.file), "utf8"));
    totalWords += article.words;
    entries.push({
      order: article.order,
      title: fields.title ?? article.titleEn,
      titleEn: article.titleEn,
      file: article.file,
      author: article.author,
      words: article.words,
    });
  }
  rows.push({ section, entries });
}

const escapePipes = (value) => value.replace(/\|/g, "\\|");

const lines = [
  "# 한글 번역본",
  "",
  `아카이빙한 원문 ${
    Object.values(manifest.collections).reduce((sum, c) => sum + c.articles.length, 0)
  }편(영문 약 ${totalWords.toLocaleString("en-US")}단어)을 한국어로 옮긴 판본입니다.`,
  "",
  "## 번역 원칙",
  "",
  "- 직역하지 않고 한국어로 자연스럽게 읽히도록 옮겼습니다. 문체는 문어체 평서문으로 통일했습니다.",
  "- Core Loop, Retention, Monetization, LTV, CPI, Gacha, Live Ops, DAU, ARPPU처럼 업계에서 원어 그대로 쓰는 용어는 번역하지 않고 그대로 두었습니다.",
  "- 게임·회사·인물 이름과 인용된 지표는 원문 표기를 유지했습니다.",
  "- 문단과 소제목, 목록, 인용, 이미지의 위치와 순서는 원문 구조를 그대로 따릅니다.",
  "- 이미지는 `raw/` 아래 아카이빙된 원본 파일을 그대로 가리킵니다.",
  "- 각 문서 맨 아래에 원문 링크와 저자, 날짜, 출처 사이트를 밝혔습니다.",
  "",
  "## 파일 구성",
  "",
  "```",
  "translated/",
  "  _manifest.json   원문 메타데이터 (제목, 저자, 날짜, 원문 URL, 이미지 경로)",
  "  README.md        이 문서",
  "  bible/                  15편",
  "  deconstructor-of-fun/    1편",
  "  gameanalytics/          33편",
  "```",
  "",
  "## 검증",
  "",
  "```bash",
  "node scripts/prepare-translation.mjs    # 원문에서 메타데이터와 대조본 추출",
  "node scripts/check-translation.mjs      # 번역본 검증",
  "node scripts/build-translation-index.mjs # 이 문서 갱신",
  "```",
  "",
  "`check-translation.mjs`는 원문 대비 누락된 문서, 프론트매터 불일치, 이미지 링크 깨짐과 순서 어긋남, 번역이 빠진 문단을 검사합니다.",
  "",
];

for (const { section, entries } of rows) {
  lines.push(`## ${section.heading}`, "", section.note, "");
  lines.push(
    section.numbered ? "| 장 | 제목 | 원제 | 저자 |" : "| 제목 | 원제 | 저자 |",
    section.numbered ? "|---|---|---|---|" : "|---|---|---|",
  );
  for (const entry of entries) {
    const title = `[${escapePipes(entry.title)}](${entry.file})`;
    const cells = section.numbered
      ? [entry.order, title, escapePipes(entry.titleEn), entry.author]
      : [title, escapePipes(entry.titleEn), entry.author];
    lines.push(`| ${cells.join(" | ")} |`);
  }
  lines.push("");
}

await writeFile(join(translatedRoot, "README.md"), `${lines.join("\n")}`, "utf8");
console.log(`Wrote ${join(translatedRoot, "README.md")}`);
