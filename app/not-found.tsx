import { NotFoundView } from "@/components/layout/NotFoundView";

/**
 * Die 404 des Projekts.
 *
 * Sie rendert bewusst nicht die Huelle aus SiteShell. Next 15.5 hebt jede
 * notFound() ueber alle Layouts hinaus und rendert sie in einer eigenen
 * HTML-Huelle; Navigation und Footer kaemen dort nie an. Statt das zu
 * verschleiern, traegt NotFoundView alles selbst: Schriftvariablen, Bahn,
 * Wortmarke und die Wege zurueck. Das Stylesheet wird von Next mitgeladen,
 * die Seite steht damit vollstaendig.
 */
export default function NotFound() {
  return <NotFoundView />;
}
