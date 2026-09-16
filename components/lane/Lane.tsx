"use client";

import {
  motion,
  type MotionStyle,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils";

/**
 * DÉI BUNN (§5) — die bewegte Schicht.
 *
 * Der Belag liegt in LaneChannel und rendert serverseitig. Hier kommt dazu,
 * was die Bahn zur Bahn macht: der Magenta-Punkt auf der Scrollposition, der
 * Verlaufs-Trail als Bewegungsunschaerfe, und die Distanzmarkierungen an den
 * Sektionsgrenzen.
 *
 * Drei Entscheidungen tragen die Bildrate (§15, Phase 2: "Wenn es nicht
 * fluessig laeuft, ist es wertlos"):
 *
 * 1. Kein React-Render pro Frame. Position und Traillaenge gehen als
 *    MotionValues in zwei CSS-Custom-Properties auf dem Wurzelelement; alles
 *    Weitere macht CSS. React sieht davon nichts.
 * 2. Nur transform wird animiert — kein top, kein height, kein Layout.
 * 3. Sektionsgrenzen werden einmal gemessen und bei Groessenaenderungen neu,
 *    nie im Scroll-Handler.
 *
 * Die Beschriftung ist keine feste Liste, sondern leitet sich aus der Position
 * ab: erste Sektion START, letzte ZIEL, dazwischen Index mal 100. Die Marke
 * sagt damit tatsaechlich, wie weit man ist.
 */

type Marker = {
  readonly id: string;
  readonly label: string;
  /** Position auf der Bahn, 0 bis 1 */
  readonly progress: number;
  /** Der Zielstrich springt ans Dokumentende, nicht an eine Sektion. */
  readonly toEnd?: boolean;
};

/** §5: 120px Trail bei voller Geschwindigkeit. */
const VELOCITY_FULL = 2800; // px/s, ab hier ist der Trail auf voller Laenge

/** Muss zu --lane-inset in globals.css passen (2.5rem). */
const LANE_INSET_PX = 40;

/** Kleinster Abstand zweier Marken. Eine Marke ist rund 47px hoch. */
const MIN_MARKER_GAP_PX = 64;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

export function Lane() {
  const t = useTranslations("lane");
  const reduced = useReducedMotion();

  const [markers, setMarkers] = useState<readonly Marker[]>([]);
  const [scrollable, setScrollable] = useState(false);
  const [active, setActive] = useState(0);

  const { scrollY, scrollYProgress } = useScroll();

  /* Der Punkt gleitet der Scrollposition nach statt an ihr zu kleben — das
     ist der Unterschied zwischen einem Laeufer und einem Cursor. Bei
     reduzierter Bewegung springt er (§5). */
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    restDelta: 0.0005,
  });
  const position = reduced ? scrollYProgress : smoothed;

  /* Je schneller gescrollt wird, desto laenger der Trail. Das Vorzeichen der
     Geschwindigkeit entscheidet, auf welcher Seite des Punkts er haengt —
     hinter ihm, nie vor ihm. */
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, {
    stiffness: 300,
    damping: 50,
    restDelta: 1,
  });
  const trailBehind = useTransform(smoothVelocity, (v) =>
    reduced ? 0 : clamp01(v / VELOCITY_FULL),
  );
  const trailAhead = useTransform(smoothVelocity, (v) =>
    reduced ? 0 : clamp01(-v / VELOCITY_FULL),
  );

  const measure = useCallback(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-lane-section]"),
    );

    /*
      window.innerHeight kann 0 sein — in eingebetteten oder noch nicht
      gezeichneten Kontexten meldet der Browser die Fensterhoehe erst, wenn er
      das erste Mal Layout gemacht hat. Die ganze Rechnung der Bahn haengt an
      dieser Zahl: mit 0 wird maxScroll zur vollen Dokumenthoehe (jede Marke
      landet zu weit oben) und der Mindestabstand zwischen zwei Marken
      explodiert, sodass alle bis auf eine verworfen werden. Genau so ist es
      im Test passiert: auf der Startseite blieb nur noch ZIEL stehen.

      clientHeight als zweite Quelle, 800 als letzte Notloesung. Ein zu
      grosszuegiger Wert kostet eine ungenaue Position; eine 0 kostet die
      ganze Bahn.
    */
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight || 800;
    const maxScroll = document.documentElement.scrollHeight - viewportHeight;

    /* Zwei getrennte Bedingungen, weil es zwei getrennte Aussagen sind:
       Ohne Scrollweg gibt es keine Position zu zeigen — dann bleibt nur der
       Belag. Unter zwei Sektionen gibt es keine Distanz zu markieren, aber
       sehr wohl eine Position. Auf einer Unterseite laeuft der Punkt also
       weiter, nur ohne Marken. */
    setScrollable(maxScroll >= 1);

    if (nodes.length < 2 || maxScroll < 1) {
      setMarkers([]);
      return;
    }

    const lastIndex = nodes.length - 1;

    /*
      Zwei Marken duerfen sich nicht draengen.

      Die Position einer Marke ergibt sich aus dem Scrollfortschritt der
      Sektion, nicht aus einem gleichmaessigen Raster. Auf einer langen Seite
      mit einer kurzen Schlusssektion liegen die letzten beiden dadurch
      wenige Pixel auseinander: auf /next standen "100" und ZIEL 46px
      voneinander entfernt, bei 47px Markenhoehe. Zwei Beschriftungen, die
      sich beruehren, sind schwer zu treffen und schwerer zu lesen.

      Der Mindestabstand wird in Pixeln gedacht und in Fortschritt
      umgerechnet, weil die Bahn so hoch ist wie das Fenster — auf einem
      kurzen Fenster braucht derselbe Abstand mehr Fortschritt.

      Fallen zwei zusammen, weicht die frueher liegende: der Zielstrich steht
      fest, und ein START, an dem man vorbeilaeuft, wuerde noch mehr stoeren
      als eine fehlende Zwischenmarke.
    */
    const railHeight = Math.max(viewportHeight - 2 * LANE_INSET_PX, 1);
    const minGap = MIN_MARKER_GAP_PX / railHeight;

    setMarkers(
      nodes.map((node, index) => {
        const isFinish = index === lastIndex;

        /*
          ZIEL liegt immer am Ende der Bahn, nicht dort, wo die letzte Sektion
          beginnt. Der Unterschied ist auf dem Desktop klein (die Zielgerade
          faengt bei rund 97% an), auf Mobil aber gross: der gestapelte Footer
          drueckt die letzte Sektion auf 62%, und der Punkt liefe danach noch
          ueber ein Drittel der Bahn am Zielstrich vorbei. Ein Zielstrich, an
          dem man vorbeilaeuft, ist keiner.
        */
        return {
          id: node.dataset.laneSection ?? `sektioun-${index}`,
          label:
            index === 0
              ? t("start")
              : isFinish
                ? t("finish")
                : String(index * 100),
          progress: isFinish
            ? 1
            : clamp01(
                (node.getBoundingClientRect().top + window.scrollY) / maxScroll,
              ),
          toEnd: isFinish,
        };
      })
        /* Von hinten nach vorn gehen und alles verwerfen, was der bereits
           behaltenen Marke zu nahe kommt. Rueckwaerts, damit ZIEL die
           anderen verdraengt und nicht umgekehrt. */
        .reduceRight<Marker[]>((kept, marker) => {
          const next = kept[0];
          if (next && next.progress - marker.progress < minGap) return kept;
          return [marker, ...kept];
        }, []),
    );
  }, [t]);

  useEffect(() => {
    measure();

    /* Die Dokumenthoehe aendert sich nicht nur beim Drehen des Geraets,
       sondern auch wenn die Variable Font geladen ist und der Text neu
       umbricht. Ein ResizeObserver auf dem Body faengt beides. */
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* Die aktive Sektion kommt aus derselben Rechnung wie der Punkt. Ein
     zweiter Mechanismus (etwa ein IntersectionObserver mit eigenem
     Schwellenwert) koennte eine andere Sektion fuer aktiv halten als die, auf
     der der Punkt gerade steht — und genau das faellt auf. State wird nur
     gesetzt, wenn sich der Index wirklich aendert. */
  useMotionValueEvent(position, "change", (value) => {
    if (markers.length === 0) return;
    let index = 0;
    for (let i = 0; i < markers.length; i += 1) {
      const marker = markers[i];
      if (marker && value >= marker.progress - 0.002) index = i;
    }
    setActive((previous) => (previous === index ? previous : index));
  });

  /* Die drei Werte gehen als Custom Properties auf das Wurzelelement. Der
     Cast ist noetig, weil MotionStyle keine beliebigen Custom Properties
     kennt — der Laufzeitweg dafuer ist in Framer Motion vorgesehen. */
  const laneStyle = {
    "--lane-p": position,
    "--lane-trail-behind": trailBehind,
    "--lane-trail-ahead": trailAhead,
  } as unknown as MotionStyle;

  const jumpTo = (marker: Marker) => {
    if (marker.toEnd) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: reduced ? "instant" : "smooth",
      });
      return;
    }

    /* "instant" statt "auto": auto bedeutet laut Spezifikation "nimm das
       berechnete scroll-behavior", und das steht in globals.css auf smooth.
       Bei reduzierter Bewegung soll die Seite springen, nicht gleiten. */
    document.getElementById(marker.id)?.scrollIntoView({
      behavior: reduced ? "instant" : "smooth",
      block: "start",
    });
  };

  if (!scrollable) return null;

  return (
    <MotionProvider>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30"
        style={laneStyle}
      >
        <div className="lane-rail">
          <div className="lane-carrier-v absolute inset-0">
            <span className="lane-trail lane-trail-behind-v" />
            <span className="lane-trail lane-trail-ahead-v" />
            <span className="lane-dot lane-dot-v" />
          </div>
        </div>
      </motion.div>

      {/* ── Distanzmarkierungen ─────────────────────────────────────────── */}
      {markers.length > 0 ? (
        <nav
          aria-label={t("aria")}
          className="pointer-events-none fixed inset-0 z-30"
        >
          <ul className="lane-rail">
            {markers.map((marker, index) => {
              const isActive = index === active;
              return (
                <li key={marker.id}>
                  {/* Ab md mit Beschriftung neben der Linie */}
                  <button
                    type="button"
                    onClick={() => jumpTo(marker)}
                    aria-current={isActive ? "true" : undefined}
                    title={t("goTo", { label: marker.label })}
                    style={{ top: `${marker.progress * 100}%` }}
                    className={cn(
                      "lane-marker font-data text-data-xs pointer-events-auto absolute hidden md:block",
                      "left-[var(--lane-line-offset)] -translate-y-1/2 whitespace-nowrap uppercase",
                      "transition-colors duration-300",
                      isActive
                        ? "text-accent-on-dark"
                        : "text-lane-line/70 hover:text-lane-line",
                    )}
                  >
                    {marker.label}
                  </button>

                  {/* Auf dem Handy nur ein Punkt auf der Linie — der Belag ist
                      dort 6px breit, eine Beschriftung haette keinen Platz.
                      Die Trefferflaeche bleibt trotzdem 24px. */}
                  <button
                    type="button"
                    onClick={() => jumpTo(marker)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={t("goTo", { label: marker.label })}
                    style={{ top: `${marker.progress * 100}%` }}
                    className={cn(
                      "pointer-events-auto absolute grid h-6 w-6 place-items-center md:hidden",
                      "left-[var(--lane-line-offset)] -translate-x-1/2 -translate-y-1/2",
                    )}
                  >
                    <span
                      className={cn(
                        "block h-1 w-1 rounded-full transition-colors duration-300",
                        isActive ? "bg-motion-accent" : "bg-lane-line/70",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </MotionProvider>
  );
}
