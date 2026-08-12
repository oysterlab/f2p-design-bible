// Renders translated/*.md into a static reading site at translated-site/.
// Pages sit two levels under the repo root, matching translated/, so the
// ../../raw/... image paths inside the Korean files keep resolving as-is.
// Run: node scripts/build-translation-site.mjs
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");
const translatedRoot = join(projectRoot, "translated");
const siteRoot = join(projectRoot, "translated-site");

const manifest = JSON.parse(await readFile(join(translatedRoot, "_manifest.json"), "utf8"));

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Inline pass: links first, then emphasis, then bare URLs that survived.
const inline = (text) => {
  let out = escapeHtml(text);
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, label, href) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`,
  );
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[\s(])_([^_]+)_(?=[\s).,]|$)/g, "$1<em>$2</em>");
  out = out.replace(
    /(^|\s)(https?:\/\/[^\s<]+)/g,
    (_, lead, url) => `${lead}<a href="${url}" target="_blank" rel="noopener">${url}</a>`,
  );
  return out;
};

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

// Block pass. The Korean files use a deliberately small subset of markdown,
// so a line-oriented walk is enough — no dependency needed.
function renderBody(body) {
  const html = [];
  let list = null;

  const closeList = () => {
    if (list) {
      html.push(`<ul>${list.join("")}</ul>`);
      list = null;
    }
  };

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    if (line === "---") {
      closeList();
      html.push("<hr>");
      continue;
    }
    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      closeList();
      const alt = escapeHtml(image[1]);
      html.push(
        `<figure><img src="${image[2]}" alt="${alt}" loading="lazy" decoding="async"></figure>`,
      );
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      // The file's own H1 is rendered from frontmatter instead.
      if (level === 1) continue;
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    if (line.startsWith("> ")) {
      closeList();
      html.push(`<blockquote>${inline(line.slice(2))}</blockquote>`);
      continue;
    }
    const item = line.match(/^[-*]\s+(.*)$/);
    if (item) {
      list ??= [];
      list.push(`<li>${inline(item[1])}</li>`);
      continue;
    }
    closeList();
    // A whole line wrapped in underscores is a figure caption in these files.
    const caption = line.match(/^_(.+)_$/);
    if (caption) {
      html.push(`<p class="caption">${inline(caption[1])}</p>`);
      continue;
    }
    if (/^원문: /.test(line)) {
      html.push(`<p class="source">${inline(line)}</p>`);
      continue;
    }
    html.push(`<p>${inline(line)}</p>`);
  }
  closeList();
  return html.join("\n");
}

const STYLE = `
:root{
  --bg:#faf9f7; --panel:#fff; --ink:#1c1b19; --muted:#6b6862;
  --line:#e2ded7; --accent:#8a5a2b; --quote:#f3efe8;
  --serif:"Noto Serif KR","Apple SD Gothic Neo","Malgun Gothic",serif;
  --sans:"Pretendard","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif;
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --bg:#16151a; --panel:#1d1c22; --ink:#e8e5df; --muted:#9d988e;
    --line:#302e38; --accent:#d0a173; --quote:#232128;
  }
}
:root[data-theme="dark"]{
  --bg:#16151a; --panel:#1d1c22; --ink:#e8e5df; --muted:#9d988e;
  --line:#302e38; --accent:#d0a173; --quote:#232128;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);
  -webkit-font-smoothing:antialiased;line-height:1.5}
a{color:var(--accent)}
.topbar{position:sticky;top:0;z-index:5;display:flex;gap:1rem;align-items:center;
  padding:.85rem 1.25rem;background:color-mix(in srgb,var(--bg) 88%,transparent);
  backdrop-filter:blur(10px);border-bottom:1px solid var(--line);font-size:.82rem}
.topbar .brand{font-weight:700;letter-spacing:.02em}
.topbar .spacer{flex:1}
.topbar a{text-decoration:none;color:var(--muted)}
.topbar a:hover{color:var(--accent)}
.wrap{max-width:46rem;margin:0 auto;padding:2.5rem 1.25rem 6rem}
.eyebrow{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin:0 0 .6rem}
h1{font-family:var(--serif);font-size:clamp(1.7rem,4.2vw,2.5rem);line-height:1.3;margin:0 0 .9rem;
  letter-spacing:-.01em;word-break:keep-all}
.byline{color:var(--muted);font-size:.85rem;margin:0 0 2.2rem;padding-bottom:1.6rem;
  border-bottom:1px solid var(--line)}
.byline .en{display:block;margin-bottom:.35rem;color:var(--ink);opacity:.75}
article p{font-family:var(--serif);font-size:1.05rem;line-height:1.95;margin:0 0 1.5rem;
  word-break:keep-all;overflow-wrap:break-word}
article h2{font-size:1.28rem;margin:3rem 0 1.1rem;line-height:1.45;word-break:keep-all;
  padding-top:1.4rem;border-top:1px solid var(--line)}
article h3{font-size:1.08rem;margin:2.3rem 0 .9rem;line-height:1.5;word-break:keep-all}
article h4{font-size:.98rem;margin:1.9rem 0 .8rem;color:var(--muted)}
article ul{margin:0 0 1.6rem;padding-left:1.15rem}
article li{font-family:var(--serif);font-size:1.02rem;line-height:1.9;margin-bottom:.7rem;word-break:keep-all}
blockquote{margin:0 0 1.6rem;padding:1.15rem 1.3rem;background:var(--quote);
  border-left:3px solid var(--accent);border-radius:0 6px 6px 0}
blockquote{font-family:var(--serif);font-size:1.02rem;line-height:1.85;word-break:keep-all}
figure{margin:2rem 0;text-align:center}
figure img{max-width:100%;height:auto;border-radius:8px;border:1px solid var(--line);background:var(--panel)}
.caption{font-family:var(--sans)!important;font-size:.84rem!important;color:var(--muted);
  text-align:center;margin:-1.1rem 0 2rem!important;line-height:1.65}
.source{font-family:var(--sans)!important;font-size:.82rem!important;color:var(--muted);line-height:1.75}
hr{border:0;border-top:1px solid var(--line);margin:3rem 0 1.5rem}
.nav{display:flex;justify-content:space-between;gap:1rem;margin-top:3.5rem;
  padding-top:1.5rem;border-top:1px solid var(--line);font-size:.86rem}
.nav a{text-decoration:none;max-width:47%}
.nav a span{display:block;color:var(--muted);font-size:.72rem;margin-bottom:.3rem}
/* index */
.lede{font-family:var(--serif);font-size:1.06rem;line-height:1.9;color:var(--muted);
  margin:0 0 2.5rem;word-break:keep-all}
.stats{display:flex;flex-wrap:wrap;gap:.55rem;margin:0 0 3rem}
.stats span{font-size:.78rem;padding:.4rem .75rem;border:1px solid var(--line);
  border-radius:999px;color:var(--muted)}
.part{margin-bottom:3rem}
.part h2{font-size:1.05rem;margin:0 0 .35rem;padding-top:1.4rem;border-top:1px solid var(--line)}
.part .note{font-size:.85rem;color:var(--muted);margin:0 0 1.2rem;word-break:keep-all}
ol.toc{list-style:none;margin:0;padding:0;counter-reset:item}
ol.toc li{border-bottom:1px solid var(--line)}
ol.toc a{display:flex;gap:.9rem;align-items:baseline;padding:.85rem .2rem;text-decoration:none;color:inherit}
ol.toc a:hover{background:var(--quote)}
ol.toc .num{font-size:.75rem;color:var(--muted);min-width:1.9rem;font-variant-numeric:tabular-nums}
ol.toc .ko{font-family:var(--serif);font-size:1rem;line-height:1.5;word-break:keep-all}
ol.toc .en{display:block;font-size:.76rem;color:var(--muted);margin-top:.25rem;line-height:1.45}
`;

const page = ({ title, depth, body, theme = "" }) => {
  const up = "../".repeat(depth);
  return `<!doctype html>
<html lang="ko"${theme}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${STYLE}</style>
</head>
<body>
<div class="topbar">
  <span class="brand">F2P 번역본</span>
  <span class="spacer"></span>
  <a href="${up}index.html">목차</a>
  <a href="#" id="themeToggle">테마</a>
</div>
${body}
<script>
document.getElementById('themeToggle').addEventListener('click',function(e){
  e.preventDefault();
  var root=document.documentElement;
  var dark=getComputedStyle(root).getPropertyValue('--bg').trim().indexOf('#1')===0;
  root.setAttribute('data-theme',dark?'light':'dark');
});
</script>
</body>
</html>`;
};

await rm(siteRoot, { recursive: true, force: true });

const SECTIONS = [
  { id: "bible", heading: "제1부 · The Bible", site: "mobilefreetoplay.com", numbered: true },
  { id: "dof", heading: "제2부 · 하이브리드캐주얼", site: "deconstructoroffun.com", numbered: false },
  { id: "gameanalytics", heading: "제3부 · 해체분석과 인터뷰", site: "gameanalytics.com", numbered: false },
];

// Flat reading order across all three collections, for prev/next links.
const order = [];
for (const section of SECTIONS) {
  for (const article of manifest.collections[section.id].articles) {
    order.push({ section, article });
  }
}

const loaded = [];
for (const entry of order) {
  const text = await readFile(join(translatedRoot, entry.article.file), "utf8");
  const { fields, body } = frontmatterOf(text);
  loaded.push({ ...entry, fields, body });
}

for (const [index, entry] of loaded.entries()) {
  const { article, fields, body, section } = entry;
  const prev = loaded[index - 1];
  const next = loaded[index + 1];
  const label = article.order ? `${section.heading} · ${article.order}장` : section.heading;
  const dateLabel = article.dateLabel ? `최종 수정 ${fields.published}` : fields.published;

  const nav = [
    prev
      ? `<a href="../${prev.article.file.replace(/\.md$/, ".html")}"><span>← 이전</span>${escapeHtml(prev.fields.title)}</a>`
      : "<span></span>",
    next
      ? `<a href="../${next.article.file.replace(/\.md$/, ".html")}" style="text-align:right"><span>다음 →</span>${escapeHtml(next.fields.title)}</a>`
      : "<span></span>",
  ].join("");

  const html = page({
    title: `${fields.title} — F2P 번역본`,
    depth: 1,
    body: `<main class="wrap">
<p class="eyebrow">${escapeHtml(label)}</p>
<h1>${escapeHtml(fields.title)}</h1>
<p class="byline"><span class="en">${escapeHtml(fields.title_en)}</span>
${escapeHtml(fields.author)} · ${escapeHtml(dateLabel)} · ${escapeHtml(fields.site)} · 원문 ${Number(fields.words_en).toLocaleString("en-US")}단어</p>
<article>
${renderBody(body)}
</article>
<div class="nav">${nav}</div>
</main>`,
  });

  const out = join(siteRoot, article.file.replace(/\.md$/, ".html"));
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html, "utf8");
}

const totalWords = order.reduce((sum, entry) => sum + entry.article.words, 0);
const hangul = loaded.reduce((sum, entry) => sum + (entry.body.match(/[가-힣]/g) ?? []).length, 0);
const images = order.reduce((sum, entry) => sum + entry.article.images.length, 0);

const sections = SECTIONS.map((section) => {
  const items = loaded
    .filter((entry) => entry.section.id === section.id)
    .map((entry, position) => {
      const number = entry.article.order ?? position + 1;
      return `<li><a href="${entry.article.file.replace(/\.md$/, ".html")}">
<span class="num">${String(number).padStart(2, "0")}</span>
<span><span class="ko">${escapeHtml(entry.fields.title)}</span>
<span class="en">${escapeHtml(entry.fields.title_en)} · ${escapeHtml(entry.article.author)}</span></span>
</a></li>`;
    })
    .join("\n");
  return `<section class="part">
<h2>${escapeHtml(section.heading)}</h2>
<p class="note">${escapeHtml(section.site)} · ${manifest.collections[section.id].articles.length}편</p>
<ol class="toc">${items}</ol>
</section>`;
}).join("\n");

await writeFile(
  join(siteRoot, "index.html"),
  page({
    title: "F2P 번역본 — 아카이브 한국어판",
    depth: 0,
    body: `<main class="wrap">
<p class="eyebrow">Archive · Korean Edition</p>
<h1>F2P 번역본</h1>
<p class="lede">아카이빙한 mobilefreetoplay.com, Deconstructor of Fun, GameAnalytics의 글 ${order.length}편을 한국어로 옮긴 판본입니다. 원문 구조와 이미지를 그대로 유지하고, Core Loop·Retention·Monetization 같은 업계 용어는 원어로 두었습니다.</p>
<div class="stats">
<span>${order.length}편</span>
<span>원문 ${totalWords.toLocaleString("en-US")}단어</span>
<span>한글 ${hangul.toLocaleString("en-US")}자</span>
<span>이미지 ${images}장</span>
</div>
${sections}
</main>`,
  }),
  "utf8",
);

console.log(`Wrote ${order.length + 1} pages to ${siteRoot}`);
