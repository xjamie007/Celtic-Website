"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * §8: prefers-reduced-motion wird ueberall respektiert. Statt das in jeder
 * Komponente einzeln abzufragen, steht die Regel einmal hier — Framer Motion
 * reduziert dann jede Transform-Animation auf Opazitaet.
 *
 * Bewusst NICHT im Root-Layout: MotionConfig zoege Framer Motion in das
 * gemeinsame Bundle jeder Seite und damit gegen das Budget aus §14. Der
 * Wrapper gehoert in die Wurzel jedes Motion-Teilbaums, der ohnehin dynamisch
 * nachgeladen wird — ab Phase 2 die Bahn, ab Phase 3 die Sektionswechsel.
 * Kuemmert sich eine Komponente nur um Hover oder einen Zustandswechsel,
 * gehoert das nach CSS und nicht hierher.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
