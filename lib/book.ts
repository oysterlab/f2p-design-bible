import {
  bookMetadata,
  chapters,
  epilogue,
  partDefinitions,
  prologue,
  sourceNotes,
} from "./content";
import type { ReaderPage, SourceNote, TextBlock } from "./book-types";

const chapterMap = new Map(chapters.map((chapter) => [chapter.id, chapter]));

const blockWeight = (block: TextBlock) => {
  switch (block.type) {
    case "paragraph":
      return block.text.length;
    case "subheading":
      return block.text.length + 145;
    case "quote":
      return block.text.length + 220;
    case "list":
      return block.items.join("").length + 185;
    case "table":
      return [...block.headers, ...block.rows.flat()].join("").length + 300;
    case "callout":
      return block.label.length + block.text.length + 210;
    case "formula":
      return block.code.length + 165;
    case "image":
      // Figures flow with the text. The constant approximates the vertical space
      // a contained image plus its caption takes on an A5 page.
      return (block.caption?.length ?? 0) + 620;
    case "visual":
      return Number.POSITIVE_INFINITY;
  }
};

// The value is intentionally conservative for A5 print and 120% reader text.
// A page containing an oversized block remains a single page and is surfaced
// by browser/print QA instead of silently splitting the block.
const MAX_PAGE_WEIGHT = 1630;

function paginateBlocks(
  blocks: TextBlock[],
  prefix: string,
  context: Partial<ReaderPage>,
) {
  const pages: ReaderPage[] = [];
  let current: TextBlock[] = [];
  let weight = 0;
  let index = 1;

  const flush = () => {
    if (!current.length) return;
    pages.push({
      id: `${prefix}-page-${index}`,
      kind: "reading",
      blocks: current,
      ...context,
    });
    current = [];
    weight = 0;
    index += 1;
  };

  for (const block of blocks) {
    if (block.type === "visual") {
      flush();
      pages.push({
        id: `${prefix}-visual-${index}`,
        kind: "visual",
        blocks: [block],
        ...context,
      });
      index += 1;
      continue;
    }

    const nextWeight = blockWeight(block);
    if (current.length && weight + nextWeight > MAX_PAGE_WEIGHT) flush();
    current.push(block);
    weight += nextWeight;
  }

  flush();
  return pages;
}

const pages: ReaderPage[] = [
  {
    id: "cover",
    kind: "cover",
    eyebrow: bookMetadata.coverEyebrow,
    title: bookMetadata.title,
    deck: bookMetadata.subtitle,
    image: bookMetadata.coverImage,
    imageAlt: bookMetadata.coverImageAlt,
  },
  {
    id: "thesis",
    kind: "colophon",
    eyebrow: "이 책의 기준",
    title: bookMetadata.thesisTitle,
    deck: bookMetadata.thesisDeck,
  },
  {
    id: "method-note",
    kind: "colophon",
    eyebrow: "사실 확인 원칙",
    title: bookMetadata.methodTitle,
    deck: bookMetadata.methodDeck,
  },
  {
    id: "format-note",
    kind: "colophon",
    eyebrow: "각 장의 구성",
    title: "정의, 입력값, 처리 규칙, 상태 변경과 지표의 순서로 설명한다.",
    deck:
      "게임 규칙을 나열하는 데서 끝내지 않는다. 사용자가 보는 선택지, 조정 가능한 수치, 예상 행동, 확인할 지표와 잘못 설계했을 때의 결과를 함께 기록한다.",
  },
];

for (let index = 0; index < partDefinitions.length; index += 2) {
  const group = partDefinitions.slice(index, index + 2);
  pages.push({
    id: `contents-${index / 2 + 1}`,
    kind: "contents",
    eyebrow: index === 0 ? "차례" : "차례 계속",
    title: group.map((part) => `${part.number}부 ${part.title}`).join(" / "),
    blocks: group.map((part) => ({
      type: "callout" as const,
      label: `${part.number}부 · ${part.title}`,
      text: part.chapterIds
        .map((id) => {
          const number = chapterMap.get(id)?.number ?? chapters.findIndex((chapter) => chapter.id === id) + 1;
          return `${number}. ${chapterMap.get(id)?.title ?? id}`;
        })
        .join(" / "),
    })),
  });
}

pages.push({
  id: "prologue-title",
  kind: "chapter-title",
  eyebrow: "프롤로그",
  title: prologue.title,
  deck: prologue.deck,
});
pages.push(
  ...paginateBlocks(prologue.blocks, "prologue", {
    chapterId: "prologue",
    eyebrow: "프롤로그",
    title: prologue.title,
  }),
);

let chapterNumber = 1;
for (const part of partDefinitions) {
  pages.push({
    id: part.id,
    kind: "part",
    partId: part.id,
    partNumber: part.number,
    eyebrow: `${part.number}부`,
    title: part.title,
    deck: part.deck,
    image: part.image,
    imageAlt: part.image ? `${part.title}를 설명하는 편집 이미지` : undefined,
  });

  for (const chapterId of part.chapterIds) {
    const chapter = chapterMap.get(chapterId);
    if (!chapter) continue;

    const displayedChapterNumber = chapter.number ?? chapterNumber;
    pages.push({
      id: `${chapter.id}-title`,
      kind: "chapter-title",
      partId: part.id,
      partNumber: part.number,
      chapterId: chapter.id,
      chapterNumber: displayedChapterNumber,
      eyebrow: `${displayedChapterNumber}장`,
      title: chapter.title,
      deck: chapter.deck,
    });
    pages.push(
      ...paginateBlocks(chapter.blocks, chapter.id, {
        partId: part.id,
        partNumber: part.number,
        chapterId: chapter.id,
        chapterNumber: displayedChapterNumber,
        eyebrow: `${displayedChapterNumber}장`,
        title: chapter.title,
      }),
    );
    chapterNumber += 1;
  }
}

pages.push({
  id: "epilogue-title",
  kind: "chapter-title",
  eyebrow: "에필로그",
  title: epilogue.title,
  deck: epilogue.deck,
});
pages.push(
  ...paginateBlocks(epilogue.blocks, "epilogue", {
    chapterId: "epilogue",
    eyebrow: "에필로그",
    title: epilogue.title,
  }),
);

const sourceGroups: SourceNote[][] = [];
for (let index = 0; index < sourceNotes.length; index += 4) {
  sourceGroups.push(sourceNotes.slice(index, index + 4));
}

sourceGroups.forEach((notes, index) => {
  const first = notes[0]?.number ?? 1;
  pages.push({
    id: `sources-${index + 1}`,
    kind: "sources",
    eyebrow: "주석과 출처",
    title: `자료 ${first}-${notes.at(-1)?.number ?? first}`,
    sourceNotes: notes,
  });
});

pages.push({
  id: "end-colophon",
  kind: "colophon",
  eyebrow: bookMetadata.series,
  title: bookMetadata.title,
  deck: `${bookMetadata.edition} · ${bookMetadata.publicationDate}. 근거와 수치는 원문 링크와 분석 기준일을 함께 확인한다.`,
});

export const bookPages = pages;
export { bookMetadata, chapters, partDefinitions, sourceNotes };

const characterCount = [
  ...chapters.map((chapter) => chapter.blocks),
  prologue.blocks,
  epilogue.blocks,
]
  .flat()
  .reduce((total, block) => {
    if (block.type === "paragraph" || block.type === "quote") {
      return total + block.text.length;
    }
    if (block.type === "subheading") return total + block.text.length;
    if (block.type === "list") return total + block.items.join("").length;
    if (block.type === "table") {
      return total + [...block.headers, ...block.rows.flat()].join("").length;
    }
    if (block.type === "callout") {
      return total + block.label.length + block.text.length;
    }
    if (block.type === "formula") return total + block.code.length;
    return total;
  }, 0);

export const bookStats = {
  pageCount: bookPages.length,
  chapterCount: chapters.length,
  characterCount,
  sourceCount: sourceNotes.length,
};

const pageCeiling = bookMetadata.pageCeiling ?? 288;
if (bookStats.pageCount > pageCeiling) {
  throw new Error(
    `ebook page ceiling exceeded: ${bookStats.pageCount} pages (maximum ${pageCeiling})`,
  );
}
