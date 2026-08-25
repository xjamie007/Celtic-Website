"use client";

import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export type RecordPanel = {
  readonly key: string;
  readonly label: string;
  readonly node: ReactNode;
};

/**
 * Tabs und Filterleiste ueber den Rekordtabellen (§10).
 *
 * Die Tabellen selbst kommen fertig vom Server (§14). Diese Komponente
 * bekommt sie als Prop und ruehrt ihren Inhalt nicht an — sie blendet Zeilen
 * aus, die nicht passen. Deshalb braucht der Browser keine zweite Kopie der
 * Rekorddaten: die Merkmale stehen als data-Attribute an den Zeilen.
 *
 * Der aktive Tab landet als Fragment in der URL. Damit ist "Piste Hären"
 * teilbar und ueberlebt einen Reload, ohne dass die Seite dynamisch gerendert
 * werden muesste — ein Suchparameter haette genau das erzwungen.
 */
export function RecordBrowser({
  panels,
  categories,
  decades,
}: {
  panels: readonly RecordPanel[];
  categories: readonly string[];
  decades: readonly number[];
}) {
  const t = useTranslations("records");
  const containerRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);

  const firstKey = panels[0]?.key ?? "";
  const [active, setActive] = useState(firstKey);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [decade, setDecade] = useState("");
  const [visible, setVisible] = useState<number | null>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && panels.some((p) => p.key === hash)) setActive(hash);
  }, [panels]);

  const selectTab = useCallback((key: string) => {
    setActive(key);
    window.history.replaceState(null, "", `#${key}`);
  }, []);

  const filters = useMemo(
    () => ({ search: search.trim().toLowerCase(), category, decade }),
    [search, category, decade],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let shown = 0;
    for (const row of container.querySelectorAll<HTMLElement>("[data-record-row]")) {
      const matches =
        (filters.search === "" ||
          (row.dataset.search ?? "").includes(filters.search)) &&
        (filters.category === "" || row.dataset.category === filters.category) &&
        (filters.decade === "" || row.dataset.decade === filters.decade);

      row.hidden = !matches;
      if (matches && row.closest("[data-panel]")?.getAttribute("data-panel") === active) {
        shown += 1;
      }
    }
    setVisible(shown);
  }, [filters, active]);

  const onTablistKeyDown = (event: React.KeyboardEvent) => {
    const index = panels.findIndex((p) => p.key === active);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % panels.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + panels.length) % panels.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = panels.length - 1;
    else return;

    event.preventDefault();
    const target = panels[next];
    if (!target) return;
    selectTab(target.key);
    tablistRef.current
      ?.querySelector<HTMLButtonElement>(`[data-tab="${target.key}"]`)
      ?.focus();
  };

  const hasFilter =
    filters.search !== "" || filters.category !== "" || filters.decade !== "";

  return (
    <div ref={containerRef}>
      {/* ── Tabs ─────────────────────────────────────────────────────── */}
      <div
        ref={tablistRef}
        role="tablist"
        onKeyDown={onTablistKeyDown}
        className="border-hairline-on-ink -mx-5 flex gap-1 overflow-x-auto border-b px-5 sm:mx-0 sm:px-0"
      >
        {panels.map((panel) => {
          const isActive = panel.key === active;
          return (
            <button
              key={panel.key}
              type="button"
              role="tab"
              data-tab={panel.key}
              id={`tab-${panel.key}`}
              aria-selected={isActive}
              aria-controls={`panel-${panel.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(panel.key)}
              className={cn(
                "text-ui-sm relative shrink-0 px-3 py-3 whitespace-nowrap transition-colors duration-200",
                isActive
                  ? "text-page-text"
                  : "text-muted-on-ink hover:text-page-text",
              )}
            >
              {panel.label}
              {isActive ? (
                <span className="bg-motion-accent absolute inset-x-3 -bottom-px h-0.5" />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* ── Filter (§10: clientseitig, ohne Reload) ───────────────────── */}
      <div className="mt-6 flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="font-data text-data-xs text-muted-on-ink uppercase">
            {t("filterSearch")}
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("filterSearchHint")}
            className="border-hairline-on-ink text-page-text placeholder:text-muted-on-ink text-ui-sm w-56 border bg-transparent px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-data text-data-xs text-muted-on-ink uppercase">
            {t("filterCategory")}
          </span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="border-hairline-on-ink text-page-text text-ui-sm border bg-transparent px-3 py-2"
          >
            <option value="">{t("filterAll")}</option>
            {categories.map((value) => (
              <option key={value} value={value} className="text-ink-text">
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-data text-data-xs text-muted-on-ink uppercase">
            {t("filterDecade")}
          </span>
          <select
            value={decade}
            onChange={(event) => setDecade(event.target.value)}
            className="border-hairline-on-ink text-page-text text-ui-sm border bg-transparent px-3 py-2"
          >
            <option value="">{t("filterAll")}</option>
            {decades.map((value) => (
              <option key={value} value={value} className="text-ink-text">
                {value}er
              </option>
            ))}
          </select>
        </label>

        {hasFilter ? (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("");
              setDecade("");
            }}
            className="font-data text-data-xs text-muted-on-ink hover:text-page-text py-2 uppercase transition-colors duration-200"
          >
            {t("filterReset")}
          </button>
        ) : null}

        <p
          aria-live="polite"
          className="font-data text-data-xs text-muted-on-ink ml-auto py-2 uppercase"
        >
          {visible === null ? "" : t("filterCount", { count: visible })}
        </p>
      </div>

      {/* ── Tabellen ─────────────────────────────────────────────────── */}
      <div className="mt-4">
        {panels.map((panel) => (
          <div
            key={panel.key}
            id={`panel-${panel.key}`}
            data-panel={panel.key}
            role="tabpanel"
            aria-labelledby={`tab-${panel.key}`}
            hidden={panel.key !== active}
          >
            {panel.node}
          </div>
        ))}
      </div>
    </div>
  );
}
