import { getTranslations } from "next-intl/server";

import { PageContent } from "@/components/content/PageContent";
import { LaneSection } from "@/components/lane/LaneSection";
import { Reveal } from "@/components/motion/Reveal";
import { getPageContent } from "@/lib/data/pages";

/**
 * Eine Seite, deren Inhalt aus dem Import kommt.
 *
 * Der Titel steht in den Messages und ist damit dreisprachig; der Fliesstext
 * kommt aus dem Bestand und ist vorerst luxemburgisch (§11: stiller
 * Rueckfall auf lb). Fehlt der Inhalt ganz, steht wenigstens der Titel — eine
 * Seite ohne Ueberschrift waere schlechter als eine kurze.
 */
export async function ContentPage({
  titleKey,
  namespace = "nav",
  contentSlug,
  children,
}: {
  titleKey: string;
  namespace?: string;
  contentSlug: string;
  children?: React.ReactNode;
}) {
  const t = await getTranslations(namespace);
  const content = await getPageContent(contentSlug);

  return (
    <LaneSection id="inhalt-uewen" labelledBy="page-title">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-24 sm:px-8">
        <h1 id="page-title" className="text-h1 wdth-112">
          {t(titleKey)}
        </h1>

        {content && content.blocks.length > 0 ? (
          <Reveal>
            <div className="rise mt-12">
              <PageContent blocks={content.blocks} />
            </div>
          </Reveal>
        ) : null}

        {children}
      </div>
    </LaneSection>
  );
}
