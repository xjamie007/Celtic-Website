"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Rekordtabelle mit weichem Ansichtswechsel (§8).
 *
 * Der Kern: es gibt EINE Tabelle, nicht sieben. Die Zeilen sind die Vereinigung
 * aller Disziplinen; beim Tabwechsel bleiben sie stehen und nur die Werte
 * tauschen sich aus. Sieben getrennte Tabellen koennten das nicht — dort waere
 * jede Zeile beim Wechsel ein anderes Element, und Framer Motion haette
 * nichts, was es ineinander ueberfuehren koennte.
 *
 * Nebeneffekt: weniger Markup als vorher, obwohl es weicher wirkt.
 */
export type MatrixRow = {
  readonly disciplineKey: string;
  readonly disciplineName: string;
  readonly performanceRaw: string;
  readonly names: string;
  readonly category: string;
  readonly year: number;
  readonly isNationalRecord: boolean;
  readonly isEspoirsBest: boolean;
  readonly isNew: boolean;
};

export type MatrixView = {
  readonly key: string;
  readonly label: string;
  readonly rows: readonly MatrixRow[];
};

/* Die Staffelung von 15ms je Zeile (§8) steht jetzt in globals.css als
   animation-delay der Klasse .record-cell-in — dieselbe Zahl, nur dort, wo
   die Animation auch laeuft. */

export function RecordMatrix({
  views,
  labels,
}: {
  views: readonly MatrixView[];
  labels: {
    discipline: string;
    performance: string;
    name: string;
    category: string;
    year: string;
    empty: string;
    national: string;
    espoirs: string;
    isNew: string;
  };
}) {
  const t = useTranslations("records");
  const reduced = useReducedMotion();
  const tablistRef = useRef<HTMLDivElement>(null);

  const fallback = views[0]?.key ?? "";
  const [active, setActive] = useState(fallback);

  /*
    §8: Der aktive Tab steht in der Adresse und ist damit verlinkbar. Gelesen
    wird er hier und erst nach dem Einhaengen.

    Nicht mit useSearchParams: der Hook zwingt die Seite in eine
    Suspense-Grenze, und in einer statisch gerenderten Seite uebernimmt der
    Browser diesen Teilbaum dann gar nicht mehr — die Tabelle stand da,
    reagierte aber auf keinen Klick.

    Und nicht schon beim ersten Rendern: dort steht auf dem Server der erste
    Tab, und ein abweichender Wert im Browser waere ein Hydrationsfehler.
    Wer einen Tab verlinkt bekommt, sieht ihn also einen Wimpernschlag
    spaeter — wer /rekorder normal aufruft, merkt nichts.
  */
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("bunn");
    if (wanted && views.some((v) => v.key === wanted)) setActive(wanted);
  }, [views]);

  const select = useCallback((key: string) => {
    setActive(key);
    /* §8: Der aktive Tab steht in der Adresse, damit man ihn verlinken kann.
       replaceState statt Router: es soll kein Eintrag im Verlauf entstehen
       und die Seite nicht neu rendern. */
    const url = new URL(window.location.href);
    url.searchParams.set("bunn", key);
    window.history.replaceState(null, "", url);
  }, []);

  /*
    Ein Suchfeld statt Suche plus zwei Auswahlfeldern (§1: wo zwei kleine
    Elemente nebeneinander stehen, faellt eines weg). Es sucht ueber
    Disziplin und Name zugleich — nach beidem sucht man, und getrennte
    Filter dafuer waeren drei Bedienelemente fuer eine Frage.
  */
  const [query, setQuery] = useState("");

  const view = views.find((v) => v.key === active) ?? views[0];
  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = views.findIndex((v) => v.key === active);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % views.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + views.length) % views.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = views.length - 1;
    else return;

    event.preventDefault();
    const target = views[next];
    if (!target) return;
    select(target.key);
    tablistRef.current
      ?.querySelector<HTMLButtonElement>(`[data-tab="${target.key}"]`)
      ?.focus();
  };

  const needle = query.trim().toLowerCase();
  const rows = (view?.rows ?? []).filter(
    (row) =>
      needle === "" ||
      `${row.disciplineName} ${row.names} ${row.category}`
        .toLowerCase()
        .includes(needle),
  );

  return (
    <div>
      {/* ── Tabs ─────────────────────────────────────────────────────── */}
      <div className="tab-scroll relative">
        <div
          ref={tablistRef}
          role="tablist"
          onKeyDown={onKeyDown}
          className="border-hairline-on-ink -mx-5 flex gap-1 overflow-x-auto border-b px-5 sm:mx-0 sm:px-0"
        >
          {views.map((v) => {
            const isActive = v.key === active;
            return (
              <button
                key={v.key}
                type="button"
                role="tab"
                data-tab={v.key}
                id={`tab-${v.key}`}
                aria-selected={isActive}
                aria-controls="record-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(v.key)}
                className={cn(
                  "text-ui-sm relative shrink-0 px-3 py-3 whitespace-nowrap transition-colors duration-200",
                  isActive ? "text-page-text" : "text-muted-on-ink hover:text-page-text",
                )}
              >
                {v.label}
                {isActive ? (
                  <motion.span
                    layoutId="records-tab-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="bg-motion-accent absolute inset-x-3 -bottom-px h-0.5"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Suche ────────────────────────────────────────────────────── */}
      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
        <label className="block">
          <span className="sr-only">{t("filterSearch")}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("filterSearchHint")}
            className="border-hairline-on-ink text-page-text placeholder:text-muted-on-ink text-ui-sm w-64 border bg-transparent px-3 py-2"
          />
        </label>
        <p
          aria-live="polite"
          className="font-data text-data-xs text-muted-on-ink uppercase"
        >
          {t("filterCount", { count: rows.length })}
        </p>
      </div>

      {/* ── Tabelle ──────────────────────────────────────────────────── */}
      <div
        id="record-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="mt-4"
      >
        {rows.length === 0 ? (
          <p className="text-muted-on-ink text-ui py-12">{labels.empty}</p>
        ) : (
          <table className="record-table w-full border-collapse text-left">
            <thead>
              <tr className="border-hairline-on-ink border-b">
                <th scope="col" className="record-col-discipline">{labels.discipline}</th>
                <th scope="col" className="record-col-performance">{labels.performance}</th>
                <th scope="col" className="record-col-name">{labels.name}</th>
                <th scope="col" className="record-col-category">{labels.category}</th>
                <th scope="col" className="record-col-year">{labels.year}</th>
              </tr>
            </thead>
            {/*
              layout auf dem Koerper: faellt eine Disziplin in einer Ansicht
              weg, ruecken die uebrigen weich nach, statt zu springen.
            */}
            {/*
              Kein AnimatePresence um die Zeilen: eine <tr>, die noch
              austritt, belegt weiterhin eine Tabellenzeile — bleibt die
              Animation stehen (gedrosselter Tab, unterbrochenes Rendern),
              stehen alte und neue Werte gleichzeitig da. Genau das ist beim
              Test passiert: 36 Zeilen statt 18, gemischt aus zwei Ansichten.

              Zeilen, die es in der neuen Ansicht nicht gibt, verschwinden
              deshalb sofort; die uebrigen behalten ihre layoutId und ruecken
              weich nach.
            */}
            <motion.tbody layout={!reduced}>
              {rows.map((row, index) => (
                  <motion.tr
                    key={row.disciplineKey}
                    layout={!reduced}
                    layoutId={reduced ? undefined : `record-${row.disciplineKey}`}
                    transition={{
                      layout: { type: "spring", stiffness: 380, damping: 32 },
                    }}
                    className="record-row border-hairline-on-ink border-b"
                    data-record-row=""
                    data-discipline={row.disciplineKey}
                    data-category={row.category}
                    data-decade={Math.floor(row.year / 10) * 10}
                    data-search={`${row.disciplineName} ${row.names}`.toLowerCase()}
                  >
                    <td className="record-col-discipline">{row.disciplineName}</td>
                    {/*
                      §8: Die Werte kreuzblenden mit 180ms und 8px Versatz,
                      gestaffelt um 15ms je Zeile von oben nach unten — der
                      Blick folgt dem Wechsel wie einem Feld, das durchs Ziel
                      laeuft. Der Schluessel enthaelt den Wert, damit beim
                      Tabwechsel wirklich ein neues Element entsteht.
                    */}
                    <AnimatedCell
                      value={row.performanceRaw}
                      index={index}
                      className="record-col-performance"
                    />
                    <AnimatedCell
                      value={row.names}
                      index={index}
                      className="record-col-name record-name"
                    />
                    <AnimatedCell
                      value={row.category}
                      index={index}
                      className="record-col-category"
                    />
                    <td className="record-col-year">
                      <span className="flex items-center justify-end gap-2">
                        {row.isNew ? (
                          <span className="font-data text-data-xs text-rec-new uppercase">
                            {labels.isNew}
                          </span>
                        ) : null}
                        {row.isNationalRecord || row.isEspoirsBest ? (
                          <span
                            title={
                              row.isNationalRecord ? labels.national : labels.espoirs
                            }
                            className={cn(
                              "font-data text-data-xs inline-flex items-center px-1.5 py-0.5 leading-none",
                              row.isNationalRecord
                                ? "bg-rec-national text-ink-text font-semibold"
                                : "text-rec-espoirs border-rec-espoirs/50 border",
                            )}
                          >
                            {row.isNationalRecord ? "**" : "*"}
                          </span>
                        ) : null}
                        <span className="tabular-nums">{row.year}</span>
                      </span>
                    </td>
                  </motion.tr>
                ))}
            </motion.tbody>
          </table>
        )}
      </div>

    </div>
  );
}

function AnimatedCell({
  value,
  index,
  className,
}: {
  value: string;
  index: number;
  className: string;
}) {
  return (
    <td className={className}>
      {/*
        Der Wechsel laeuft als CSS-Animation, nicht ueber AnimatePresence.

        Vorher stand hier <AnimatePresence mode="wait">: erst den alten Wert
        austreten lassen, dann den neuen einhaengen. Genau das ist beim Test
        haengengeblieben — meldet die Austrittsanimation ihr Ende nicht (und
        das tut sie unter einem Elternteil, das gleichzeitig eine
        layout-Animation faehrt, zuverlaessig unzuverlaessig), wird der neue
        Wert nie eingehaengt. Ergebnis: Leeschtung, Numm und Kategorie blieben
        nach dem Tabwechsel leer, bis irgendein fremder Re-Render die Tabelle
        anfasste.

        Ein Schluesselwechsel plus CSS-Keyframe kann das nicht: die Animation
        beginnt bei opacity 0 und endet bei 1, und sie endet immer — daran ist
        kein JavaScript beteiligt. Der Wert steht auch dann im Markup, wenn
        die Animation gar nicht laeuft.
      */}
      <span
        key={value}
        className="record-cell-in block"
        style={{ ["--row" as string]: index }}
      >
        {value}
      </span>
    </td>
  );
}
