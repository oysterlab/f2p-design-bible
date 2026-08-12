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
  assert.match(html, /Golfclash — 판돈과 대기 시간의 경제학/);

  // Annotations are rendered as labelled callouts, distinct from body text.
  assert.match(html, /<aside class="reading-callout"><strong>주해 \(註解\)<\/strong>/);

  // Source images from all three mirrors are wired up.
  assert.match(html, /images\/bible\/improving-games-retention\//);
  assert.match(html, /images\/dof\/habbys-hybridcasual-empire/);
  assert.match(html, /images\/gameanalytics\/coin-master-social-casino\//);

  // No leftovers from the other manuscript in this repo.
  assert.doesNotMatch(html, /images\/tasty\//);
  assert.doesNotMatch(html, /Tasty Travels 시스템 분석/);

  const renderedPages = html.match(/data-reader-page/g) ?? [];
  assert.ok(renderedPages.length >= 300, `expected at least 300 pages, got ${renderedPages.length}`);
  assert.ok(renderedPages.length <= 560, `expected at most 560 pages, got ${renderedPages.length}`);
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
  assert.equal(generated.metadata.pageCeiling, 560);
  assert.equal(chapterFiles.length, 5);
  assert.equal(generated.parts.length, 3);
  assert.equal(generated.chapters.length, 31);
  assert.deepEqual(
    generated.chapters.map((chapter) => chapter.number),
    Array.from({ length: 31 }, (_, index) => index + 1),
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

  // Annotations must never be silently merged into the translated body.
  const callouts = generated.chapters
    .flatMap((chapter) => chapter.blocks)
    .filter((block) => block.type === "callout");
  assert.ok(callouts.length >= 30, `expected annotations on most chapters, got ${callouts.length}`);
  for (const callout of callouts) assert.equal(callout.label, "주해 (註解)");

  // Every chapter carries both the source's argument and the applied section.
  const missing = generated.chapters.filter((chapter) => {
    const headings = chapter.blocks
      .filter((block) => block.type === "subheading")
      .map((block) => block.text);
    return !headings.includes("원문의 논지") || !headings.includes("사례와 풀이");
  });
  assert.deepEqual(missing.map((chapter) => chapter.number), []);

  // Worked examples and comparison tables are what the applied sections add.
  const blocks = generated.chapters.flatMap((chapter) => chapter.blocks);
  assert.ok(blocks.filter((block) => block.type === "table").length >= 60);
  assert.ok(blocks.filter((block) => block.type === "formula").length >= 25);
});
