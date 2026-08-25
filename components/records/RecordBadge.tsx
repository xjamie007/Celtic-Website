import { getTranslations } from "next-intl/server";

import { cn } from "@/lib/utils";

/**
 * Die Marker aus §10, in der Formatkonvention der alten Seite:
 * ** = Landesrekord, * = Espoirs-Bestleistung.
 *
 * Beide Badges setzen einen dunklen Untergrund voraus — Rekordtabellen laufen
 * auf blue-deep. Das ist keine Geschmacksfrage: Gold auf Papier kaeme auf
 * rund 1.3:1 und waere unlesbar, und ein weisses Espoirs-Badge auf Weiss gaebe
 * es schlicht nicht. Auf blue-deep leuchtet das Landesrekord-Gold — und genau
 * das soll es, denn es ist der einzige Ort im ganzen Projekt, an dem Gelb
 * ueberhaupt vorkommt (§3).
 */
export async function RecordBadge({
  national,
  espoirs,
}: {
  national: boolean;
  espoirs: boolean;
}) {
  const t = await getTranslations("records");
  if (!national && !espoirs) return null;

  return (
    <span
      title={national ? t("national") : t("espoirs")}
      className={cn(
        "font-data text-data-xs inline-flex items-center px-1.5 py-0.5 leading-none",
        national
          ? "bg-rec-national text-ink-text font-semibold"
          : "text-rec-espoirs border-rec-espoirs/50 border",
      )}
    >
      {national ? "**" : "*"}
      <span className="sr-only">
        {" "}
        {national ? t("national") : t("espoirs")}
      </span>
    </span>
  );
}

/** §10: Ein Rekord juenger als 90 Tage traegt einen pulsierenden Punkt. */
export async function NewRecordMark() {
  const t = await getTranslations("records");

  return (
    <span className="font-data text-data-xs text-rec-new inline-flex items-center gap-1.5 uppercase">
      <span className="record-pulse bg-rec-new-dot block h-1.5 w-1.5 rounded-full" />
      {t("new")}
    </span>
  );
}
