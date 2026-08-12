import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete F2P design bible", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]+lang="ko"/i);
  assert.match(html, /<title>모바일 F2P 게임 디자인 바이블<\/title>/i);

  // One chapter from each part.
  assert.match(html, /강한 Core Loop 만들기/);
  assert.match(html, /HABBY의 하이브리드캐주얼 제국/);
  assert.match(html, /UX 인사이트 — Golfclash의 성공을 만든 스윙/);
  assert.match(html, /히트 캐주얼 게임의 프로토타입 단계 — Purple Diver/);
  assert.match(html, /놀라운 게임 디자인 사례 7선/);

  // Every chapter leads with the translation, then the three commentary sections.
  assert.match(html, /원문<\/h3>/);
  assert.match(html, /해석<\/h3>/);
  assert.match(html, /사례<\/h3>/);
  assert.match(html, /적용 체크리스트<\/h3>/);

  // Source images from all three mirrors are wired up.
  assert.match(html, /images\/bible\/improving-games-retention\//);
  assert.match(html, /images\/dof\/habbys-hybridcasual-empire/);
  assert.match(html, /images\/gameanalytics\/coin-master-social-casino\//);

  // No leftovers from the other manuscript in this repo.
  assert.doesNotMatch(html, /images\/tasty\//);
  assert.doesNotMatch(html, /Tasty Travels 시스템 분석/);

  // Figures are inline in the reading flow, not pages of their own.
  assert.equal((html.match(/reading-figure/g) ?? []).length, 335);
  assert.doesNotMatch(html, /image-page/);

  const renderedPages = html.match(/data-reader-page/g) ?? [];
  assert.ok(renderedPages.length >= 300, `expected at least 300 pages, got ${renderedPages.length}`);
  assert.ok(renderedPages.length <= 640, `expected at most 640 pages, got ${renderedPages.length}`);
});

test("keeps the bible manuscript ordered and self-contained", async () => {
  const chapterFiles = (await readdir(new URL("../content/chapters/", import.meta.url)))
    .filter((name) => name.endsWith(".md"))
    .sort();
  const [generated, generator] = await Promise.all([
    readFile(new URL("../lib/generated-book.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../scripts/build-book-data.mjs", import.meta.url), "utf8"),
  ]);

  assert.equal(generated.metadata.book, "f2p-design-bible");
  assert.equal(generated.metadata.pageCeiling, 640);
  assert.equal(chapterFiles.length, 7);
  assert.equal(generated.parts.length, 5);
  assert.equal(generated.chapters.length, 49);
  assert.deepEqual(
    generated.chapters.map((chapter) => chapter.number),
    Array.from({ length: 49 }, (_, index) => index + 1),
  );
  assert.match(generator, /content\/chapters/);

  // Every image block must point at a file staged under public/images.
  const images = generated.chapters
    .flatMap((chapter) => chapter.blocks)
    .filter((block) => block.type === "image");
  // Images are placed where they explain something, not listed wholesale.
  assert.ok(images.length > 80, `expected illustrative images, got ${images.length}`);
  for (const image of images) {
    assert.match(image.src, /^images\/(bible|dof|gameanalytics)\//);
  }

  // Links the reader would otherwise strip survive as labelled callouts.
  const callouts = generated.chapters
    .flatMap((chapter) => chapter.blocks)
    .filter((block) => block.type === "callout");
  for (const callout of callouts) {
    assert.ok(callout.label.length > 0, "callouts must keep their label");
    assert.ok(callout.text.length > 0, "callouts must keep their text");
  }

  // Every chapter leads with the translation, then the three commentary sections.
  const missing = generated.chapters.filter((chapter) => {
    const headings = chapter.blocks
      .filter((block) => block.type === "subheading")
      .map((block) => block.text);
    return !["원문", "해석", "사례", "적용 체크리스트"].every((section) =>
      headings.includes(section),
    );
  });
  assert.deepEqual(missing.map((chapter) => chapter.number), []);

  // Comparison tables and worked formulas are what the commentary sections add
  // on top of the translation; the counts guard against them being dropped.
  const blocks = generated.chapters.flatMap((chapter) => chapter.blocks);
  assert.ok(blocks.filter((block) => block.type === "table").length >= 80);
  assert.ok(blocks.filter((block) => block.type === "formula").length >= 5);
  assert.ok(blocks.filter((block) => block.type === "image").length === 335);
});
