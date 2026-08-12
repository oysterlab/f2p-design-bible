export type TextBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  | { type: "callout"; label: string; text: string }
  | { type: "formula"; code: string; language?: string }
  | { type: "visual"; visual: VisualKey; description?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type VisualKey =
  | "system-map"
  | "evidence-levels"
  | "transaction-timeline"
  | "loop-horizons"
  | "game-state-comparison"
  | "energy-options"
  | "energy-curve"
  | "order-pipeline"
  | "unlock-graph"
  | "progression-types"
  | "source-sink"
  | "balance-curve"
  | "currency-network"
  | "probability"
  | "board-space"
  | "resume-state"
  | "event-separation"
  | "collection-state"
  | "completion-distribution"
  | "ad-state"
  | "purchase-flow"
  | "offer-matrix"
  | "analytics-funnel"
  | "analytics-map"
  | "experiment"
  | "cohort"
  | "remote-config"
  | "tasty-merge-chain"
  | "tasty-first-order"
  | "tasty-system-map"
  | "tasty-economy";

export type BookMetadata = {
  title: string;
  subtitle: string;
  description: string;
  series: string;
  footer: string;
  edition: string;
  publicationDate: string;
  coverEyebrow: string;
  thesisTitle: string;
  thesisDeck: string;
  methodTitle: string;
  methodDeck: string;
  /** Manuscript id from the build script's book registry. */
  book?: string;
  /** Cover artwork; omit to render the generated gradient field instead. */
  coverImage?: string;
  coverImageAlt?: string;
  /** Logo overlaid on the cover; omit to hide it. */
  coverLogo?: string;
  coverLogoAlt?: string;
  /** Short badge shown in the reader's navigation bar. */
  navBadge?: string;
  /** Hard page ceiling enforced at build time for this manuscript. */
  pageCeiling?: number;
  /** GitHub Pages base path used by the static export. */
  sitePath?: string;
};

export type Chapter = {
  id: string;
  number?: number;
  title: string;
  deck: string;
  blocks: TextBlock[];
};

export type PartDefinition = {
  id: string;
  number: number;
  title: string;
  deck: string;
  chapterIds: string[];
  image?: string;
};

export type ManuscriptSection = {
  title: string;
  deck: string;
  blocks: TextBlock[];
};

export type GeneratedBook = {
  metadata: BookMetadata;
  parts: PartDefinition[];
  chapters: Chapter[];
  prologue: ManuscriptSection;
  epilogue: ManuscriptSection;
  sources: SourceNote[];
};

export type SourceNote = {
  number: number;
  text: string;
  links: Array<{ label: string; url: string }>;
};

export type ReaderPage = {
  id: string;
  kind:
    | "cover"
    | "colophon"
    | "contents"
    | "part"
    | "chapter-title"
    | "reading"
    | "visual"
    | "sources";
  partId?: string;
  chapterId?: string;
  partNumber?: number;
  chapterNumber?: number;
  eyebrow?: string;
  title?: string;
  deck?: string;
  blocks?: TextBlock[];
  image?: string;
  imageAlt?: string;
  sourceNotes?: SourceNote[];
};
