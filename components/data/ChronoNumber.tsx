"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Chrono-Zahl (§8).
 *
 * Zaehlt beim Eintritt in den Viewport hoch, in Mono mit Tabularziffern. Am
 * Ende ein kurzes Flackern, bevor der Wert einrastet — wie eine
 * Zeitmessanlage, die die Zeit fixiert.
 *
 * Serverseitig steht sofort der richtige Wert im HTML. Erst nach der
 * Hydration springt die Anzeige auf null und laeuft hoch; das passiert in
 * useLayoutEffect, also vor dem ersten Bild, und ist deshalb nicht zu sehen.
 * Ohne JavaScript und in Suchmaschinen bleibt die echte Zahl stehen — eine
 * Kennzahl, die als "0" indexiert wird, waere schlimmer als keine Animation.
 *
 * Dazu ein Sicherheitsnetz: laeuft die Zaehlung nicht an — gedrosselter Tab,
 * pausiertes requestAnimationFrame, Kennzahl nie im Bild — rastet der Wert
 * nach Ablauf der Dauer trotzdem ein. Eine Null, die stehen bleibt, waere
 * nicht nur haesslich, sondern eine falsche Angabe.
 *
 * §8: nur bei echten Daten, nie bei Dekoration.
 */
export function ChronoNumber({
  value,
  duration = 1100,
  delay = 0,
  className,
}: {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setDisplay(0);
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let settle: ReturnType<typeof setTimeout> | undefined;
    let start: number | undefined;
    let finished = false;
    let settled = false;

    /*
      Das Sicherheitsnetz setzt den Wert und beendet die Zaehlung. Beides
      gehoert zusammen: In einem Hintergrund-Tab friert requestAnimationFrame
      ein, und der erste Frame kann Sekunden spaeter nachkommen — nach dem
      Netz. Ohne das Abbrechen ueberschriebe er den fertigen Wert wieder mit
      einem Zwischenstand, und die Kennzahl bliebe bei "3" stehen.
    */
    const failsafe = setTimeout(
      () => {
        if (finished) return;
        settled = true;
        cancelAnimationFrame(frame);
        setDisplay(value);
      },
      delay + duration + 800,
    );

    const run = () => {
      const step = (now: number) => {
        if (settled) return;
        start ??= now;
        const t = Math.min((now - start) / duration, 1);
        /* Ease-out: schnell los, sauber ausgelaufen. */
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(value * eased));
        if (t < 1) {
          frame = requestAnimationFrame(step);
          return;
        }
        /* Das Flackern: zwei Frames daneben, dann rastet der Wert ein. */
        finished = true;
        setDisplay(Math.max(value - 1, 0));
        settle = setTimeout(() => setDisplay(value), 60);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        settle = setTimeout(run, delay);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(failsafe);
      if (settle) clearTimeout(settle);
    };
  }, [armed, value, duration, delay]);

  return (
    <span ref={ref} className={cn("font-data tabular-nums", className)}>
      {display}
    </span>
  );
}
