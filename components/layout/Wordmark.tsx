import Image from "next/image";

import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Das Vereinslogo (§6).
 *
 * Die verfuegbare Datei ist ein niedrig aufgeloestes PNG (152x135) von der
 * alten Seite. Fuer den Livegang gehoert eine Vektordatei her — Marc Funck
 * oder Asport haben sie aus der Trikotproduktion. Bis dahin ist das Logo
 * hier gekapselt: der Austausch ist ein Dateitausch in public/brand, keine
 * Codeaenderung.
 *
 * Das Logo enthaelt Gelb. Das ist neben den Landesrekord-Badges der einzige
 * Ort, an dem Gelb auf der Seite vorkommt — und weil es zum Logo gehoert und
 * nicht zur Gestaltung, bleibt die Regel aus §3 unberuehrt.
 */
export function Wordmark({
  className,
  variant = "nav",
  priority = false,
}: {
  className?: string;
  variant?: "nav" | "footer" | "large";
  priority?: boolean;
}) {
  const height = variant === "large" ? 96 : variant === "footer" ? 56 : 40;

  return (
    <Image
      src={
        variant === "footer"
          ? "/brand/celtic-logo-footer.webp"
          : "/brand/celtic-logo.webp"
      }
      alt={site.name}
      width={Math.round(height * 1.125)}
      height={height}
      priority={priority}
      /* Die Hoehe steht in CSS und nicht im style-Attribut: nur so kann die
         Navigation sie beim Scrollen animieren. */
      className={cn(
        "w-auto",
        variant === "nav" && "h-10 [.site-header_&]:h-[var(--logo-height)]",
        variant === "footer" && "h-14",
        variant === "large" && "h-24",
        className,
      )}
    />
  );
}
