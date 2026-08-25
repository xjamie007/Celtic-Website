import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { requireFeature } from "@/lib/features";
import { LaneSection } from "@/components/lane/LaneSection";
import { Link } from "@/i18n/navigation";
import { getNews } from "@/lib/data/news";
import { localized } from "@/lib/localized";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("news") };
}

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  /* §2: abgeschaltet heisst 404, nicht leere Seite. */
  await requireFeature("news");

  const t = await getTranslations("news");
  const tn = await getTranslations("nav");
  const activeLocale = await getLocale();
  const items = await getNews();

  const date = new Intl.DateTimeFormat(activeLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <LaneSection id="aktuellt" labelledBy="aktuellt-title">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-24 sm:px-8">
        <h1 id="aktuellt-title" className="text-h1 wdth-112">
          {tn("news")}
        </h1>

        {items.length === 0 ? (
          /* §12: Leere Zustaende sind Einladungen, keine Sackgassen. Hier
             steht die Wahrheit — die alte Seite hat keine einzige Meldung —
             und daneben der Weg zu dem, was es wirklich gibt. */
          <div className="border-hairline-on-page mt-12 border-t pt-8">
            <p className="text-body-lg text-muted-on-page max-w-prose">
              {t("empty")}
            </p>
            <p className="mt-6">
              <Link
                href="/rekorder"
                className="text-ui-lg decoration-hairline-on-page hover:decoration-motion-accent hover:text-accent-on-page underline decoration-2 underline-offset-8 transition-colors duration-200"
              >
                {tn("records")} &rarr;
              </Link>
            </p>
          </div>
        ) : (
          <ul className="border-hairline-on-page mt-12 border-t">
            {items.map((item) => (
              <li key={item.id} className="border-hairline-on-page border-b py-6">
                <p className="font-data text-data-xs text-muted-on-page uppercase">
                  <time dateTime={item.publishedAt}>
                    {date.format(new Date(item.publishedAt))}
                  </time>
                </p>
                <h2 className="text-h3 wdth-100 mt-2">
                  <Link href={`/news/${item.slug}`}>
                    {localized(item.title, activeLocale)}
                  </Link>
                </h2>
                {item.excerpt ? (
                  <p className="text-muted-on-page text-ui-sm mt-2 max-w-prose">
                    {localized(item.excerpt, activeLocale)}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </LaneSection>
  );
}
