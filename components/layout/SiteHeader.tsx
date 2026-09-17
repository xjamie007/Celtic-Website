"use client";

import { useLinkStatus } from "next/link";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import type { NavItem } from "@/config/site";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { LocaleSwitcher } from "./LocaleSwitcher";
import { Wordmark } from "./Wordmark";

/**
 * §14 setzt ein hartes Budget: unter 200kb JS auf der Startseite. Die
 * Navigation steht auf jeder Seite — was hier haengt, haengt ueberall.
 * Deshalb kommt der gleitende Unterstrich (§8) ohne Animationsbibliothek aus:
 * gemessen wird mit getBoundingClientRect, bewegt wird von CSS ueber zwei
 * Custom Properties. Framer Motion bleibt der Bahn und den Inhaltssektionen
 * vorbehalten, wo es dynamisch nachgeladen wird.
 *
 * Zwei Dinge stehen hier bewusst so und nicht anders:
 *
 * 1. Das Mobilmenue liegt NEBEN dem <header>, nicht darin. Die Leiste traegt
 *    beim Scrollen backdrop-filter, und ein Element mit backdrop-filter wird
 *    zum Bezugsrahmen fuer position:fixed in seinem Teilbaum. Als Kind der
 *    Leiste mass das Menue seine Hoehe also gegen die 72px der Leiste statt
 *    gegen das Fenster: gemessen 375x16px statt 375x750px. Es war auf jeder
 *    Seite ausser dem Anfang der Startseite unbenutzbar.
 *
 * 2. Jeder Navigationspunkt zeigt an, dass er geklickt wurde. Ein Wechsel im
 *    App Router braucht eine Runde zum Server; ohne Rueckmeldung sieht das
 *    aus, als sei der Klick ins Leere gegangen — und man klickt noch einmal.
 */

function isActive(pathname: string, item: NavItem): boolean {
  if (item.href === "/") return pathname === "/";
  if (pathname === item.href) return true;
  if (pathname.startsWith(`${item.href}/`)) return true;
  return (
    item.children?.some((child) => pathname.startsWith(child.href)) ?? false
  );
}

export function SiteHeader({ nav }: { nav: readonly NavItem[] }) {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /* Bewusst eine feste ID statt useId: Es gibt genau ein Hauptmenue pro
     Dokument, und useId lieferte zwischen Server- und Client-Render
     unterschiedliche Werte — die Hydration brach an aria-controls. */
  const menuId = "haaptmenu";

  const listRef = useRef<HTMLUListElement>(null);
  const [underline, setUnderline] = useState<{ x: number; w: number } | null>(
    null,
  );
  /* Beim ersten Messen darf der Strich nicht von links hereingleiten. */
  const [measured, setMeasured] = useState(false);

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>('[data-nav-active="true"]');
    if (!active) {
      setUnderline(null);
      return;
    }
    const listBox = list.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    setUnderline({ x: activeBox.left - listBox.left, w: activeBox.width });
  }, []);

  useLayoutEffect(() => {
    measure();
    /* Der Strich gleitet erst ab der zweiten Messung. */
    const raf = requestAnimationFrame(() => setMeasured(true));
    return () => cancelAnimationFrame(raf);
  }, [measure, pathname]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    /* Die Schriftbreite aendert sich, wenn die Variable Font geladen ist —
       und mit ihr die Position des Strichs. */
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [measure]);

  /* §8: Beim Runterscrollen wird die Leiste schmaler und wechselt von
     transparent zu ink mit Blur. Passiver Listener, kein Layout-Lesen. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Auf der Startsaeit liegt die Leiste ueber dem Hero, sonst auf eigenem Grund. */
  const transparent = pathname === "/" && !scrolled && !menuOpen;

  return (
    <>
      <header
        data-tone={transparent ? "light" : "dark"}
        className={cn(
          "site-header sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
          transparent
            ? "bg-transparent"
            : "bg-ink/92 shadow-[0_1px_0_0_var(--color-hairline-on-ink)] backdrop-blur-md",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1240px] items-center gap-6 px-5 transition-[height] duration-300 sm:px-8",
            scrolled
              ? "h-14 [--logo-height:2rem]"
              : "h-[var(--header-height)] [--logo-height:2.5rem]",
          )}
        >
          <Link href="/" className="shrink-0 text-[var(--nav-fg)]">
            {/* §6: 40px, beim Scrollen 32px. Die Hoehe steuert eine
              Custom Property, damit der Uebergang mit der Leiste laeuft. */}
            <Wordmark priority className="transition-[height] duration-300" />
          </Link>

          {/* ── Desktop ─────────────────────────────────────────────────── */}
          <nav
            aria-label={tA11y("mainNav")}
            className="ml-auto hidden lg:block"
          >
            <ul ref={listRef} className="relative flex items-center gap-1">
              {nav.map((item) => {
                const active = isActive(pathname, item);
                return (
                  <li key={item.key} className="group relative">
                    <Link
                      href={item.href}
                      data-nav-active={active ? "true" : undefined}
                      aria-current={active ? "page" : undefined}
                      aria-haspopup={item.children ? "true" : undefined}
                      className={cn(
                        "text-ui-sm relative block px-3 py-2 transition-colors duration-200",
                        active
                          ? "text-[var(--nav-fg)]"
                          : "text-[var(--nav-fg-muted)] hover:text-[var(--nav-fg)]",
                      )}
                    >
                      {t(item.key)}
                      <NavPending />
                    </Link>

                    {item.children ? (
                      <div
                        className={cn(
                          "invisible absolute top-full left-0 w-56 translate-y-1 opacity-0 transition-[opacity,transform,visibility] duration-200",
                          "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
                          "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                        )}
                      >
                        <ul className="bg-ink/96 border-hairline-on-ink mt-2 border p-1.5 backdrop-blur-md">
                          {item.children.map((child) => (
                            <li key={child.key}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "text-ui-sm block px-3 py-2 transition-colors duration-150",
                                  pathname === child.href
                                    ? "text-white"
                                    : "text-muted-on-ink hover:text-white",
                                )}
                              >
                                {t(child.key)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}

              {/* §8: Der Unterstrich gleitet zwischen den Punkten, er springt
                nicht. Bei prefers-reduced-motion faellt die Transition global
                weg (globals.css) und er rastet direkt ein. */}
              <span
                aria-hidden="true"
                className={cn(
                  "bg-motion-accent pointer-events-none absolute -bottom-0.5 left-0 h-0.5",
                  "w-[var(--underline-w)] translate-x-[var(--underline-x)]",
                  measured &&
                    "transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  underline ? "opacity-100" : "opacity-0",
                )}
                style={{
                  ["--underline-x" as string]: `${underline?.x ?? 0}px`,
                  ["--underline-w" as string]: `${underline?.w ?? 0}px`,
                }}
              />
            </ul>
          </nav>

          {/*
            Der Sprachumschalter steht auf jeder Breite in der Leiste, auch
            auf dem Handy. Vorher lag er dort unten im ausgeklappten Menue —
            wer ihn suchte, musste erst das Menue oeffnen und scrollen, und
            genau deshalb hat ihn niemand gefunden. Drei Buchstaben brauchen
            keine 300px; sie passen neben Wortmarke und Menueknopf.
          */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-0">
            <LocaleSwitcher />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? tA11y("closeMenu") : tA11y("openMenu")}
              className="text-[var(--nav-fg)] lg:hidden"
            >
              <MenuGlyph open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobil ─────────────────────────────────────────────────────── */}
      {/*
        Das Menue wird ein- und ausgehaengt, statt dauerhaft im Dokument zu
        stehen und ueber opacity/visibility umgeschaltet zu werden.

        Der Grund ist derselbe wie bei den Rekordzellen: ein Zustand, den erst
        eine Animation herstellt, ist ein Zustand, der ausbleiben kann. In der
        alten Fassung war das Menue offen (aria-expanded="true", nicht inert),
        aber unsichtbar, solange der Uebergang nicht durchgelaufen war — und
        Uebergaenge laufen nicht durch, wenn der Browser die Seite gerade nicht
        zeichnet. Sichtbar sein darf nicht das Ergebnis einer Animation sein.

        Eingehaengt heisst sichtbar und bedienbar; die Keyframe blendet nur
        noch ein. Ausgehaengt heisst weg — auch aus der Tabreihenfolge, wofuer
        vorher inert noetig war.
      */}
      {menuOpen ? (
        <div
          id={menuId}
          /* Die Leiste ist je nach Scrollzustand 72px oder 56px hoch. Das
             Menue beginnt darunter — sonst liegt es entweder ueber der Leiste
             oder es klafft. */
          style={{ top: scrolled ? "3.5rem" : "var(--header-height)" }}
          className="menu-in bg-ink fixed inset-x-0 bottom-0 z-50 overflow-y-auto overscroll-contain lg:hidden"
        >
          <nav aria-label={tA11y("mainNav")} className="px-5 pt-6 pb-16 sm:px-8">
            <ul className="divide-hairline-on-ink divide-y">
              {nav.map((item) => (
                <li key={item.key} className="py-1">
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item) ? "page" : undefined}
                    className={cn(
                      "text-h3 wdth-100 relative block py-2 font-display",
                      isActive(pathname, item) ? "text-white" : "text-muted-on-ink",
                    )}
                  >
                    {t(item.key)}
                    <NavPending />
                  </Link>
                  {item.children ? (
                    <ul className="pb-3 pl-1">
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <Link
                            href={child.href}
                            className="text-muted-on-ink text-ui-sm block py-1.5"
                          >
                            {t(child.key)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}

/**
 * Rueckmeldung, dass der Klick angekommen ist.
 *
 * Ein Seitenwechsel im App Router holt die neue Seite vom Server. Das dauert
 * — im Entwicklungsmodus Sekunden, in Produktion eine Runde Netz. Ohne
 * Anzeige sieht das aus, als tue der Klick nichts, und man klickt noch
 * einmal. Genau so ist die Navigation als "funktioniert nicht" aufgefallen.
 *
 * useLinkStatus meldet den Zustand des umgebenden Link — deshalb steht diese
 * Komponente innerhalb davon und nicht daneben. Der Balken laeuft unter dem
 * Punkt durch, in derselben Sprache wie der gleitende Unterstrich: dieselbe
 * Farbe, dieselbe Hoehe, nur unbestimmt statt gemessen.
 */
function NavPending() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return (
    <span
      aria-hidden="true"
      className="nav-pending bg-motion-accent absolute inset-x-3 bottom-0 h-0.5 origin-left"
    />
  );
}

/** Zwei Striche, die sich zum Kreuz drehen. Keine Bibliothek fuer zwei Linien. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-6" aria-hidden="true">
      <span
        className={cn(
          "absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300",
          open ? "top-[7px] rotate-45" : "top-0.5",
        )}
      />
      <span
        className={cn(
          "absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300",
          open ? "top-[7px] -rotate-45" : "top-[13px]",
        )}
      />
    </span>
  );
}
