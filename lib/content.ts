import generatedBook from "./generated-book.json";
import type { GeneratedBook } from "./book-types";

// Ordered Markdown files in `content/chapters` are the authoring source.
// `npm run content:build` validates them and regenerates this typed data.
const book = generatedBook as GeneratedBook;

export const bookMetadata = book.metadata;
export const partDefinitions = book.parts;
export const chapters = book.chapters;
export const prologue = book.prologue;
export const epilogue = book.epilogue;
export const sourceNotes = book.sources;
