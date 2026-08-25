import { getTranslations } from "next-intl/server";

/**
 * Der Seitenkopf jeder Unterseite.
 *
 * Bewusst schmal gehalten: Titel, optional ein Lead. Die Bahn traegt die
 * Orientierung, nicht ein dekorativer Kopfbereich. §8 gilt auch hier — wenn
 * man ueberlegt, ob noch ein Element dazukommt, nimmt man stattdessen eins weg.
 */
export async function PageHeader({
  titleKey,
  namespace = "nav",
}: {
  titleKey: string;
  namespace?: string;
}) {
  const t = await getTranslations(namespace);

  return (
    <div className="border-hairline-on-page border-b">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-10 sm:px-8">
        <h1 className="text-h1 wdth-112">{t(titleKey)}</h1>
      </div>
    </div>
  );
}
