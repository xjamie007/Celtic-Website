"use client";

import dynamic from "next/dynamic";

/**
 * §14: Framer Motion wird nur clientseitig geladen, wo es gebraucht wird.
 * Die Bahn ist reine Bewegung — sie hat auf dem Server nichts zu rendern, und
 * der Belag steht auch ohne sie (LaneChannel). Deshalb ssr: false.
 *
 * Diese Datei existiert nur, weil dynamic mit ssr: false eine Client-Grenze
 * braucht; sie bleibt bewusst leer von Logik.
 */
const Lane = dynamic(() => import("./Lane").then((m) => m.Lane), {
  ssr: false,
});

export function LaneMount() {
  return <Lane />;
}
