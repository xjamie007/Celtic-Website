"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Sektionswechsel (§8).
 *
 * Eine Verlaufskante in 115 Grad faehrt durch die Sektion und gibt den Inhalt
 * frei; Elemente mit der Klasse "rise" steigen dabei 24px auf, gestaffelt
 * ueber --i. Einmal pro Sektion, 100px bevor sie im Bild ist.
 *
 * Der Inhalt ist sichtbar, bis JavaScript die Sektion scharf stellt. Das ist
 * die Reihenfolge, nicht umgekehrt: waere "versteckt" der Ausgangszustand im
 * Stylesheet, bliebe der Text unsichtbar, sobald JavaScript ausfaellt oder ein
 * Crawler ihn nicht ausfuehrt. Zusaetzlich faellt die Sektion nach zwei
 * Sekunden von selbst auf, falls der Observer in einem gedrosselten Tab nie
 * ausloest — eine Animation darf nie darueber entscheiden, ob Inhalt da ist.
 *
 * Bewusst ohne Framer Motion, obwohl es im Stack steht (§2): Diese Komponente
 * umschliesst Inhalt, muss also serverseitig rendern — ein dynamischer Import
 * wuerde den Text aus dem HTML nehmen. Framer Motion laege damit im
 * Start-Bundle jeder Seite und nicht im nachgeladenen Chunk, und das Budget
 * aus §14 waere weg. Die Bahn braucht die Bibliothek wirklich, weil sie
 * Scroll-Velocity in Bewegung uebersetzt; eine Kante, die einmal durchlaeuft,
 * kann CSS besser. children kommt als Server-Prop und bleibt serverseitig.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"open" | "armed" | "in" | "done">("open");

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("armed");
  }, []);

  useEffect(() => {
    if (state !== "armed") return;
    const node = ref.current;
    if (!node) return;

    let settle: ReturnType<typeof setTimeout> | undefined;

    /* Sicherheitsnetz: loest der Observer nicht aus — gedrosselter Tab,
       Sektion nie im Bild, Browser ohne verlaessliches IO-Verhalten — faellt
       die Sektion nach zwei Sekunden von selbst auf. */
    const failsafe = setTimeout(() => setState("done"), 2000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        clearTimeout(failsafe);
        setState("in");
        /* Nach dem Durchlauf faellt die Maske weg — sonst behielte die
           Sektion ihre Compositing-Ebene fuer den Rest der Sitzung. */
        settle = setTimeout(() => setState("done"), 950);
      },
      { rootMargin: "-100px 0px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
      if (settle) clearTimeout(settle);
    };
  }, [state]);

  return (
    <div
      ref={ref}
      className={cn(
        state === "armed" && "reveal-armed",
        state === "in" && "reveal-in",
        state === "done" && "reveal-done",
        className,
      )}
    >
      {children}
    </div>
  );
}
