import { getTranslations } from "next-intl/server";

import { ChronoNumber } from "@/components/data/ChronoNumber";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { countNationalRecords } from "@/lib/data/records";
import { countCoaches } from "@/lib/data/people";

/**
 * Der Hero (§6) — die These der Seite.
 *
 * Kein Stock-Foto mit Overlay-Text, kein Hero-Video. Die Wortmarke oeffnet
 * sich ueber die Width-Achse von 100 auf 125, waehrend der Trikotverlauf als
 * Wischer in 115 Grad hindurchfaehrt. Beides steht in globals.css und laeuft
 * ohne JavaScript; nur die Kennzahlen zaehlen hoch.
 *
 * Zwei uebereinanderliegende Ebenen: unten die Wortmarke in Ink, darueber
 * dieselbe in Verlauf, maskiert. Der Wischer schiebt die Maske durch, danach
 * steht die Verlaufsfassung. font-stretch wird auf dem gemeinsamen Elternteil
 * animiert und vererbt sich auf beide, damit sie sich nie verschieben.
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
    <div className="@container mx-auto flex min-h-[min(88svh,52rem)] max-w-[1240px] flex-col justify-end px-5 pt-[calc(var(--header-height)+6rem)] pb-16 sm:px-8">
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
        <span
          aria-hidden="true"
          className="hero-wipe absolute inset-0 block"
        >
          <span className="gradient-text block">{site.shortName}</span>
        </span>
      </div>

      <p className="hero-after font-data text-data-xs text-muted-on-page mt-6 uppercase">
        {t("tagline", { year: site.foundedYear })}
      </p>

      {/*
        Eine Zeile statt sechs Elementen (§1).
        Vorher standen die drei Kennzahlen als Block aus drei grossen Zahlen
        und drei kleinen Bezeichnungen — sechs Dinge, die um dieselbe
        Aufmerksamkeit konkurrierten wie die Wortmarke darueber. Als eine
        Zeile in Mono sagen sie dasselbe und nehmen eine Informationsebene
        statt zweier. Die Zahlen zaehlen weiter hoch und rasten mit dem
        Flackern ein (§8).
      */}
      <p className="hero-after font-data text-ui-sm text-muted-on-page mt-8 flex flex-wrap items-baseline gap-x-2 tabular-nums">
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

      {/* §6: Kein CTA-Button-Paar. Ein einziger Textlink. */}
      <p className="hero-after mt-12">
        <Link
          href="/matmaachen"
          className="text-ui-lg decoration-hairline-on-page hover:decoration-motion-accent hover:text-accent-on-page underline decoration-2 underline-offset-8 transition-colors duration-200"
        >
          {t("join")} &rarr;
        </Link>
      </p>
    </div>
  );
}
