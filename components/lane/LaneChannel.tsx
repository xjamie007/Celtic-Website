/**
 * DÉI BUNN — der Untergrund (§5)
 *
 * Die weisse Bahnmarkierung auf blauem Tartan, die ueber die gesamte Seite
 * laeuft: 3px breit, 32px vom Rand. Sie ist reines Layout — keine Animation,
 * kein JavaScript, kein Zustand, und sie rendert serverseitig mit.
 *
 * Phase 2 legt darauf, was die Bahn zur Bahn macht: den Magenta-Punkt mit
 * Bewegungsunschaerfe und die Distanzmarkierungen an den Sektionsgrenzen.
 * Getrennt gehalten, damit der Untergrund auch dann steht, wenn die
 * dynamische Schicht (dynamic, ssr:false) noch nicht geladen ist — sonst
 * klaffte beim ersten Bild eine leere Rinne im Layout.
 */
export function LaneChannel() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30">
      {/* ab lg: senkrecht am linken Rand */}
      <div className="bg-lane-channel absolute inset-y-0 left-0 hidden w-[var(--lane-channel-width)] lg:block" />
      <div className="bg-lane-line/60 absolute inset-y-0 left-[var(--lane-line-offset)] hidden w-[var(--lane-line-width)] -translate-x-1/2 lg:block" />

      {/* darunter: 2px-Leiste am oberen Rand, gleiches Verhalten (§5) */}
      <div className="bg-lane-channel absolute inset-x-0 top-0 h-1.5 lg:hidden" />
      <div className="bg-lane-line/60 absolute inset-x-0 top-0.5 h-0.5 lg:hidden" />
    </div>
  );
}
