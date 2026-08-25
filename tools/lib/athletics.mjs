/**
 * Gemeinsame Regeln fuer alle Importe aus dem alten CMS.
 *
 * Rekorde und Bestleistungen stehen dort in denselben Word-Tabellen, mit
 * denselben gewachsenen Schreibweisen. Die Regeln liegen deshalb hier und
 * nicht zweimal: gingen sie auseinander, stuende dieselbe Zeit auf zwei
 * Seiten unterschiedlich — und das faellt niemandem auf.
 */

export const BASE =
  "https://www.celtic.lu/online/www/websiteCeltic/celticContent/{path}/FRE/index.html";

/* ── Disziplinen ──────────────────────────────────────────────────────────
   Der Katalog ist die Normalisierung. Alles, was hier nicht steht, faellt
   auf und wird gemeldet, statt als neue Disziplin durchzurutschen. */
export const DISCIPLINES = [
  ["50m", "50 m", 50, "time"],
  ["75m", "75 m", 75, "time"],
  ["80m", "80 m", 80, "time"],
  ["60m", "60 m", 60, "time"],
  ["100m", "100 m", 100, "time"],
  ["150m", "150 m", 150, "time"],
  ["200m", "200 m", 200, "time"],
  ["300m", "300 m", 300, "time"],
  ["400m", "400 m", 400, "time"],
  ["500m", "500 m", 500, "time"],
  ["600m", "600 m", 600, "time"],
  ["800m", "800 m", 800, "time"],
  ["1000m", "1000 m", 1000, "time"],
  ["1500m", "1500 m", 1500, "time"],
  ["1-mile", "1 Mile", 1610, "time"],
  ["2000m", "2000 m", 2000, "time"],
  ["3000m", "3000 m", 3000, "time"],
  ["5000m", "5000 m", 5000, "time"],
  ["10000m", "10 000 m", 10000, "time"],
  ["20000m", "20 000 m", 20000, "time"],
  ["1-stonn", "1 Stonn", 20500, "distance"],
  ["50m-h", "50 m H", 20900, "time"],
  ["60m-h", "60 m H", 21000, "time"],
  ["80m-h", "80 m H", 21050, "time"],
  ["100m-h", "100 m H", 21100, "time"],
  ["110m-h", "110 m H", 21200, "time"],
  ["300m-h", "300 m H", 21250, "time"],
  ["400m-h", "400 m H", 21300, "time"],
  ["2000m-st", "2000 m St.", 22000, "time"],
  ["3000m-st", "3000 m St.", 22100, "time"],
  ["10km-marche", "10 km Marche", 23000, "time"],
  ["10km-strooss", "10 km Strooss", 24000, "time"],
  ["halbmarathon", "Halbmarathon", 24100, "time"],
  ["marathon", "Marathon", 24200, "time"],
  ["hauteur", "Hauteur", 30000, "distance"],
  ["perche", "Perche", 30100, "distance"],
  ["longueur", "Longueur", 30200, "distance"],
  ["triple", "Triple", 30300, "distance"],
  ["poids", "Poids", 31000, "distance"],
  ["poids-4kg", "Poids 4 kg", 31050, "distance"],
  ["disque", "Disque", 31100, "distance"],
  ["marteau", "Marteau", 31200, "distance"],
  ["javelot", "Javelot", 31300, "distance"],
  ["pentathlon", "Pentathlon", 40000, "points"],
  ["heptathlon", "Heptathlon", 40100, "points"],
  ["octathlon", "Achtkampf", 40150, "points"],
  ["decathlon", "Décathlon", 40200, "points"],
  ["ball", "Ballwurf", 31350, "distance"],
  ["4x50m", "4 x 50 m", 49900, "time"],
  ["4x75m", "4 x 75 m", 49950, "time"],
  ["3x800m", "3 x 800 m", 50000, "time"],
  ["3x1000m", "3 x 1000 m", 50100, "time"],
  ["4x100m", "4 x 100 m", 50200, "time"],
  ["4x200m", "4 x 200 m", 50300, "time"],
  ["4x300m", "4 x 300 m", 50350, "time"],
  ["4x400m", "4 x 400 m", 50400, "time"],
];

/** Schreibweisen der alten Seite auf den Katalogschluessel. */
/*
  Die alte Seite mischt Franzoesisch, Deutsch und Luxemburgisch — dieselbe
  Disziplin heisst dort Triple, Triple-saut und Dreisprong. Die Zuordnung
  steht hier und nicht im Katalog, damit sichtbar bleibt, was Schreibweise
  ist und was eine eigene Disziplin.
*/
export const ALIASES = {
  "1meile": "1-mile",
  mile: "1-mile",
  "1heure": "1-stonn",
  "1heurestunde": "1-stonn",
  triplesaut: "triple",
  dreisprong: "triple",
  poids4kg: "poids-4kg",
  siebenkampf: "heptathlon",
  zehnkampf: "decathlon",
  décathlon: "decathlon",
  decathlon: "decathlon",
  semimarathon: "halbmarathon",

  /* Luxemburgisch und Deutsch — die alte Seite mischt beides mit dem
     Franzoesischen. Dieselbe Disziplin heisst dort Hauteur, Héichsprong und
     Hochsprung. */
  héichsprong: "hauteur",
  hochsprong: "hauteur",
  hochsprung: "hauteur",
  weitsprong: "longueur",
  weitsprung: "longueur",
  dräisprong: "triple",
  draisprong: "triple",
  bomstoussen: "poids",
  kugelstossen: "poids",
  diskus: "disque",
  speer: "javelot",
  speerwurf: "javelot",
  hummer: "marteau",
  hammerwurf: "marteau",
  ball: "ball",
  ballwurf: "ball",
  hepthatlon: "heptathlon",
  penthatlon: "pentathlon",
  achtkampf: "octathlon",

  /* Huerden und Hindernis in allen drei Schreibweisen. */
  "50mhaies": "50m-h",
  "50mhecken": "50m-h",
  "60mhaies": "60m-h",
  "60mhecken": "60m-h",
  "80mhaies": "80m-h",
  "80mhecken": "80m-h",
  "100mhaies": "100m-h",
  "100mhecken": "100m-h",
  "110mhaies": "110m-h",
  "110mhecken": "110m-h",
  "300mhaies": "300m-h",
  "300mhecken": "300m-h",
  "400mhaies": "400m-h",
  "400mhecken": "400m-h",
  "2000msteeple": "2000m-st",
  "3000msteeple": "3000m-st",
};

/**
 * Geraetegewichte und Kategoriezusaetze abtrennen.
 *
 * Die alte Seite schreibt "Disque 1 kg", "Javelot 600 Gr." oder
 * "Décathlon Scol" — das Gewicht beziehungsweise die Klasse gehoert nicht in
 * den Disziplinnamen, sondern ergibt sich aus der Kategorie der Liste. Die
 * Schreibweise bleibt fuer die Anzeige erhalten; gruppiert wird nach der
 * Grunddisziplin, sonst haette der Kugelstoss acht Eintraege statt einem.
 */
export function stripQualifiers(raw) {
  return raw
    .replace(/\*+/g, " ")
    .replace(/\+\+/g, " ")
    /* "600 Gr Javelot" -> "Javelot" */
    .replace(/^\s*\d+([.,]\d+)?\s*(kg|gr?)\.?\s+/i, "")
    /* "Disque 1 kg" -> "Disque", "100 m h.0,76m" -> "100 m h." */
    .replace(/\s*\d+([.,]\d+)?\s*(kg|gr|g)\.?\s*$/i, "")
    .replace(/\s*h\.?\s*\d+([.,]\d+)?\s*m\s*$/i, " haies")
    /* "Décathlon Scol", "Penthatlon Cad", "Décathlon min" */
    .replace(/\s+(scol|min|cad|jun|esp|sen|deb|déb)\.?\s*$/i, "")
    .trim();
}

export const catalogue = DISCIPLINES.map(([key, name, order, kind]) => ({
  key,
  name,
  order,
  kind,
}));

/** Vergleichsform: alles klein, ohne Leerzeichen, Punkte und Bindestriche. */
export const matchKey = (raw) =>
  raw
    .toLowerCase()
    .replace(/[\s.\-/]/g, "")
    .replace(/^\*+/, "");

/*
  Nachgeschlagen wird ueber die Vergleichsform des Anzeigenamens, nicht ueber
  den Slug. Der Slug traegt Bindestriche (10km-strooss), die Vergleichsform
  nicht — indiziert man nach Slug, findet "10 km Strooss" seinen eigenen
  Eintrag nicht und die Zeile verschwindet. Genau das ist beim ersten Lauf
  passiert, und zwar lautlos.
*/
const bySlug = new Map(catalogue.map((d) => [d.key, d]));
const byMatch = new Map(catalogue.map((d) => [matchKey(d.name), d]));

export function resolveDiscipline(raw) {
  for (const candidate of [raw, stripQualifiers(raw)]) {
    const key = matchKey(candidate);
    const direct = byMatch.get(key);
    if (direct) return direct;
    const aliased = ALIASES[key];
    if (aliased) return bySlug.get(aliased);
  }
  return undefined;
}

/* ── Leistungen ────────────────────────────────────────────────────────── */

const TIME_PATTERNS = [
  // 1 h 04'52" · 2 h 17'09"
  [/^(\d+)\s*h\s*(\d{1,2})'\s*(\d{1,2})\s*"?\s*(\d{1,2})?$/, "hmsh"],
  // 3:24,86
  [/^(\d{1,3}):(\d{1,2})[.,](\d{1,2})$/, "msh"],
  // 4'05"58 · 2'02 "69
  [/^(\d{1,3})'\s*(\d{1,2})\s*"\s*(\d{1,2})$/, "msh"],
  // 34'04 10 — fehlendes Anfuehrungszeichen in der Quelle
  [/^(\d{1,3})'\s*(\d{1,2})\s+(\d{1,2})$/, "msh"],
  // 33'37 " · 29'30
  [/^(\d{1,3})'\s*(\d{1,2})\s*"?$/, "ms"],
  // 11 "94
  [/^(\d{1,3})\s*"\s*(\d{1,2})$/, "sh"],
  // 44,56
  [/^(\d{1,3})[.,](\d{1,2})$/, "sh"],
];

function parseTime(value) {
  for (const [pattern, shape] of TIME_PATTERNS) {
    const m = pattern.exec(value);
    if (!m) continue;
    const n = (i) => (m[i] === undefined ? 0 : Number(m[i]));
    const hs = (i) => (m[i] === undefined ? 0 : Number(String(m[i]).padEnd(2, "0")));

    if (shape === "hmsh") {
      return { hours: n(1), minutes: n(2), seconds: n(3), hundredths: hs(4) };
    }
    if (shape === "msh") {
      return { hours: 0, minutes: n(1), seconds: n(2), hundredths: hs(3) };
    }
    if (shape === "ms") {
      return { hours: 0, minutes: n(1), seconds: n(2), hundredths: null };
    }
    return { hours: 0, minutes: 0, seconds: n(1), hundredths: hs(2) };
  }
  return null;
}

const pad = (value) => String(value).padStart(2, "0");

/** Einheitliche Wettkampfnotation: 1h04'52" · 4'05"58 · 33'37" · 11"94 */
function formatTime({ hours, minutes, seconds, hundredths }) {
  const tail = hundredths === null ? '"' : `"${pad(hundredths)}`;
  if (hours > 0) return `${hours}h${pad(minutes)}'${pad(seconds)}${tail}`;
  if (minutes > 0) return `${minutes}'${pad(seconds)}${tail}`;
  return `${seconds}${tail}`;
}

function toSeconds({ hours, minutes, seconds, hundredths }) {
  return hours * 3600 + minutes * 60 + seconds + (hundredths ?? 0) / 100;
}

export function parsePerformance(raw, kind) {
  const value = raw.replace(/\*/g, "").replace(/ /g, " ").trim();

  if (kind === "points") {
    const m = /^([\d.\s]+)\s*(?:P|pts?|Pkt|Punkten?|Punkte)?\.?$/i.exec(value);
    if (!m) return null;
    const points = Number(m[1].replace(/[.\s]/g, ""));
    if (!Number.isFinite(points) || points === 0) return null;
    return { display: `${points.toLocaleString("fr-FR").replace(/ | /g, " ")} P`, numeric: points };
  }

  if (kind === "distance") {
    const m = /^([\d\s]+)(?:[.,](\d{1,2}))?\s*m$/.exec(value);
    if (!m) return null;
    const whole = Number(m[1].replace(/\s/g, ""));
    if (!Number.isFinite(whole)) return null;
    if (m[2] === undefined) {
      /* Stundenlauf: die Leistung ist eine Strecke in Metern. */
      return {
        display: `${whole.toLocaleString("fr-FR").replace(/ | /g, " ")} m`,
        numeric: whole,
      };
    }
    const fraction = String(m[2]).padEnd(2, "0");
    return { display: `${whole},${fraction} m`, numeric: whole + Number(fraction) / 100 };
  }

  const time = parseTime(value);
  if (!time) return null;
  return { display: formatTime(time), numeric: toSeconds(time) };
}

/* ── HTML lesen ────────────────────────────────────────────────────────── */

export const decode = (s) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;| /g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&([a-z]+);/gi, (m) => m)
    .replace(/\s+/g, " ")
    .trim();

export function rowsOf(html) {
  const rows = [];
  for (const tr of html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) ?? []) {
    const cells = (tr.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/gi) ?? [])
      .map(decode)
      .filter((c) => c !== "");
    if (cells.length >= 5) rows.push(cells);
  }
  return rows;
}

/** "RAUSCH BAUER ZENS JONES" + "Victoria Annais Anouk Laurence" */
export function holdersOf(lastRaw, firstRaw) {
  const last = lastRaw.split(/\s+/).filter(Boolean);
  const first = firstRaw.split(/\s+/).filter(Boolean);
  if (last.length > 1 && last.length === first.length) {
    return last.map((lastName, i) => ({ lastName, firstName: first[i] }));
  }
  return [{ lastName: lastRaw, firstName: firstRaw || null }];
}

export const yearOf = (raw) => {
  const years = (raw.match(/\d{4}/g) ?? []).map(Number);
  return years.length > 0 ? Math.max(...years) : null;
};

