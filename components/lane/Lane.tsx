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
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

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
      }),
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
          {/* ab lg: senkrecht am linken Rand */}
          <div className="lane-carrier-v absolute inset-0 hidden lg:block">
            <span className="lane-trail lane-trail-behind-v" />
            <span className="lane-trail lane-trail-ahead-v" />
            <span className="lane-dot lane-dot-v" />
          </div>

          {/* darunter: waagerecht am oberen Rand */}
          <div className="lane-carrier-h absolute inset-0 lg:hidden">
            <span className="lane-trail lane-trail-behind-h" />
            <span className="lane-trail lane-trail-ahead-h" />
            <span className="lane-dot lane-dot-h" />
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
                  {/* ab lg mit Beschriftung */}
                  <button
                    type="button"
                    onClick={() => jumpTo(marker)}
                    aria-current={isActive ? "true" : undefined}
                    title={t("goTo", { label: marker.label })}
                    style={{ top: `${marker.progress * 100}%` }}
                    className={cn(
                      "lane-marker-label font-data text-data-xs pointer-events-auto absolute hidden",
                      "left-[2.875rem] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap uppercase lg:block",
                      "transition-colors duration-300",
                      isActive
                        ? "text-accent-on-dark"
                        : "text-lane-line/70 hover:text-lane-line",
                    )}
                  >
                    {marker.label}
                  </button>

                  {/* darunter nur als Punkt, ohne Beschriftung (§5) */}
                  <button
                    type="button"
                    onClick={() => jumpTo(marker)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={t("goTo", { label: marker.label })}
                    style={{ left: `${marker.progress * 100}%` }}
                    className={cn(
                      "pointer-events-auto absolute top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full lg:hidden",
                      "transition-colors duration-300",
                      isActive ? "bg-motion-accent" : "bg-lane-line/70",
                    )}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </MotionProvider>
  );
}
