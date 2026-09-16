/**
 * DÉI BUNN — der Untergrund (§5)
 *
 * Der Bahnbelag am linken Rand, ueber die gesamte Seite. Reines Layout: keine
 * Animation, kein JavaScript, kein Zustand, serverseitig gerendert.
 *
 * Er laeuft jetzt auf JEDER Breite senkrecht am Rand. Vorher kippte er unter
 * 1024px in eine waagerechte Leiste am oberen Rand — mit demselben Punkt und
 * demselben Verlaufsschweif, nur quer. Das war der "Strahl oben": kein
 * eigenes Element, sondern die Bahn selbst, die auf schmalen Fenstern ihre
 * Richtung wechselte. Damit war das charakteristische Element der Seite genau
 * dort weg, wo die meisten Besucher sind.
 *
 * Auf dem Handy bleibt der Belag ein 6px-Streifen ohne eigene Rinne: er liegt
 * unter dem Innenabstand des Textes. Wuerde er dort 72px beanspruchen, saesse
 * der Inhalt bei 390px sichtbar aus der Mitte. Ab md bekommt er die volle
 * Rinne, den Belag und die Distanzmarkierungen.
 *
 * Die bewegte Schicht (Punkt, Schweif, Marken) liegt in Lane. Getrennt
 * gehalten, damit der Belag auch steht, solange sie noch laedt — sonst klaffte
 * beim ersten Bild eine leere Rinne im Layout.
 */
export function LaneChannel() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30">
      {/* Belag: Tartan-Koernung auf blue-deep */}
      <div className="lane-surface absolute inset-y-0 left-0 w-[var(--lane-channel-width)]" />

      {/* Die weisse Bahnmarkierung */}
      <div className="bg-lane-line/60 absolute inset-y-0 left-[var(--lane-line-offset)] w-[var(--lane-line-width)] -translate-x-1/2" />

      {/* Distanzstriche: die kurzen Marken quer zur Bahn, wie im Stadion alle
          zehn Meter. Nur ab md — auf 6px Belag haetten sie keinen Platz. */}
      <div className="lane-ticks absolute inset-y-0 left-0 hidden w-[var(--lane-channel-width)] md:block" />
    </div>
  );
}
