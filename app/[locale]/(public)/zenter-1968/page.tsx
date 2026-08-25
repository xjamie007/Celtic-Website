import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { requireFeature } from "@/lib/features";
import { LaneSection } from "@/components/lane/LaneSection";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("history") };
}

/**
 * /zenter-1968 (§9) — die Uebersicht ueber die fuenf Kapitel.
 *
 * Die Kapitel sind durchnummeriert wie Etappen. Das ist nicht Dekoration:
 * die Geschichte ist chronologisch erzaehlt, und wer bei Kapitel drei
 * einsteigt, soll sehen, dass davor zwei liegen.
 */
export default async function HistoryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  /* §2: abgeschaltet heisst 404, nicht leere Seite. */
  await requireFeature("history");

  const t = await getTranslations("history");
  const tn = await getTranslations("nav");

  return (
    <LaneSection id="geschicht" labelledBy="geschicht-title">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-24 sm:px-8">
        <h1 id="geschicht-title" className="text-h1 wdth-112">
          {tn("history")}
        </h1>
        <p className="text-body-lg text-muted-on-page mt-4 max-w-prose">
          {t("intro")}
        </p>

        <Reveal>
          <ol className="border-hairline-on-page mt-12 border-t">
            {site.historyChapters.map((chapter, index) => (
              <li
                key={chapter}
                className="record-row border-hairline-on-page rise border-b"
                style={{ "--i": index } as React.CSSProperties}
              >
                <Link
                  href={`/zenter-1968/${chapter}`}
                  className="grid grid-cols-[3rem_1fr] items-baseline gap-x-6 py-6"
                >
                  <span className="font-data text-data-xs text-muted-on-page tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-h3 wdth-100 record-name font-display font-extrabold">
                    {t(chapter)}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </LaneSection>
  );
}
