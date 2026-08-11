import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { metadata } = JSON.parse(
  await readFile(path.join(root, "lib", "generated-book.json"), "utf8"),
);
const outputDirectory = path.join(root, "docs");
const clientDirectory = path.join(root, "dist", "client");
const workerUrl = pathToFileURL(path.join(root, "dist", "server", "index.js"));
workerUrl.searchParams.set("export", String(Date.now()));

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://oysterlab.github.io/", {
    headers: { accept: "text/html", host: "oysterlab.github.io" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Unable to render ebook for GitHub Pages: ${response.status}`);
}

const sitePath = metadata.sitePath ?? "/f2p-design-bible/";
const siteUrl = `https://oysterlab.github.io${sitePath}`;
let html = await response.text();

for (const directory of ["assets", "images"]) {
  html = html.replaceAll(`\"/${directory}/`, `\"${sitePath}${directory}/`);
}

html = html
  .replace(
    '<meta property="og:url" content="https://oysterlab.github.io"/>',
    `<meta property="og:url" content="${siteUrl}"/>`,
  )
  .replace(
    "</head>",
    `<link rel="canonical" href="${siteUrl}"/></head>`,
  );

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });
const foreignImages = [];

await Promise.all(
  [
    "assets/_vinext_fonts",
    ".vite",
    ".assetsignore",
    "_headers",
    ...foreignImages,
  ].map((item) =>
    rm(path.join(outputDirectory, item), { recursive: true, force: true }),
  ),
);
await Promise.all([
  writeFile(path.join(outputDirectory, "index.html"), html),
  writeFile(path.join(outputDirectory, "404.html"), html),
  writeFile(path.join(outputDirectory, ".nojekyll"), ""),
]);

const pageCount = html.match(/data-reader-page/g)?.length ?? 0;
if (pageCount < 12) {
  throw new Error(`Static export contains only ${pageCount} ebook pages.`);
}

const pageCeiling = metadata.pageCeiling ?? 288;
if (pageCount > pageCeiling) {
  throw new Error(`Static export exceeds the ${pageCeiling}-page limit: ${pageCount} pages.`);
}

console.log(`Exported ${pageCount} pages to ${outputDirectory}`);
