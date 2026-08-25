#!/usr/bin/env node
/**
 * Langtexte von der alten Seite (§9, Anhang).
 *
 * Der Auftrag ist hier eindeutig: die Texte "liegen auf celtic.lu, gehoeren
 * dem Verein — vom Verein anfordern statt neu schreiben". Dieses Skript holt
 * sie und schreibt data/pages.json.
 *
 * Die Texte kommen als Bloecke (Ueberschrift, Absatz, Liste), nicht als
 * rohes HTML. Das alte CMS gibt Word-Markup aus, mit Inline-Styles und
 * Schriftgroessen aus dem Jahr 2005 — uebernaehme man das, zoege man das
 * alte Aussehen in die neue Seite. Und rohes Fremd-HTML in React zu rendern
 * hiesse dangerouslySetInnerHTML fuer Inhalt, den ein CMS erzeugt hat.
 *
 *   node tools/import-pages.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const BASE =
  "https://www.celtic.lu/online/www/websiteCeltic/celticContent/{path}/FRE/index.html";

/** Ziel-Slug -> Pfad im alten CMS. Die Slugs sind die aus §9. */
const PAGES = [
  ["club", "47"],
  ["club/training", "47/48"],
  ["club/trainer", "47/57"],
  ["club/comite", "47/511"],
  ["club/stadion", "47/515"],
  ["club/trainingscamp", "47/207/210"],
  ["club/kontakt", "47/516"],
  ["zenter-1968", "598/659"],
  ["zenter-1968/grennung", "598/661"],
  ["zenter-1968/trainingsmeiglechkeeten", "598/662"],
  ["zenter-1968/sportlech-entwecklung", "598/663"],
  ["zenter-1968/historique", "598/665/727"],
  ["beschtleeschtungen", "387/545/747"],
  ["celtics-best", "388/389"],
  ["jugend", "519/677"],
];

const entities = (s) =>
  s
    .replace(/&nbsp;| /g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&(?:rsquo|#8217);/g, "’")
    .replace(/&(?:ldquo|#8220);/g, "“")
    .replace(/&(?:rdquo|#8221);/g, "”")
    .replace(/&(?:ndash|#8211);/g, "–")
    .replace(/&(?:mdash|#8212);/g, "—")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));

const text = (html) =>
  entities(html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();

/** Inhalt eines div ab der oeffnenden Klammer, mit Verschachtelung. */
function innerDiv(html, from) {
  let depth = 1;
  let i = from;
  while (depth > 0 && i < html.length) {
    const next = /<(\/?)div\b/.exec(html.slice(i));
    if (!next) return html.slice(from);
    i += next.index + next[0].length;
    depth += next[1] ? -1 : 1;
  }
  return html.slice(from, i - "</div".length);
}

function blocksOf(html) {
  const blocks = [];
  const pattern = /<div[^>]*class="[^"]*mmpwebtext[^"]*"[^>]*>/g;

  for (const match of html.matchAll(pattern)) {
    const region = innerDiv(html, match.index + match[0].length);

    /* Der Footer steckt im selben Container-Typ wie der Inhalt. Er traegt
       immer die Vereinsadresse — daran ist er zu erkennen. */
    if (/BP\s*40|celtic@celtic\.lu/i.test(region)) continue;

    for (const node of region.matchAll(
      /<(h[1-4]|p|ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi,
    )) {
      const tag = node[1].toLowerCase();
      const body = node[2];

      if (tag === "ul" || tag === "ol") {
        const items = [...body.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
          .map((li) => text(li[1]))
          .filter(Boolean);
        if (items.length > 0) blocks.push({ type: "list", items });
        continue;
      }

      const value = text(body);
      if (value === "") continue;
      blocks.push({ type: tag === "p" ? "paragraph" : "heading", text: value });
    }
  }

  /* Doppelte Ueberschriften am Anfang (das CMS wiederholt den Seitentitel). */
  return blocks;
}

const pages = {};
const empty = [];

for (const [slug, path] of PAGES) {
  const url = BASE.replace("{path}", path);
  const response = await fetch(url, { headers: { "User-Agent": "celtic-import" } });
  if (!response.ok) throw new Error(`${url} -> ${response.status}`);
  const blocks = blocksOf(await response.text());

  const words = blocks.reduce(
    (sum, b) =>
      sum + (b.type === "list" ? b.items.join(" ") : b.text).split(/\s+/).length,
    0,
  );

  pages[slug] = { slug, source: url, blocks };
  if (blocks.length === 0) empty.push(slug);
  console.log(`${slug.padEnd(38)} ${String(blocks.length).padStart(3)} Bloeck, ${words} Wierder`);
}

mkdirSync("data", { recursive: true });
writeFileSync(
  "data/pages.json",
  JSON.stringify(
    {
      source: "celtic.lu (altes CMS)",
      importedAt: new Date().toISOString().slice(0, 10),
      pages,
    },
    null,
    1,
  ) + "\n",
);

if (empty.length > 0) {
  console.log(`\nOhne Inhalt auf der alten Seite: ${empty.join(", ")}`);
}
