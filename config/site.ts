/**
 * ═══════════════════════════════════════════════════════════════════════════
 * config/site.ts — die einzige Quelle fuer alles Vereinsspezifische
 * ═══════════════════════════════════════════════════════════════════════════
 * §2 des Auftrags: Die Codebase soll spaeter fuer andere FLA-Vereine
 * wiederverwendbar sein. Deshalb steht hier alles, was CELTIC Diekirch von
 * einem anderen Verein unterscheidet — und nichts davon in einer Komponente.
 *
 * Beschriftungen stehen absichtlich NICHT hier, sondern als Message-Keys in
 * messages/{lb,de,fr}.json. Die Config kennt Struktur und Zieladressen, die
 * Sprache kennt die Woerter. Ein neuer Verein tauscht diese Datei, ein neues
 * Land tauscht die Messages.
 */

export type Locale = (typeof locales)[number];

/*
  Englisch ist die vierte Sprache. Es gilt fuer die Oberflaeche — Navigation,
  Tabellen, Beschriftungen. Die langen Vereinstexte (Geschichte, Training,
  Kontakt) liegen als Datensatz in lb/de/fr; wo eine englische Fassung fehlt,
  zeigt die Seite still den luxemburgischen Text (§11, lib/localized.ts).
*/
export const locales = ["lb", "de", "fr", "en"] as const;
/* satisfies statt einer Typannotation: die Annotation wuerde den Literaltyp
   auf Locale aufweiten, und dann verlangte Localized alle drei Sprachen
   statt nur der Standardsprache als Pflichtfeld (§11). */
export const defaultLocale = "lb" satisfies Locale;

/** Mehrsprachiges Textfeld, wie es auch als JSONB in der Datenbank liegt (§12). */
export type Localized = Record<Locale, string>;

export type NavItem = {
  /** Key in messages/*.json unter "nav" */
  readonly key: string;
  readonly href: string;
  /** Externe Ziele oeffnen in neuem Tab und bekommen ein Symbol */
  readonly external?: boolean;
  readonly children?: readonly NavItem[];
};

export type SponsorTier = "haaptsponsor" | "partner" | "supporter";

export type SocialPlatform = "facebook" | "instagram" | "strava" | "youtube";

export type SocialChannel = {
  readonly platform: SocialPlatform;
  /** Leer = Kanal wird nicht gerendert (§5). */
  readonly url: string;
  readonly label: string;
  readonly handle: string;
};

/** Oberflaeche im Sinne der Rekordtabellen (§9, §10). */
export type RecordSurface = "piste" | "indoor" | "route" | "stade";
export type Gender = "f" | "m";

export const site = {
  /* ── Identitaet ──────────────────────────────────────────────────────── */
  name: "CELTIC Diekirch",
  shortName: "CELTIC",
  foundedYear: 1968,
  domain: "celtic.lu",
  /**
   * Die Adresse, unter der diese Fassung wirklich steht. Sie geht in
   * Sitemap, robots.txt und die kanonischen Verweise ein.
   *
   * Vorgabe ist die spaetere Vereinsdomain. Eine Vorschau — etwa der
   * statische Export auf GitHub Pages — setzt NEXT_PUBLIC_SITE_URL und
   * meldet damit sich selbst statt celtic.lu: sonst verweist eine
   * Vorschau Suchmaschinen auf Seiten, die es noch nicht gibt.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.celtic.lu",

  /* ── Kontakt (§9) ────────────────────────────────────────────────────── */
  contact: {
    email: "celtic@celtic.lu",
    postal: {
      line1: "CELTIC Diekirch",
      line2: "BP 40",
      postalCode: "L-9201",
      city: "Diekirch",
      country: "LU",
    },
    stadium: {
      key: "stadium",
      name: "Stade Municipal",
      street: "rue Jos Merten",
      postalCode: "L-9257",
      city: "Diekirch",
      mapsQuery: "Stade Municipal, rue Jos Merten, L-9257 Diekirch",
    },
    clubhouse: {
      key: "clubhouse",
      name: "Vereinslokal",
      street: "24 Rue du Palais",
      postalCode: "L-9265",
      city: "Diekirch",
      mapsQuery: "24 Rue du Palais, L-9265 Diekirch",
    },
  },

  /* ── Social (§5) ─────────────────────────────────────────────────────
     Kanaele mit leerer URL werden nicht gerendert. So kann die Adresse der
     Triathlon-Seite spaeter nachgetragen werden, ohne dass vorher ein toter
     Link auf der Seite steht. */
  social: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/CelticDiekirch",
      label: "Celtic Diekirch op Facebook",
      handle: "/CelticDiekirch",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/celticyoungsters/",
      label: "Celtic Youngsters op Instagram",
      handle: "@celticyoungsters",
    },
    {
      platform: "facebook",
      url: "",
      label: "Section Triathlon op Facebook",
      handle: "Section Triathlon",
    },
  ] as const satisfies readonly SocialChannel[],

  /* ── Recht (§13) ─────────────────────────────────────────────────────── */
  legal: {
    entity: "ASBL",
    rcs: "F6287",
  },

  /* ── Shop (§9: reine Weiterleitung) ──────────────────────────────────── */
  shopUrl: "https://absolute-teamsport.lu/collections/celtic-diekirch",

  /**
   * Die eigenen Veranstaltungen des Vereins (§9).
   *
   * Zwei davon haben jetzt eine eigene Seite unter /evenementer/<slug>; der
   * Waemper Triathlon fuehrt weiter auf seine eigene Adresse, weil er dort
   * mit Anmeldung, Ergebnissen und Streckenplaenen schon vollstaendig steht.
   *
   * Nordstadsemi und Eurocross haben keine: ihre Adressen zeigen beide auf
   * die alte Vereinsseite. Was es zu ihnen zu sagen gibt, steht auf ihrer
   * Seite hier.
   *
   * Das Datum steht hier nur als letzter bekannter Stand. Sobald eine
   * Datenbank hinterlegt ist, gilt der Termin aus dem Redaktionsbereich —
   * die Seite sucht dort nach einem Termin mit demselben Slug. So kann das
   * Comite das Datum aendern, ohne dass jemand Code anfasst.
   */
  events: [
    {
      slug: "nordstadsemi",
      name: "Nordstadsemi",
      /* Der volle Name mit Sponsor, wie er auf der Veranstaltung steht. */
      fullName: "Foyer Nordstadlaf",
      href: "/evenementer/nordstadsemi",
      external: false,
      city: "Dikrech",
      mapsQuery: "Diekirch, Luxembourg",
      /* Die Strecken, wie sie ausgeschrieben werden. Keine Uebersetzung:
         Zahlen und Distanzen sind in allen drei Sprachen dieselben.
         Belegt durch die Siegerlisten der Ausgabe 2026. */
      races: ["Semi-Marathon · 21,1 km", "10 km", "5 km"],
      lastKnownDate: "2026-03-15",
      edition: 22,
    },
    {
      slug: "eurocross",
      name: "Eurocross",
      /* So steht es auf der eigenen Ankuendigung des Vereins. */
      fullName: "Eurocross & Eurotail",
      href: "/evenementer/eurocross",
      external: false,
      city: "Dikrech",
      mapsQuery: "Diekirch, Luxembourg",
      races: ["Eurocross", "Eurotail"],
      lastKnownDate: "2025-11-23",
      edition: null,
    },
    {
      slug: "waemper-triathlon",
      name: "Wämper Triathlon",
      fullName: "Wämper Triathlon & Wämper Lof",
      href: "https://www.triathlon.lu",
      external: true,
      city: "Wämperhaard",
      mapsQuery: "Weiswampach, Luxembourg",
      races: [
        "Olympesch Distanz · 1,5 km / 40 km / 10 km",
        "Promotiounsdistanz · 750 m / 20 km / 5 km",
        "Wämper Lof · 5 km a 10 km",
      ],
      lastKnownDate: null,
      edition: null,
    },
  ] as const,

  /* ── Navigation (§9) ─────────────────────────────────────────────────── */
  /*
    Der Veraïn steht vorne. Vorher stand dort "Aktuellt" — eine Seite ohne
    eine einzige Meldung, also der erste Klick ins Leere. Was den Verein
    ausmacht, sind seine Geschichte, seine Gruppen und seine Leute; die
    Geschichte haengt deshalb mit im Ausklappmenue und nicht nur im Fuss.
  */
  mainNav: [
    {
      key: "club",
      href: "/club",
      children: [
        { key: "history", href: "/zenter-1968" },
        { key: "clubTraining", href: "/club/training" },
        { key: "clubCoaches", href: "/club/trainer" },
        { key: "clubCommittee", href: "/club/comite" },
        { key: "clubStadium", href: "/club/stadion" },
        { key: "clubCamp", href: "/club/trainingscamp" },
        { key: "clubContact", href: "/club/kontakt" },
      ],
    },
    { key: "next", href: "/next" },
    { key: "records", href: "/rekorder" },
    { key: "sponsors", href: "/sponsoren" },
  ] as const satisfies readonly NavItem[],

  footerNav: [
    {
      key: "performance",
      items: [
        { key: "records", href: "/rekorder" },
        { key: "bestPerformances", href: "/beschtleeschtungen" },
        { key: "celticsBest", href: "/celtics-best" },
        { key: "paraAthletics", href: "/para-athletics" },
        { key: "youth", href: "/jugend" },
      ],
    },
    {
      key: "club",
      items: [
        { key: "clubAbout", href: "/club" },
        { key: "clubTraining", href: "/club/training" },
        { key: "clubCoaches", href: "/club/trainer" },
        { key: "clubCommittee", href: "/club/comite" },
        { key: "clubStadium", href: "/club/stadion" },
        { key: "history", href: "/zenter-1968" },
      ],
    },
    {
      key: "more",
      items: [
        { key: "join", href: "/matmaachen" },
        { key: "sponsors", href: "/sponsoren" },
        { key: "photos", href: "/fotoen" },
        { key: "shop", href: "/shop" },
        { key: "links", href: "/links" },
      ],
    },
  ] as const,

  legalNav: [
    { key: "imprint", href: "/impressum" },
    { key: "privacy", href: "/dateschutz" },
  ] as const satisfies readonly NavItem[],

  /* ── Rekorde (§9, §10) ───────────────────────────────────────────────── */
  recordTabs: [
    { key: "pisteF", surface: "piste", gender: "f" },
    { key: "pisteM", surface: "piste", gender: "m" },
    { key: "indoorF", surface: "indoor", gender: "f" },
    { key: "indoorM", surface: "indoor", gender: "m" },
    { key: "routeF", surface: "route", gender: "f" },
    { key: "routeM", surface: "route", gender: "m" },
    { key: "stade", surface: "stade", gender: null },
  ] as const,

  /** Die fuenf Kapitel der Vereinsgeschichte (§9). */
  historyChapters: [
    "liichtathletik-zu-dikrich",
    "grennung",
    "trainingsmeiglechkeeten",
    "sportlech-entwecklung",
    "historique",
  ] as const,

  /** Kategorien fuer /beschtleeschtungen, in Reihenfolge der alten Seite. */
  performanceCategories: [
    "espoirs",
    "juniors",
    "cadets",
    "minimes",
    "scolaires",
    "debutants",
    "relais",
  ] as const,

  /**
   * Die Trainingsgruppen des Vereins — Eigennamen, deshalb unuebersetzt.
   *
   * Der Anhang des Auftrags listet an dieser Stelle Débutants, Scolaires,
   * Minimes und so weiter. Das sind aber die Alterskategorien des Verbands,
   * nicht die Gruppen des CELTIC. Wie der Verein seine Gruppen wirklich
   * nennt, steht in seinem eigenen Text auf /club/training — und von dort
   * kommen diese vier.
   */
  /* Die Kurzbeschreibungen stammen aus dem Bestand der alten Seite
     (data/pages.json, club/training) und sind gekuerzt, nicht neu
     geschrieben. Ohne sie war die Karte der Gruppe "fir Jiddereen" leer —
     Name und sonst nichts. */
  trainingGroups: [
    {
      key: "liichtathletikschoul",
      name: "CELTIC Liichtathletikschoul",
      description:
        "Sprint, Laf, Sprong a Worf spilleresch léieren — Virbereedung op all Sportaart am Veräin. Dat Wichtegst ass d’Freed zesummen mat de Kollegen.",
      section: "athletics",
      ages: "5–11",
      categories: "Ludiques (U8) · Benjamins (U10) · Débutants (U12)",
      coaches: [
        "Aline Kiesch",
        "Josée Schäfer",
        "Elisabeth Hoffmann",
        "Mieke Koster",
        "Anne Siebenaler",
        "Jang Winandy",
      ],
      photo: null,
      href: null,
    },
    {
      key: "createur",
      name: "CELTIC Créateur d’athlètes",
      description:
        "Zesumme mam Athlet seng Disziplin fannen an hien dohinner orientéieren. D’Minimes maachen hir éischt Erfarungen op Meeschterschaften.",
      section: "athletics",
      ages: "12–14",
      categories: "Scolaires (U14) · Minimes (U16)",
      coaches: [
        "Sebastiaan Van den Heuvel",
        "Kenny-Neal Wolmering",
        "Stefan Kornelis",
        "Romain Possing",
      ],
      photo: null,
      href: null,
    },
    {
      key: "powerhouse",
      name: "CELTIC Powerhouse of athletics",
      description:
        "Vun de Cadets bis un d’Enn vun der Carrière. Hei gëtt op déi Joeren virdrun opgebaut — Esthetik an Efficacitéit esou no wéi méiglech zesummen.",
      section: "athletics",
      ages: "Cadets +",
      categories: null,
      coaches: [
        "Stefan Kornelis",
        "Jo Brandenburger",
        "Mirko Gregor",
        "Kenny-Neal Wolmering",
        "Olivier Lessire",
        "Bob Bertemes",
      ],
      photo: null,
      href: null,
    },
    {
      key: "jiddereen",
      name: "CELTIC Liichtathletik fir Jiddereen",
      description:
        "Trainéieren ouni Wettkampfambitioun. De CELTIC Trainerteam beréit op Wonsch an no Méiglechkeet.",
      section: "athletics",
      ages: null,
      categories: null,
      coaches: [],
      photo: null,
      href: null,
    },
    /* Der Triathlon ist ein eigenstaendiger Teil des Vereins mit eigenen
       Trainern und eigener Facebook-Seite — er steht hier gleichwertig
       und nicht als Fussnote. */
    {
      key: "tri-celtic",
      name: "Tri-Celtic",
      description:
        "Schwammen, Rad a Laf — eng eege Sektioun mat eegene Traineren an eegene Kategorien.",
      section: "triathlon",
      ages: null,
      categories: "Kids · Jeunes masculin · Jeunes féminin · Altersklassen",
      coaches: [
        "Steve Feller",
        "Tom Hemmen",
        "Max Schroeder",
        "Jean-Marc Wagner",
      ],
      photo: null,
      href: "https://www.tri-celtic.lu",
    },
  ] as const,

  /* ── Trainingszeiten und -orte (§4) ──────────────────────────────── */
  trainingLocations: [
    { key: "1", name: "Centre Sportif", address: "rue Jos Merten, Diekirch" },
    {
      key: "2",
      name: "Sportshal Lycée Classique Diekirch",
      address: "Neit Gebei",
    },
    { key: "3", name: "Sportshal Primaireschoul", address: "Place de l’Ecole" },
  ] as const,

  trainingTimes: [
    {
      dayKey: "monday",
      time: "19:00–21:00 (Wanter) / 18:00–20:00",
      locations: ["3", "1"],
      groups: ["createur", "powerhouse"],
    },
    { dayKey: "wednesday", time: "18:00–20:00", locations: ["1"], groups: [] },
    {
      dayKey: "friday",
      time: "18:00–20:00",
      locations: ["1", "2"],
      groups: [],
    },
  ] as const,

  /** Ein Rekord gilt so lange als NEI und traegt den pulsierenden Punkt (§10). */
  newRecordDays: 90,

  /**
   * §6 verlangt drei Kennzahlen im Hero, darunter die aktiven Athlet:innen.
   *
   * Die Zahl ist eine Schaetzung des Vereins ("ueber 200") und wird deshalb
   * auch als solche gesetzt: approximate haengt ein Plus an, statt 200 als
   * gezaehlten Wert auszugeben. Liegt die genaue Zahl aus der
   * Lizenzverwaltung vor, faellt das Flag weg.
   */
  stats: {
    activeAthletes: 200 as number | null,
    activeAthletesApproximate: true,
  },

  /* ── Sponsoren (§7) ──────────────────────────────────────────────────── */
  sponsorTiers: ["haaptsponsor", "partner", "supporter"] as const,
  /** Sekunden pro Durchlauf der Zilgerad-Bande. Peripherie, nicht Werbung. */
  sponsorMarqueeDuration: 30,

  /* ── Feature-Flags (§2) ──────────────────────────────────────────────
     Was hier auf false steht, verschwindet vollstaendig: aus der
     Navigation, aus dem Footer, aus der Sitemap, aus den
     Distanzmarkierungen der Bahn und aus jeder internen Verlinkung. Die
     Route selbst antwortet mit 404 statt mit einer leeren Seite.

     Das hier sind die Vorgaben. Umschalten kann der Verein sie im
     Redaktionsbereich unter /admin/astellungen — ohne Auslieferung. */
  features: {
    /* Die Seite hatte keine einzige Meldung. Aus heisst: raus aus
       Navigation, Fuss und Sitemap, und die Adresse antwortet mit 404 statt
       mit einer leeren Seite. Schreibt der Verein Meldungen, steht sie mit
       einem Klick im Redaktionsbereich wieder da. */
    news: false,
    events: true,
    records: true,
    /* Noch keine Daten oder noch kein Material: */
    bestPerformances: true,
    celticsBest: false,
    paraAthletics: false,
    youth: true,
    photoGallery: false,
    history: true,
    shop: true,
    join: true,
    links: false,
    sponsors: true,
    sponsorJersey: true,
    lane: true,
    admin: true,
  },

  /* ── Analytics (§13: EU-gehostet, cookiefrei, kein Banner) ───────────── */
  analytics: {
    provider: "plausible" as const,
    /** Wird gesetzt, sobald das Konto steht. Leer = kein Skript. */
    domain: "",
    scriptSrc: "https://plausible.io/js/script.js",
  },
} as const;

export type Site = typeof site;

/* ───────────────────────────────────────────────────────────────────────────
   Aufgeweitete Sichten auf die Config.
   `site` ist bewusst `as const` — dadurch stehen Literaltypen fuer Feature-
   Flags und Slugs zur Verfuegung. Komponenten brauchen aber die allgemeine
   Form: ein Navigationspunkt hat optional Unterpunkte, und ob dieser konkrete
   welche hat, entscheidet die Config, nicht der Typ.
   ─────────────────────────────────────────────────────────────────────────── */

export type NavGroupKey = (typeof site.footerNav)[number]["key"];

export type NavGroup = {
  readonly key: NavGroupKey;
  readonly items: readonly NavItem[];
};

export const mainNav: readonly NavItem[] = site.mainNav;
export const legalNav: readonly NavItem[] = site.legalNav;
export const footerNav: readonly NavGroup[] = site.footerNav;
