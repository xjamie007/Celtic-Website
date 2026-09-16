# CELTIC Diekirch — Webseite

Relaunch von celtic.lu. Next.js 15 (App Router) · TypeScript strict · Tailwind v4 ·
next-intl (lb/de/fr) · Supabase (ab Phase 4).

```bash
npm run dev      # Entwicklung, http://localhost:3000
npm run build    # Produktionsbuild
npm run check    # Typen, Lint, Farbtokens, Sprachdateien
```

## Wo was liegt

| Pfad | Inhalt |
|---|---|
| `config/site.ts` | **Alles Vereinsspezifische.** Kontakt, Navigation, Rekord-Tabs, Feature-Flags. Ein anderer Verein tauscht diese Datei. |
| `app/globals.css` | **Die einzige Datei mit Farbwerten.** Ebene 1 = Trikotfarben, Ebene 2 = Rollen-Tokens. |
| `messages/{lb,de,fr}.json` | Alle Beschriftungen. `lb` ist die Referenz. |
| `app/fonts.ts` | Archivo, Instrument Sans, JetBrains Mono — lokal, kein Google-CDN. |
| `components/lane/` | Die Bahn. `LaneChannel` = Belag (Server, immer da), `Lane` = Punkt/Trail/Marken (dynamisch, ssr:false), `LaneSection` = Vertrag mit dem Seiteninhalt. |
| `lib/records.ts` | Leistungen lesen und vergleichen: `4'05"58` -> 245.58 s. Grundlage fuer den Rekord-Ablauf im Admin (§12). |
| `lib/data/` | Datenzugriff. Wird in Phase 4 durch Supabase ersetzt; die Signaturen bleiben. |
| `data/` | Importierte Bestandsdaten (`records.json`, `events.json`). Erzeugt, nicht von Hand gepflegt. |
| `tools/` | Migrationsskripte. `import-records.mjs` liest die Rekorde von celtic.lu, `import-events.mjs` den Kalender der FLA. |
| `components/sponsors/` | D'Zilgerad, das Sponsorenband vor dem Footer. |

## Sichtbare Bereiche (§2)

Was es noch nicht gibt, erscheint gar nicht — keine leere Sektion, kein
„Coming soon". Die Vorgaben stehen in `config/site.ts`, umschalten kann der
Verein sie unter `/admin/astellungen` ohne Auslieferung; gespeichert wird in
`public.settings`.

Ein abgeschalteter Bereich verschwindet gleichzeitig aus Navigation, Footer,
Sitemap und jeder internen Verlinkung, und seine Route antwortet mit **404**
statt mit einer leeren Seite. Die Zuordnung Pfad → Bereich steht einmal in
`lib/features.ts`; ohne sie muesste man beim Abschalten an vier Stellen
denken — und genau das vergisst man.

## Entscheidungen der dritten Runde

**Die Bahn laeuft auf jeder Breite senkrecht am Rand.** Vorher kippte sie
unter 1024px in eine waagerechte Leiste am oberen Fensterrand — mit demselben
Punkt und demselben Verlaufsschweif, nur quer. Das war der "Strahl oben": kein
eigenes Element, sondern die Bahn selbst. Auf dem Handy ist der Belag jetzt ein
6px-Streifen ohne eigene Rinne; er liegt unter dem Innenabstand des Textes.
Mit 72px saesse der Inhalt bei 390px sichtbar aus der Mitte, und das faellt
mehr auf, als die Bahn dort nutzt.

**Sichtbarkeit ist nie das Ergebnis einer Animation.** Zweimal ist dieselbe
Sorte Fehler aufgetreten: die Rekordzellen blieben nach einem Tabwechsel leer
(`AnimatePresence mode="wait"` haengt, wenn der Austritt sein Ende nicht
meldet), und das Mobilmenue war offen, aber unsichtbar (ein Uebergang laeuft
nicht, solange der Browser die Seite nicht zeichnet). Beide Stellen arbeiten
jetzt ohne diese Abhaengigkeit: die Zellen mit einer CSS-Keyframe, die immer
endet, das Menue durch Ein- und Aushaengen. Wo noch animiert wird, faesst die
Animation nur `transform` an — faellt sie aus, steht das Element ein paar
Pixel daneben, aber es steht.

**Das Foto im Hero hat keine Kante.** Eine radiale Maske loest die Aufnahme der
Tartanbahn nach links oben auf, wo Wortmarke und Text stehen; eine zweite,
lineare nimmt ihr die Unterkante. Entsaettigt und mit Trikotblau multipliziert
liegt sie in der Palette der Seite. Es ist bewusst die Bahn und kein
Gruppenbild: die Bahn ist die Metapher der ganzen Seite, bis hin zum Streifen
am Rand. Das Gruppenbild steht weiter in voller Staerke vor den
Trainingsgruppen.

**Sponsoren ohne Logo erscheinen nicht** (`getVisibleSponsors`). Vorher trug
die Bande ersatzweise den Namen als Schriftzug — das sah aus wie ein
Platzhalter, weil es einer war. Der Redaktionsbereich sieht ueber `getSponsors`
weiterhin alle, damit der Vorstand Logos nachtragen kann; sobald eines drin
ist, erscheint der Sponsor ohne weiteres Zutun.

**Logos stehen in voller Farbe auf hellen Tafeln.** Die Tafel ist nicht
Dekoration, sondern die Bedingung dafuer, dass "farbig" funktioniert: vier der
fuenf Logos sind auf weissem Grund angelegt, Asport ist eine schwarze
Wortmarke auf Transparenz und war auf dem dunkelblauen Band schlicht
unsichtbar. Genau deshalb hiess es, ein Asport-Logo fehle — die Datei war da,
nur nicht zu sehen. Begrenzt wird in beide Richtungen (Hoehe UND Breite): bei
fester Hoehe belegt ein breites Logo das Fuenffache der Flaeche eines
quadratischen.

## Assets

| | |
|---|---|
| `public/brand/` | Vereinslogo. **Niedrig aufgeloestes PNG (152×135) von der alten Seite.** Fuer den Livegang eine Vektordatei beim Verein anfragen — Marc Funck oder Asport haben sie aus der Trikotproduktion. Der Austausch ist ein Dateitausch, kein Codeeingriff. |
| `public/sponsors/` | Sponsorenlogos, auf einheitliche Hoehe gebracht und nicht verzerrt. Peters Sports, S-Cape und Reiff Mazout stehen ohne Logo in der Datenbank. |
| `public/photos/` | Vereinsfotos. Bis auf das Teamfoto aus Palamós (2000px) sind sie klein — 350×220 bis 600×450. |

`node tools/process-assets.mjs` bringt heruntergeladene Dateien auf einen
Nenner: WebP, Logos 56px hoch, Fotos maximal 2000px lange Kante.

## Qualitaet (Phase 6)

```bash
npm run check   # Typen, Lint, Farbtokens, Sprachdateien, Kontraste
```

**Kontraste** (`npm run check:contrast`) rechnet die Kombinationen nach, die
auf der Seite wirklich vorkommen, und faellt unter AA. Beim ersten Lauf fielen
sieben durch — alle mit demselben Grund: Trikotblau und Magenta liegen fast
gleich hell. Als Text erreicht Magenta auf Trikotblau 2.0:1.

Daraus folgen zwei Dinge, die im Code stehen:

- `--celtic-magenta-bright` und `--celtic-magenta-deep`. Magenta bleibt
  Magenta, nur die Helligkeit richtet sich nach dem Grund. `motion-accent`
  ist fuer Flaechen und Linien (3:1), `accent-on-page` und `accent-on-dark`
  fuer Text (4.5:1).
- Der Belag der Bahn liegt auf `blue-deep` statt auf Trikotblau. §3 weist
  blue-deep ausdruecklich den dunklen Flaechen zu, §5 verlangt einen blauen
  Grund — beides erfuellt. Auf Trikotblau waere die aktive Distanzmarkierung
  bei 2.2:1 gelandet.

**Lighthouse** auf `/`, gegen den Produktionsbuild:

| | Desktop | Mobil |
|---|---|---|
| Performance | 100 | 91 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 91 | 91 |

Der SEO-Wert ist ein Artefakt: Next streamt Titel und Beschreibung fuer
normale Kennungen und liefert sie blockierend an Link-Vorschau-Bots
(geprueft mit `facebookexternalhit` und `WhatsApp`). Lighthouse laeuft unter
keiner Bot-Kennung und schnappt manchmal zu frueh.

Der mobile Performance-Wert stammt aus Lighthouse' simulierter Drosselung
(langsames 4G, vierfach gebremste CPU) auf einem Rechner, auf dem gleichzeitig
Docker, Supabase und der Dev-Server liefen. Die verbindliche Messung gehoert
auf das echte Deployment.

## Der Rekord-Ablauf im Admin (Phase 5)

`/admin/rekorder`. Das Formular steht oben, nicht unter der Liste: der Ablauf,
der laut §12 in unter 60 Sekunden erledigt sein soll, faengt mit dem Eintragen
an — wer erst durch 109 Zeilen scrollt, hat die Minute schon verloren.

Das Formular entscheidet nichts. Ob eine Leistung den Rekord schlaegt, sagt
`public.submit_record()`; die Maske sammelt ein und zeigt die Antwort. Ist die
Leistung schlechter, steht dort die Meldung aus §12 — und daneben der zweite
Weg, der nichts neu eingetippt bekommt:

> 4'12"30 ass net besser wéi den aktuelle Rekord 4'05"58 (2025).
> De Rekord ass net geännert ginn.   [ Als Beschtleeschtung androen ]

## Drei Regeln, die der Build durchsetzt

**Keine Farbwerte ausserhalb von `app/globals.css`** (`npm run check:tokens`).
Die Trikotfarben sind aus Fotos abgeleitet. Sobald der Verein offizielle
Pantone-Werte liefert, wird genau eine Datei geaendert. Die Pruefung faellt beim
ersten Hex- oder `rgb()`-Wert, der sich in eine Komponente schleicht.

**Sprachdateien bleiben deckungsgleich** (`npm run check:messages`).
`lb` ist die Referenz; fehlende Keys in `de` oder `fr` brechen den Check. Im
Betrieb faellt die Seite still auf `lb` zurueck (§11), im Build wird sichtbar,
was noch zu uebersetzen ist.

**Der Code benutzt nur Schluessel, die es gibt** (dieselbe Pruefung).
Die drei Sprachdateien koennen deckungsgleich sein und der Code trotzdem
`t("tierPartner")` im falschen Namensraum rufen. Das faellt sonst erst im
Browser auf — als `admin.tierPartner` mitten im Formular, und nur wenn
jemand hinschaut.

## Farbsystem

Komponenten benutzen **nie** die Trikotfarben direkt, sondern Rollen-Tokens:
`--color-rec-national` statt `--celtic-gold`, `--color-lane-marker` statt
`--celtic-magenta`. Die Regel aus §3 — Gelb ausschliesslich fuer Landesrekorde —
steht damit im Namen und nicht in einer Konvention, an die sich in zwei Jahren
jemand erinnern muss.

## Was noch fehlt

- **Supabase-Projekt** in `eu-central-1` (Phase 4). Bis dahin Seed-Daten in `lib/data/`.
- **Vereinslogo als SVG** — bis dahin steht in `components/layout/Wordmark.tsx`
  der Schriftzug. Es gibt bewusst kein Favicon: lieber keins als ein falsches.
- **Sponsorenlogos** — die Banden tragen solange den Namen als Schriftzug.
- **Trikotvorlage** fuer das interaktive SVG auf `/sponsoren` (§7).
- **Langtexte** vom Verein (Vereinsgeschichte, Trainingsphilosophie, Trainerbios).

## Die Bahn

Eine Seite meldet ihre Sektionen ueber `<LaneSection id="...">` an. Die Bahn
liest sie aus dem Dokument und leitet die Beschriftung aus der Position ab:
erste Sektion START, letzte ZIEL, dazwischen Index mal 100. Es gibt keine
Liste zu pflegen — eine Sektion mehr auf der Seite heisst eine Marke mehr auf
der Bahn.

Position und Traillaenge laufen als CSS-Custom-Properties (`--lane-p`,
`--lane-trail-behind`, `--lane-trail-ahead`) vom Wurzelelement nach unten.
React rendert waehrend des Scrollens nichts neu, bewegt wird ausschliesslich
`transform`.

## Animationen: sichtbar ist der Standard

`Reveal` und `ChronoNumber` versteckten Inhalt nie im Stylesheet. Der Text ist
da, und erst JavaScript stellt die Sektion scharf. Beide haben zusaetzlich ein
Sicherheitsnetz, das nach Ablauf der Dauer aufblendet, falls der Observer in
einem gedrosselten Tab nie ausloest. Eine Animation darf nie darueber
entscheiden, ob Inhalt existiert — weder fuer Suchmaschinen noch fuer jemanden,
bei dem ein Skript haengenbleibt.

## Supabase (Phase 4)

```bash
npx supabase start                # lokale Instanz mit Migrationen und Seed
node tools/generate-seed.mjs      # seed.sql aus den importierten Daten neu bauen
npx supabase gen types typescript --local > lib/supabase/database.types.ts
```

`.env.local` aus `.env.example` anlegen. **Ohne hinterlegte Instanz liest die
Seite aus `data/`** — der Pitch-Build laeuft also auf jedem Rechner ohne
Zugangsdaten, und die Daten sind dieselben, die der Seed einspielt.

Vier Migrationen, in dieser Reihenfolge:

| | |
|---|---|
| `..._schema.sql` | Tabellen, Typen, Bedingungen |
| `..._rls.sql` | Row Level Security und die Rollen aus §12 |
| `..._functions.sql` | `submit_record()` und das Protokoll |
| `..._grants.sql` | Tabellenrechte |

**Die Grants sind kein Detail.** RLS filtert Zeilen erst, nachdem das
Tabellenrecht den Zugriff ueberhaupt erlaubt. Fehlen sie, antwortet die API
auf jede Abfrage mit `permission denied for table` — bei tadellosen Policies.

### Der Rekord-Ablauf

`public.submit_record()` entscheidet in einem Aufruf, ob eine Leistung den
Rekord schlaegt, archiviert gegebenenfalls den alten in `record_history` und
legt den neuen an. Ist sie schlechter, schreibt die Funktion **nichts** und
antwortet mit `status: not_better` samt aktuellem Rekord — daraus baut der
Admin die Meldung aus §12.

Die Funktion liegt in der Datenbank und nicht in der Anwendung, weil sie
mehrere Tabellen konsistent aendert. In der Anwendung waere sie eine Folge von
Abfragen, die zwischendrin abbrechen kann — und dann stuende ein Rekord in der
Chronik, der nie ersetzt wurde.

## Datenmigration

```bash
node tools/import-records.mjs   # Rekorde von celtic.lu -> data/records.json
node tools/import-events.mjs    # FLA-Kalender          -> data/events.json
node tools/import-pages.mjs     # Langtexte von celtic.lu -> data/pages.json
node tools/import-best-performances.mjs  # -> data/best-performances.json
node tools/generate-seed.mjs    # alles zusammen -> supabase/seed.sql

`import-events.mjs` geht zwölf Monate ab (`?date=YYYY-MM-01`) — ohne Parameter
liefert fla.lu nur den laufenden Monat, und ein Kalender mit einem Eintrag ist
keiner. Läufe des Vereins erkennt er am Namen und am Stade Municipal; die
Vermutung lässt sich im Redaktionssystem überstimmen.
```

Die Skripte **raten nie**. Was sie nicht sicher lesen koennen, melden sie am
Ende des Laufs mit Seite und Zeileninhalt, statt es zu ueberspringen. Eine
falsch importierte Rekordzeit faellt niemandem auf — und genau das macht sie
gefaehrlich.

Der Rekordimport normalisiert nebenbei die ueber Jahre gewachsenen
Schreibweisen: dieselbe Staffel stand einmal als `47"18` und einmal als
`44,56`, eine Zeit als `34'04 10` ohne Anfuehrungszeichen, eine Disziplin als
Triple, Triple-saut und Dreisprong. Der Katalog in `tools/import-records.mjs`
ist die Normalisierung; alles, was nicht darin steht, wird gemeldet.

Die gemeinsamen Regeln (Disziplinkatalog, Schreibweisen, Leistungsformate)
stehen in `tools/lib/athletics.mjs` und nicht zweimal — gingen sie
auseinander, stuende dieselbe Zeit auf zwei Seiten unterschiedlich.

Bei den Bestleistungen war die alte Seite deutlich unordentlicher als bei den
Rekorden: 69 Disziplinschreibweisen in drei Sprachen (Hauteur, Héichsprong,
Hochsprung), Geraetegewichte im Namen, Tabellen mit einer Spalte weniger und
15 Zeilen mit vertauschten Spalten. Der Importer erkennt das, statt es zu
raten — von 481 Zeilen bleiben sieben offen.

Diese Zeilen gehoeren in die Hand des Vereins:

- `[stade] Marcello | BENVENUTI | ITA | 1986 | 2,19 m` — die Disziplin fehlt
  in der Quelle vollstaendig.
- `[stade] Mile | Vera | HOFFMANN | LUX | 2020 | 4'38'48` — die Zeit ist mit
  zwei Apostrophen statt Apostroph und Anfuehrungszeichen geschrieben.
- Sieben Bestleistungen mit Tippfehlern in der Zeit (`3'03*80`, `8*24`,
  `3'59""08`), einem Jahr mit Leerzeichen (`20 11`) und zwei Zeilen, die zwei
  Leistungen in einer Zelle fuehren.

## Stand

Phase 1 bis 6 stehen. 29 oeffentliche Seiten in lb/de/fr, Schema mit RLS,
Anmeldung per Magic Link, Redaktionsbereich unter /admin mit Rekorden,
Sponsoren, Meldungen, Terminen und Benutzerverwaltung.

Migriert von der alten Seite: 109 Vereinsrekorde, 50 Stade-Rekorde, rund 2 700
Woerter Vereinstexte inklusive der fuenf Kapitel der Vereinsgeschichte.

Offen im Admin: Bestleistungen, Athlet:innen, Trainer:innen, Vorstand,
statische Seitentexte, Medienbibliothek.
## Bilder

Alles läuft über einen Speicher und eine Medientabelle: Sponsorenlogos,
Portraits von Trainer:innen und Vorstand, Wettkampffotos in Alben. Beim
Hochladen wird jedes Bild zu WebP und auf die passende Grösse gebracht — Logo
400px hoch, Portrait 800×800 quadratisch, Foto 2000px lange Kante. Der Verein
lädt hoch, was Kamera oder Telefon liefert, auch HEIC vom iPhone.

Zwei Bedingungen stehen in der Datenbank und nicht im Formular:

- **Alternativtext ist Pflicht**, sobald ein Bild zu einem Album gehört (§8).
- **Ohne bestätigte Einwilligung kein Portrait** (§13) — bei Trainer:innen,
  Vorstand und Athlet:innen gleichermassen.

Fehlt ein Portrait, zeigt die Karte das Monogramm auf dem Trikotverlauf. Das
ist Absicht: eine Karte mit grauem Platzhaltermensch sieht aus wie ein Fehler,
ein Monogramm sieht aus wie eine Entscheidung — und der Verein hat nicht von
allen achtzehn Trainer:innen ein Foto.

Offen oeffentlich: `/matmaachen`, `/links`, `/para-athletics`.
Offen zur Pruefung: der Mobil-Durchgang auf einem echten Geraet (§15, Phase 6)
und die Lighthouse-Messung auf dem Deployment.
