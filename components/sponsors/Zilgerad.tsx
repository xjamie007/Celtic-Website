import { getTranslations } from "next-intl/server";

import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { getVisibleSponsors } from "@/lib/data/sponsors";

import { SponsorBande } from "./SponsorBande";

/**
 * D'ZILGERAD — die Zielgerade (§7)
 *
 * Direkt vor dem Footer, auf jeder Seite. Gestaltet wie die Bandenwerbung
 * entlang der Zielgeraden eines Stadions: eine durchgehende Flaeche in
 * blue-deep, oben und unten von einer duennen weissen Linie begrenzt — das
 * ist die Bahnbegrenzung, nicht ein Rahmen.
 *
 * Die Banden laufen langsam. Nicht schnell, nicht aufdringlich: es ist
 * Peripherie, wie im echten Stadion. Hover auf eine Bande haelt das ganze
 * Band an.
 *
 * ── Warum die Reihe mehrfach steht ───────────────────────────────────────
 *
 * Der Lauf schiebt das Band um genau eine Reihe nach links und faengt dann
 * von vorne an. Das ist nur nahtlos, solange eine Reihe mindestens so breit
 * ist wie das Band selbst. Bei fuenf Sponsoren ist sie rund 780px breit —
 * auf einem Laptop mit 1344px sichtbarer Breite lief also gegen Ende jeder
 * Runde eine Luecke von ueber 500px ein, und das Band schien auszusetzen.
 *
 * Deshalb wird die Reihe so oft wiederholt, dass ein Durchlauf auch auf
 * breiten Schirmen traegt. Die Dauer waechst mit: sonst liefen dieselben
 * Logos bei vier Kopien viermal so schnell vorbei.
 *
 * Server-Komponente: kein Framer Motion, kein JavaScript. Der Lauf ist eine
 * CSS-Animation auf transform — sie laeuft im Compositor und kostet die
 * Startseite kein einziges Kilobyte JS (§14).
 */
export async function Zilgerad() {
  const sponsors = await getVisibleSponsors();
  const t = await getTranslations("sponsors");

  if (sponsors.length === 0) return null;

  const main = sponsors.filter((s) => s.tier === "haaptsponsor");
  const rest = sponsors.filter((s) => s.tier !== "haaptsponsor");
  /* Der Haaptsponsor laeuft mit, aber an eigener Position: einmal vorne,
     danach die uebrigen Banden. */
  const lane = [...main, ...rest];

  /* Eine Tafel ist rund 160px breit. 20 Tafeln tragen damit gut 3000px —
     mehr, als ein Bildschirm zeigt, und das ist die Bedingung dafuer, dass
     der Lauf nahtlos schliesst. Hat der Verein spaeter selbst so viele
     Sponsoren, bleibt es bei einer Reihe. */
  const copies = Math.max(1, Math.ceil(20 / lane.length));
  const duration = site.sponsorMarqueeDuration * copies;

  return (
    <section
      id="ziel"
      data-lane-section="ziel"
      aria-label={t("bandAria")}
      className="zilgerad-band bg-deep relative isolate overflow-hidden"
      style={{ ["--zilgerad-duration" as string]: `${duration}s` }}
    >
      {/* Bahnbegrenzung oben und unten */}
      <div aria-hidden="true" className="bg-lane-line/70 h-px w-full" />

      <div className="flex overflow-hidden py-5">
        {/* Zweimal so viele Reihen wie ein Durchlauf braucht: die erste
            Haelfte laeuft durch, die zweite schliesst nahtlos an. Nur die
            erste Reihe ist fuer Screenreader und Tastatur da; alle weiteren
            sind Wiederholung derselben Sponsoren. */}
        <div className="zilgerad-track flex w-max items-center">
          {Array.from({ length: copies * 2 }, (_, pass) => (
            <div
              key={pass}
              className="zilgerad-lane flex items-center"
              aria-hidden={pass > 0 ? "true" : undefined}
            >
              {lane.map((sponsor) => (
                <SponsorBande
                  key={`${pass}-${sponsor.id}`}
                  sponsor={sponsor}
                  label={t("visit", { name: sponsor.name })}
                  decorative={pass > 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 pb-4 sm:px-8">
        <p className="font-data text-data-xs text-muted-on-ink uppercase">
          {t("bandTitle")}
        </p>
        <Link
          href="/sponsoren"
          className="font-data text-data-xs text-muted-on-ink uppercase transition-colors duration-200 hover:text-white"
        >
          {t("all")} &rarr;
        </Link>
      </div>

      <div aria-hidden="true" className="bg-lane-line/70 h-px w-full" />
    </section>
  );
}
