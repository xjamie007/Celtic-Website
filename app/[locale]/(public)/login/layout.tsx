import type { ReactNode } from "react";

/**
 * Die Anmeldeseite bekommt keine oeffentliche Huelle: keine Navigation,
 * keine Bahn, keine Zielgerade. §3 verlangt eine "eigenstaendige, ruhige
 * Seite" — und eine Zielgerade mit laufenden Sponsorenbanden unter einem
 * Anmeldeformular waere das Gegenteil davon.
 *
 * Das Layout ersetzt die Huelle nicht, es umgeht sie: die Gruppe (public)
 * rendert ihre Huelle um children herum, und diese Seite fuellt den ganzen
 * Bildschirm, sodass davon nichts zu sehen ist. Deshalb steht sie ausserdem
 * ueber allem.
 */
export default function LoginLayout({ children }: { children: ReactNode }) {
  return <div className="fixed inset-0 z-50 overflow-y-auto">{children}</div>;
}
