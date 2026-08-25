/**
 * Der Trikotschnitt als SVG-Pfad.
 *
 * Liegt in einer eigenen Komponente, weil ihn zwei Stellen brauchen: die
 * oeffentliche Sponsorenseite und die Positionsauswahl im Admin. Zwei Kopien
 * gingen beim ersten echten Schnitt auseinander — und dann setzte der
 * Vorstand Positionen auf einem Trikot, das anders aussieht als das, was die
 * Besucher sehen.
 *
 * Traegerhemd, kein Kleid: Der Armausschnitt schneidet vom Schulterpunkt nach
 * innen und laeuft unter der Achsel wieder nach aussen, deshalb ist der Rumpf
 * dort breiter als die Schulter.
 */
export const JERSEY_VIEWBOX = { width: 200, height: 260 } as const;

export function JerseyShape({ gradientId }: { gradientId: string }) {
  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0.1" x2="1" y2="0.66">
          <stop offset="0%" stopColor="var(--celtic-blue)" />
          <stop offset="45%" stopColor="var(--celtic-blue)" />
          <stop offset="78%" stopColor="var(--celtic-blend)" />
          <stop offset="100%" stopColor="var(--celtic-magenta)" />
        </linearGradient>
      </defs>
      <path
        d="M 52 30 C 62 22 72 20 84 20 C 90 36 110 36 116 20 C 128 20 138 22 148 30
           C 122 70 130 88 156 105 L 152 215 L 48 215 L 44 105
           C 70 88 78 70 52 30 Z"
        fill={`url(#${gradientId})`}
        stroke="var(--celtic-white)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </>
  );
}
