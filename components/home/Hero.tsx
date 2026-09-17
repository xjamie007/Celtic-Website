import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { ChronoNumber } from "@/components/data/ChronoNumber";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { countNationalRecords } from "@/lib/data/records";
import { countCoaches } from "@/lib/data/people";

/**
 * Der Hero (§6, §3) — die These der Seite.
 *
 * Die Wortmarke oeffnet sich ueber die Width-Achse von 100 auf 125, waehrend
 * der Trikotverlauf als Wischer in 115 Grad hindurchfaehrt. Beides steht in
 * globals.css und laeuft ohne JavaScript; nur die Kennzahlen zaehlen hoch.
 *
 * Dahinter liegt jetzt die Bahn selbst: das Foto der Tartanbahn im Stade
 * Municipal, ganzflaechig, aber nicht als Bild im Sinne eines Rechtecks.
 *
 * Drei Griffe sorgen dafuer, dass es nicht hineingeklebt aussieht — und das
 * war die eigentliche Aufgabe, nicht "ein Foto einbauen":
 *
 * 1. Es hat keine Kante. Eine radiale Maske laesst es von unten rechts nach
 *    oben links auslaufen. Wo Text steht, ist praktisch nichts mehr davon
 *    da; ein sichtbarer Rand ist das, was ein Bild aufgeklebt aussehen
 *    laesst.
 * 2. Es traegt die Farben der Seite. Entsaettigt und mit Trikotblau
 *    multipliziert liegt es in derselben Palette wie alles andere, statt
 *    eine zweite danebenzustellen.
 * 3. Es liegt unter dem Text, nicht neben ihm. Die Wortmarke steht auf der
 *    Bahn — deshalb ist es dieses Foto und kein Gruppenbild: die Bahn ist
 *    die Metapher der ganzen Seite, bis hin zum Streifen am Seitenrand.
 *
 * Die Zeile unten rechts sagt, was man sieht. Ein Foto ohne Ortsangabe ist
 * Dekoration; mit ist es der Platz, auf dem der Verein trainiert.
 */
export async function Hero() {
  const t = await getTranslations("home");
  const [nationalRecords, coaches] = await Promise.all([
    countNationalRecords(),
    countCoaches(),
  ]);

  const years = new Date().getFullYear() - site.foundedYear;
  const athletes = site.stats.activeAthletes;

  const stats = [
    { value: nationalRecords, label: t("statsRecords"), suffix: "" },
    athletes === null
      ? { value: coaches, label: t("statsCoaches"), suffix: "" }
      : {
          value: athletes,
          label: t("statsAthletes"),
          /* Die Zahl ist eine Schaetzung des Vereins. Ein Plus macht das
             sichtbar; 200 blank hingeschrieben behauptet eine Genauigkeit,
             die es nicht gibt. */
          suffix: site.stats.activeAthletesApproximate ? "+" : "",
        },
    { value: years, label: t("statsYears"), suffix: "" },
  ];

  return (
    <div className="relative isolate flex min-h-[min(74svh,44rem)] sm:min-h-[min(88svh,50rem)] flex-col justify-end overflow-hidden">
      {/* ── Die Bahn dahinter ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="hero-photo">
        <Image
          src="/photos/stadion-3.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_58%]"
        />
      </div>
      {/* Eine feine Koernung ueber allem. Sie kostet nichts und nimmt dem
          Verlauf das Digitale — grosse Farbflaechen bilden sonst sichtbare
          Stufen. */}
      <div aria-hidden="true" className="hero-grain" />

      {/* Der Container-Kontext gehoert auf DIESES Element und nicht auf die
          Aussenbox: 22cqi der Wortmarke messen gegen die Textspalte, nicht
          gegen die Fensterbreite. Auf der Aussenbox lief "CELTIC" um die
          Breite der Bahnrinne plus Innenabstand aus dem Bild heraus. */}
      <div className="@container relative mx-auto flex w-full max-w-[1240px] flex-col justify-end px-5 pt-[calc(var(--header-height)+2.5rem)] pb-12 sm:pt-[calc(var(--header-height)+4rem)] sm:pb-14 sm:px-8">
        {/*
          w-fit ist hier nicht Kosmetik: background-clip zieht den Verlauf ueber
          die Elementbox, nicht ueber die Glyphen. Waere die Box so breit wie der
          Container, laege das Magenta-Ende neben dem Wort im Leeren und der
          Schriftzug bliebe durchgehend blau.
        */}
        <div className="hero-word text-hero relative w-fit font-display font-black">
          {/*
            font-black muss hier ausdruecklich stehen: die Basisregel setzt jedes
            h1 auf Gewicht 800, waehrend die Verlaufsebene die 900 vom Elternteil
            erbt. Zwei Gewichte heissen zwei Glyphenbreiten — die beiden Ebenen
            lagen sichtbar versetzt uebereinander und warfen einen dunklen
            Schatten an den Buchstabenkanten.
          */}
          <h1 className="text-ink-text font-black">{site.shortName}</h1>
          <span aria-hidden="true" className="hero-wipe absolute inset-0 block">
            <span className="gradient-text block">{site.shortName}</span>
          </span>
        </div>

        <p className="hero-after font-data text-data-xs text-muted-on-page mt-6 uppercase">
          {t("tagline", { year: site.foundedYear })}
        </p>

        <p className="hero-after text-body-lg text-ink-text/85 mt-5 max-w-[42ch] text-balance">
          {t("heroLead")}
        </p>

        {/*
          Eine Zeile statt sechs Elementen (§1).
          Als eine Zeile in Mono sagen die drei Kennzahlen dasselbe wie ein
          Block aus drei grossen Zahlen und drei Bezeichnungen — und nehmen
          eine Informationsebene statt zweier. Die Zahlen zaehlen weiter hoch
          und rasten mit dem Flackern ein (§8).
        */}
        <p className="hero-after font-data text-ui-sm text-muted-on-page mt-7 flex flex-wrap items-baseline gap-x-2 tabular-nums">
          {stats.map((stat, index) => (
            <span key={stat.label} className="flex items-baseline">
              {index > 0 ? (
                <span aria-hidden="true" className="mx-2">
                  ·
                </span>
              ) : null}
              {/* Zahl und Plus ohne Abstand: "200+" ist ein Wert, nicht zwei. */}
              <span className="whitespace-nowrap">
                <ChronoNumber value={stat.value} delay={index * 120} />
                {stat.suffix}
              </span>
              <span className="ml-1.5">{stat.label}</span>
            </span>
          ))}
        </p>

        {/* §6: Kein CTA-Button-Paar. Ein einziger Textlink — und rechts
            daneben, wo vorher nichts stand, die Ortsangabe zum Foto.

            Er fuehrt auf die Kontaktseite und nicht mehr auf /matmaachen:
            dort stand nur eine Ueberschrift, der Klick lief also ins Leere.
            Wer mitmachen will, braucht ohnehin genau das, was auf der
            Kontaktseite steht — Adresse, Telefon, Trainingsorte. */}
        <div className="hero-after mt-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
          <Link
            href="/club/kontakt"
            className="text-ui-lg decoration-hairline-on-page hover:decoration-motion-accent hover:text-accent-on-page underline decoration-2 underline-offset-8 transition-colors duration-200"
          >
            {t("join")} &rarr;
          </Link>
          <p className="font-data text-data-xs text-muted-on-page flex items-center gap-2 uppercase">
            <span aria-hidden="true" className="bg-motion-accent block h-1.5 w-1.5" />
            {t("heroPhotoCaption")}
          </p>
        </div>
      </div>
    </div>
  );
}
