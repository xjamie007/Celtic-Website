import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LaneSection } from "@/components/lane/LaneSection";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/config/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("clubTraining") };
}

/**
 * /club/training (§4)
 *
 * Die vier Leichtathletikgruppen und Tri-Celtic — gleichwertig, nicht als
 * Fussnote. Der Triathlon ist ein eigenstaendiger Teil des Vereins mit
 * eigenen Trainern und eigener Seite; ihn unter "sonstiges" zu fuehren waere
 * schlicht falsch.
 *
 * §1: drei Informationsebenen je Gruppe — Name, Alter, Trainer:innen. Alles
 * Weitere steht auf /club/trainer.
 */
export default async function TrainingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("training");
  const tn = await getTranslations("nav");

  const athletics = site.trainingGroups.filter((g) => g.section === "athletics");
  const triathlon = site.trainingGroups.filter((g) => g.section === "triathlon");

  const locationName = (key: string) =>
    site.trainingLocations.find((l) => l.key === key)?.name ?? key;

  const groupName = (key: string) =>
    site.trainingGroups.find((g) => g.key === key)?.name ?? key;

  return (
    <>
      <LaneSection id="gruppen" labelledBy="gruppen-title" className="bg-page">
        <div className="section-space-top mx-auto max-w-[1240px] px-5 pb-16 sm:px-8">
          <h1 id="gruppen-title" className="text-h1 wdth-112">
            {tn("clubTraining")}
          </h1>
          <p className="text-body-lg text-muted-on-page mt-4 max-w-prose">
            {t("groupsIntro")}
          </p>

          <Reveal>
            <ul className="mt-12">
              {athletics.map((group, index) => (
                <li
                  key={group.key}
                  className="border-hairline-on-page rise border-t py-8"
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-[1fr_auto]">
                    <h2 className="text-h3 wdth-100 font-display font-bold">
                      {group.name}
                    </h2>
                    {group.ages ? (
                      <p className="font-data text-data-xs text-muted-on-page uppercase sm:text-right">
                        {group.ages}
                      </p>
                    ) : null}
                  </div>
                  {group.categories ? (
                    <p className="text-muted-on-page text-ui-sm mt-2">
                      {group.categories}
                    </p>
                  ) : null}
                  {group.coaches.length > 0 ? (
                    <p className="text-ui-sm mt-3">
                      <span className="font-data text-data-xs text-muted-on-page mr-2 uppercase">
                        {t("coachesLabel")}
                      </span>
                      {group.coaches.join(" · ")}
                    </p>
                  ) : null}
                  {/* §4: Der Hinweis aus der Liichtathletikschoul verbindet
                      beide Sektionen und gehoert genau hierhin. */}
                  {group.key === "liichtathletikschoul" ? (
                    <p className="border-motion-accent text-ui-sm text-muted-on-page mt-4 border-l-2 py-1 pl-4">
                      {t("schoolNote")}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </LaneSection>

      {/* ── Triathlon ────────────────────────────────────────────────── */}
      <LaneSection id="triathlon" labelledBy="triathlon-title" className="bg-deep text-page-text">
        <Reveal>
          <div className="section-space mx-auto max-w-[1240px] px-5 sm:px-8">
            <h2
              id="triathlon-title"
              className="font-data text-data-xs text-muted-on-ink rise uppercase"
            >
              {t("sectionTriathlon")}
            </h2>

            {triathlon.map((group, index) => (
              <div key={group.key} className="rise mt-4" style={{ "--i": index + 1 } as React.CSSProperties}>
                <p className="text-h2 wdth-100 font-display font-bold">
                  {group.name}
                </p>
                {group.categories ? (
                  <p className="text-muted-on-ink text-ui mt-3">{group.categories}</p>
                ) : null}
                {group.coaches.length > 0 ? (
                  <p className="text-ui-sm mt-4">
                    <span className="font-data text-data-xs text-muted-on-ink mr-2 uppercase">
                      {t("coachesLabel")}
                    </span>
                    {group.coaches.join(" · ")}
                  </p>
                ) : null}
                <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
                  {group.href ? (
                    <a
                      href={group.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ui decoration-hairline-on-ink hover:decoration-motion-accent hover:text-accent-on-dark underline decoration-2 underline-offset-8 transition-colors duration-200"
                    >
                      Tri-Celtic ↗
                    </a>
                  ) : null}
                  <a
                    href="https://www.triathlon.lu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-data text-data-xs text-muted-on-ink hover:text-white uppercase transition-colors duration-200"
                  >
                    triathlon.lu ↗
                  </a>
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </LaneSection>

      {/* ── Zeiten und Orte ──────────────────────────────────────────── */}
      <LaneSection id="zaiten" labelledBy="zaiten-title" className="bg-page">
        <Reveal>
          <div className="section-space mx-auto max-w-[1240px] px-5 sm:px-8">
            <h2
              id="zaiten-title"
              className="font-data text-data-xs text-muted-on-page rise uppercase"
            >
              {t("timesTitle")}
            </h2>

            <table className="mt-6 w-full border-collapse text-left">
              <thead className="sr-only">
                <tr>
                  <th scope="col">{t("colDay")}</th>
                  <th scope="col">{t("colTime")}</th>
                  <th scope="col">{t("colPlace")}</th>
                  <th scope="col">{t("colGroup")}</th>
                </tr>
              </thead>
              <tbody>
                {site.trainingTimes.map((slot) => (
                  <tr key={slot.dayKey} className="border-hairline-on-page border-b">
                    <td className="text-ui py-4 pr-6 align-baseline font-medium">
                      {t(`day_${slot.dayKey}`)}
                    </td>
                    <td className="font-data text-ui-sm py-4 pr-6 align-baseline tabular-nums">
                      {slot.time}
                    </td>
                    <td className="text-ui-sm text-muted-on-page py-4 pr-6 align-baseline">
                      {slot.locations.map(locationName).join(" · ")}
                    </td>
                    <td className="text-ui-sm text-muted-on-page py-4 align-baseline">
                      {slot.groups.length === 0
                        ? t("allGroups")
                        : slot.groups.map(groupName).join(" · ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-muted-on-page text-ui-sm mt-6">{t("noHoliday")}</p>

            <h2 className="font-data text-data-xs text-muted-on-page mt-16 uppercase">
              {t("placesTitle")}
            </h2>
            <ul className="mt-4">
              {site.trainingLocations.map((place) => (
                <li key={place.key} className="border-hairline-on-page border-b py-4">
                  <span className="text-ui block">{place.name}</span>
                  <span className="text-muted-on-page text-ui-sm">
                    {place.address}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </LaneSection>
    </>
  );
}
