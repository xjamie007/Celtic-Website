import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Der Vertrag zwischen Seiteninhalt und der Bahn (§5).
 *
 * Die Bahn liest ihre Marken nicht aus einer Liste, die jemand pflegen muss,
 * sondern aus dem Dokument selbst: jede LaneSection meldet sich ueber
 * data-lane-section an. Die Beschriftung leitet sich aus der Position ab —
 * erste Sektion START, letzte ZIEL, dazwischen Index mal 100. Damit sagt die
 * Marke tatsaechlich, wie weit man ist, statt nur so auszusehen.
 *
 * Phase 2 haengt den IntersectionObserver an genau dieses Attribut.
 */
export function LaneSection({
  id,
  children,
  className,
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      data-lane-section={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-24", className)}
    >
      {children}
    </section>
  );
}
