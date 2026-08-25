import { redirect } from "next/navigation";

/**
 * Die Anmeldung liegt jetzt unter /login und ist oeffentlich erreichbar (§3).
 * Diese Route bleibt als Weiterleitung stehen: gespeicherte Lesezeichen und
 * alte Links sollen weiter funktionieren.
 */
export default function AdminLoginRedirect(): never {
  redirect("/login");
}
