import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Der Redaktionsbereich (§12).
 *
 * Dasselbe Farbsystem, aber ohne Animation: keine Bahn, keine Zielgerade,
 * keine Sektionswechsel. Ruhig, dicht, schnell — wer hier arbeitet, will
 * einen Rekord eintragen und nicht eine Seite ansehen.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="bg-page text-ink-text min-h-dvh">{children}</div>;
}
