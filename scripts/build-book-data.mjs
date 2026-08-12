import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

// Each book is an independent manuscript that renders through the same reader.
// `--book <id>` (or BOOK=<id>) selects one; the default keeps prior behaviour.
const books = {
  "f2p-design-bible": {
    contentDirectory: "../content/chapters",
    // 49 chapters. Figures flow inline with the text rather than taking a page
    // each, which is what keeps the book near six hundred pages.
    pageCeiling: 640,
    sitePath: "/f2p-design-bible/",
    metadata: {
      title: "모바일 F2P 게임 디자인 바이블",
      subtitle: "Mobile Free To Play · Deconstructor of Fun · GameAnalytics 번역 선집",
      description:
        "Mobile Free To Play의 F2P 바이블 15장, Deconstructor of Fun의 HABBY 분석, GameAnalytics의 글 33편을 전문 번역하고 해석과 사례, 적용 체크리스트를 붙인 한국어 웹 ebook.",
      series: "F2P READER 01",
      footer: "F2P DESIGN BIBLE",
      edition: "WEB EDITION 1.0",
      publicationDate: "2026년 8월",
      coverEyebrow: "MOBILE F2P DESIGN BIBLE",
      thesisTitle: "원문을 전문 그대로 싣고, 해석과 사례를 그 뒤에 붙인다.",
      thesisDeck:
        "각 장은 원문 번역으로 시작한다. 그 뒤에 해석과 실제 사례, 자기 게임에 대입할 적용 체크리스트를 덧붙여 원문의 주장을 입체적으로 읽게 한다.",
      methodTitle: "게임의 시스템을 코어, 경제, 측정의 축으로 읽는다.",
      methodDeck:
        "ACTION과 REWARD와 PROGRESS를 먼저 나누고, 각 재화의 획득처와 소비처를 적고, 그 설계가 의도한 결과를 냈는지 확인할 지표를 정한다.",
      // No cover artwork: the reader renders its generated gradient field instead.
      navBadge: "F2P DESIGN BIBLE",
    },
    prologue: {
      title: "이 책이 다루는 시스템",
      deck: "Core Loop에서 라이브 운영까지, F2P를 구성하는 시스템과 그것을 읽는 세 가지 축을 정리한다.",
    },
    epilogue: {
      title: "시스템 점검표와 출처",
      deck: "49개 장에서 반복해서 돌아온 판단 기준을 설계 점검표로 모은다.",
    },
  },
};
const requestedBook =
  process.argv.find((argument) => argument.startsWith("--book="))?.split("=")[1] ??
  process.env.BOOK ??
  "f2p-design-bible";
const bookConfig = books[requestedBook];
if (!bookConfig) {
  throw new Error(
    `알 수 없는 book id: ${requestedBook} (사용 가능: ${Object.keys(books).join(", ")})`,
  );
}

const chapterDirectory = resolve(here, bookConfig.contentDirectory);
const outputPath = resolve(here, "../lib/generated-book.json");
const chapterFiles = (await readdir(chapterDirectory))
  .filter((name) => /^\d{2}-.+\.md$/i.test(name))
  .sort((left, right) => left.localeCompare(right, "ko", { numeric: true }));

if (!chapterFiles.length) throw new Error("content/chapters에 원고 파일이 없습니다.");

const documents = await Promise.all(
  chapterFiles.map(async (name) => ({
    name,
    source: await readFile(resolve(chapterDirectory, name), "utf8"),
  })),
);
const joinedSource = documents.map(({ source }) => source).join("\n\n");

const footnoteIds = [];
for (const match of joinedSource.matchAll(/^\[\^([^\]]+)\]:\s*(.*)$/gm)) {
  if (!footnoteIds.includes(match[1])) footnoteIds.push(match[1]);
}
const footnoteNumber = new Map(footnoteIds.map((id, index) => [id, index + 1]));

const cleanInline = (value) =>
  value
    .replace(/\[\^([^\]]+)\]/g, (_, id) =>
      footnoteNumber.has(id) ? `〔${footnoteNumber.get(id)}〕` : "",
    )
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .trim();

const parseCells = (line) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map(cleanInline);

const metadata = {
  ...bookConfig.metadata,
  book: requestedBook,
  pageCeiling: bookConfig.pageCeiling,
  sitePath: bookConfig.sitePath,
};
const firstLines = documents[0].source.split(/\r?\n/);
const titleLine = firstLines.find((line) => /^#\s+[^#]/.test(line.trim()));
const subtitleLine = firstLines.find((line) => /^##\s+/.test(line.trim()));
if (titleLine) metadata.title = cleanInline(titleLine.replace(/^#\s+/, ""));
if (subtitleLine) metadata.subtitle = cleanInline(subtitleLine.replace(/^##\s+/, ""));

const visualKeyFor = (description) => {
  const text = description.toLowerCase();
  if (/음료.*계보|merge 계보/.test(text)) return "tasty-merge-chain";
  if (/첫 주문|실제 시작 상태/.test(text)) return "tasty-first-order";
  if (/tasty travels 전체 시스템/.test(text)) return "tasty-system-map";
  if (/에너지.*회복 그래프|energy 회복 그래프/.test(text)) return "energy-curve";
  if (/에너지 부족|에너지 획득 경로|세션 종료 선택/.test(text)) return "energy-options";
  if (/보상형 광고 상태/.test(text)) return "ad-state";
  if (/결제와 지급/.test(text)) return "purchase-flow";
  if (/프리미엄 재화|다중 재화 교환/.test(text)) return "currency-network";
  if (/상품 비교|상품 노출/.test(text)) return "offer-matrix";
  if (/자연 회복.*에너지 잔액|주문 제출.*머지 코인/.test(text)) return "tasty-economy";
  if (/source\/sink|획득처와 소비처|경제.*흐름|재화 공급·소비 원장/.test(text)) return "source-sink";
  if (/14일 balance|balance 그래프/.test(text)) return "balance-curve";
  if (/가중 확률|누적 성공률|관측 분포|800.*100/.test(text)) return "probability";
  if (/7×9|보드와 복구|보드 재구성/.test(text)) return "board-space";
  if (/기본 게임과 이벤트|이벤트 상태|event.*상태/.test(text)) return "event-separation";
  if (/수집 상태/.test(text)) return "collection-state";
  if (/과제 완료 가능성|백분위/.test(text)) return "completion-distribution";
  if (/주문 파이프라인|생성 주문/.test(text)) return "order-pipeline";
  if (/기능 해금|의존 관계/.test(text)) return "unlock-graph";
  if (/meta progression 유형/.test(text)) return "progression-types";
  if (/종료와 재개|저장.*복원/.test(text)) return "resume-state";
  if (/merge 한 번|주문 완료 상태|처리 순서/.test(text)) return "transaction-timeline";
  if (/시간 범위별|loop/.test(text)) return "loop-horizons";
  if (/네 게임 상태 비교|core·session·meta 비교/.test(text)) return "game-state-comparison";
  if (/퍼널|funnel|f2p 지표 구조/.test(text)) return "analytics-funnel";
  if (/한 이벤트의 구성|요청 id/.test(text)) return "analytics-map";
  if (/remote config|원격 설정|롤아웃/.test(text)) return "remote-config";
  if (/a\/b|실험/.test(text)) return "experiment";
  if (/cohort|코호트|retention 곡선/.test(text)) return "cohort";
  if (/이벤트 로그|분석 이벤트|analytics/.test(text)) return "analytics-map";
  if (/증거|확인 수준/.test(text)) return "evidence-levels";
  if (/f2p 시스템 연결|시스템 연결도|실습 프로젝트|구조도/.test(text)) return "system-map";
  return "system-map";
};

const parts = [];
const chapters = [];
const sources = [];
const prologue = { ...bookConfig.prologue, blocks: [] };
const epilogue = { ...bookConfig.epilogue, blocks: [] };

let activePart = null;
let activeSection = null;
let currentFile = "";
let paragraph = [];
let list = [];
let listOrdered = false;

const flushParagraph = () => {
  if (!paragraph.length) return;
  const text = cleanInline(paragraph.join(" "));
  paragraph = [];
  if (!text) return;
  if (activeSection) {
    activeSection.blocks.push({ type: "paragraph", text });
    return;
  }
  if (activePart && !activePart.deck) activePart.deck = text;
};

const flushList = () => {
  if (!list.length) return;
  if (activeSection) {
    activeSection.blocks.push({ type: "list", items: list.map(cleanInline), ordered: listOrdered });
  }
  list = [];
  listOrdered = false;
};

const flush = () => {
  flushParagraph();
  flushList();
};

for (const document of documents) {
  currentFile = document.name;
  const lines = document.source.split(/\r?\n/);
  const isFrontmatter = currentFile.startsWith("00-");
  const isBackmatter = currentFile.startsWith("99-");
  if (isFrontmatter) {
    activePart = null;
    activeSection = prologue;
  }
  if (isBackmatter) {
    flush();
    activePart = null;
    activeSection = epilogue;
  }

  for (let cursor = 0; cursor < lines.length; cursor += 1) {
    const raw = lines[cursor];
    const line = raw.trim();

    const footnote = line.match(/^\[\^([^\]]+)\]:\s*(.*)$/);
    if (footnote) {
      flush();
      const number = footnoteNumber.get(footnote[1]);
      if (!number || sources.some((source) => source.number === number)) continue;
      const links = [...footnote[2].matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(
        ([, label, url]) => ({ label: cleanInline(label), url }),
      );
      sources.push({ number, text: cleanInline(footnote[2]), links });
      continue;
    }

    if (!line || line === "---") {
      flush();
      continue;
    }

    if (/^```/.test(line)) {
      flush();
      const language = line.replace(/^```/, "").trim() || "text";
      const code = [];
      cursor += 1;
      while (cursor < lines.length && !/^```/.test(lines[cursor].trim())) {
        code.push(lines[cursor]);
        cursor += 1;
      }
      if (activeSection) {
        activeSection.blocks.push({ type: "formula", code: code.join("\n").trim(), language });
      }
      continue;
    }

    if (isFrontmatter && /^#\s+/.test(line)) {
      flush();
      if (/^##\s+/.test(line) && !line.includes(metadata.subtitle)) {
        activeSection.blocks.push({ type: "subheading", text: cleanInline(line.replace(/^##\s+/, "")) });
      }
      continue;
    }

    if (isBackmatter && /^#\s+/.test(line)) {
      flush();
      const text = cleanInline(line.replace(/^#\s+/, ""));
      if (!/^부록\.\s*설계 문서와 용어$/.test(text)) {
        activeSection.blocks.push({ type: "subheading", text });
      }
      continue;
    }

    const partMatch = line.match(/^#\s+제?(\d+)부\.\s*(.+)$/);
    if (partMatch) {
      flush();
      activePart = {
        id: `part-${partMatch[1].padStart(2, "0")}`,
        number: Number(partMatch[1]),
        title: cleanInline(partMatch[2]),
        deck: "",
        chapterIds: [],
      };
      parts.push(activePart);
      activeSection = null;
      continue;
    }

    const chapterMatch = line.match(/^#\s+(\d+)장\.\s*(.+)$/);
    if (chapterMatch) {
      flush();
      if (!activePart) throw new Error(`${currentFile}: ${chapterMatch[1]}장 앞에 부 제목이 없습니다.`);
      const chapter = {
        id: `ch${chapterMatch[1].padStart(2, "0")}`,
        number: Number(chapterMatch[1]),
        title: cleanInline(chapterMatch[2]),
        deck: "",
        blocks: [],
      };
      chapters.push(chapter);
      activePart.chapterIds.push(chapter.id);
      activeSection = chapter;
      continue;
    }

    const sectionTitle = line.match(/^##\s+(.+)$/);
    if (sectionTitle) {
      flush();
      const text = cleanInline(sectionTitle[1]);
      if (/^(제\d+부\s+)?(용어 각주|출처)$/.test(text)) continue;
      activeSection?.blocks.push({ type: "subheading", text });
      continue;
    }

    const nestedTitle = line.match(/^###\s+(.+)$/);
    if (nestedTitle) {
      flush();
      activeSection?.blocks.push({ type: "subheading", text: cleanInline(nestedTitle[1]) });
      continue;
    }

    const deck = line.match(/^>\s*\[deck\]\s*(.+)$/i);
    if (deck) {
      flush();
      if (activeSection) activeSection.deck = cleanInline(deck[1]);
      else if (activePart) activePart.deck = cleanInline(deck[1]);
      continue;
    }

    const callout = line.match(/^>\s*\[callout:([^\]]+)\]\s*(.+)$/i);
    if (callout) {
      flush();
      activeSection?.blocks.push({
        type: "callout",
        label: cleanInline(callout[1]),
        text: cleanInline(callout[2]),
      });
      continue;
    }

    if (line.startsWith(">")) {
      flush();
      activeSection?.blocks.push({ type: "quote", text: cleanInline(line.replace(/^>\s*/, "")) });
      continue;
    }

    const visual = line.match(/^\[VISUAL:\s*(.+)\]$/i) ?? line.match(/^<!--\s*visual:([^>]+)-->$/i);
    if (visual) {
      flush();
      const description = cleanInline(visual[1]);
      activeSection?.blocks.push({
        type: "visual",
        visual: visualKeyFor(description),
        description,
      });
      continue;
    }

    const image = line.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+["']([^"']*)["'])?\)$/);
    if (image) {
      flush();
      activeSection?.blocks.push({
        type: "image",
        src: image[2],
        alt: cleanInline(image[1]),
        ...(image[3] ? { caption: cleanInline(image[3]) } : {}),
      });
      continue;
    }

    if (
      line.includes("|") &&
      cursor + 1 < lines.length &&
      /^\s*\|?\s*:?-{3,}/.test(lines[cursor + 1])
    ) {
      flush();
      const headers = parseCells(line);
      cursor += 2;
      const rows = [];
      while (cursor < lines.length && lines[cursor].trim().includes("|")) {
        rows.push(parseCells(lines[cursor]));
        cursor += 1;
      }
      cursor -= 1;
      activeSection?.blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      flushParagraph();
      const ordered = /^\d+\.\s+/.test(line);
      if (list.length && ordered !== listOrdered) flushList();
      if (!list.length) listOrdered = ordered;
      list.push(line.replace(/^([-*]|\d+\.)\s+/, ""));
      continue;
    }

    if (list.length) flushList();
    paragraph.push(line);
  }
  flush();
}

const fallbackPartDecks = {
  1: "F2P를 장르가 아니라 배포·운영·수익 모델로 정의하고, Core·Session·Meta·경제·운영 시스템의 연결을 명세한다.",
  2: "반복 행동의 판정과 피드백, 세션 경계, 목표 생성, 확률과 기능 해금 순서를 설계한다.",
  3: "영구 진행, 재화 원장, 에너지, 공간, 확률과 경제 균형을 계산 가능한 변수로 분해한다.",
  4: "저장과 재개, 일일 구조, 과제, 이벤트와 수집 상태가 재접속 조건을 만드는 방식을 확인한다.",
  5: "광고와 앱 내 결제의 노출 조건, 가격 비교, 지급 무결성과 사용자 보호 기준을 명세한다.",
  6: "이벤트 로그, Funnel, Cohort, 실험과 원격 설정으로 기능의 효과와 부작용을 검증한다.",
  7: "Tasty Travels와 공개 게임을 같은 상태표로 비교하고, 새 F2P 시스템 설계 문서로 변환한다.",
};

for (const chapter of chapters) {
  if (!chapter.deck) {
    const firstParagraph = chapter.blocks.find((block) => block.type === "paragraph")?.text;
    chapter.deck = firstParagraph
      ? `${firstParagraph.slice(0, 116).replace(/[.,;:]?$/, "")}…`
      : `${chapter.title}의 입력값, 처리 규칙, 저장 상태와 측정 항목을 설명한다.`;
  }
}
for (const part of parts) {
  if (!part.deck) part.deck = fallbackPartDecks[part.number] ?? `${part.title}의 시스템과 검증 기준을 설명한다.`;
  if (!part.chapterIds.length) throw new Error(`${part.id}에 장이 없습니다.`);
}

chapters.sort((left, right) => left.number - right.number);
parts.sort((left, right) => left.number - right.number);
sources.sort((left, right) => left.number - right.number);

const chapterIds = new Set();
for (const chapter of chapters) {
  if (chapterIds.has(chapter.id)) throw new Error(`중복 장 번호: ${chapter.id}`);
  chapterIds.add(chapter.id);
}
if (!prologue.blocks.length || !epilogue.blocks.length) {
  throw new Error("앞부분과 부록 본문이 모두 필요합니다.");
}

const output = { metadata, parts, chapters, prologue, epilogue, sources, chapterFiles };
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(
  `Generated ${outputPath} for book "${requestedBook}" from ${chapterFiles.length} files (${parts.length} parts, ${chapters.length} chapters, ${sources.length} notes)`,
);
