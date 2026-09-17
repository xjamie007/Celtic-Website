#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * scripts/create-admin.mjs — ein Zugang fuer den Redaktionsbereich
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Der Redaktionsbereich laesst nur herein, wer in profiles steht (§12). Eine
 * frische Datenbank hat diese Tabelle leer — wer sich anmeldet, bekommt
 * korrekt "Fuer dieses Konto ist noch keine Rolle hinterlegt" und kommt nicht
 * weiter. Dieses Skript legt den ersten Zugang an.
 *
 * Es arbeitet nur gegen die lokale Instanz (npx supabase start) und holt sich
 * die Schluessel von dort. Fuer die spaetere echte Instanz gilt derselbe Weg
 * ueber die Oberflaeche von Supabase; hier geht es um den Rechner, auf dem
 * entwickelt und vorgefuehrt wird.
 *
 * Aufruf:  npm run admin:create -- comite@celtic.lu "Comité CELTIC" admin
 *
 * Rollen: admin (alles), editor (Inhalte), author (nur eigene).
 */

import { execFileSync } from "node:child_process";

const [email, name = email, role = "admin"] = process.argv.slice(2);

if (!email || !email.includes("@")) {
  console.error(
    'Aufruf: npm run admin:create -- <e-mail> ["Name"] [admin|editor|author]',
  );
  process.exit(1);
}

if (!["admin", "editor", "author"].includes(role)) {
  console.error(`Unbekannte Rolle "${role}". Erlaubt: admin, editor, author.`);
  process.exit(1);
}

/* Die Schluessel stehen nicht im Repo — sie kommen von der laufenden
   Instanz. Laeuft keine, sagt supabase status das deutlich genug. */
let status;
try {
  status = JSON.parse(
    execFileSync("npx", ["--yes", "supabase", "status", "-o", "json"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }),
  );
} catch {
  console.error(
    "Keine lokale Supabase-Instanz gefunden. Erst `npx supabase start` laufen lassen.",
  );
  process.exit(1);
}

const apiUrl = status.API_URL;
const serviceKey = status.SERVICE_ROLE_KEY;
const headers = {
  apikey: serviceKey,
  Authorization: `Bearer ${serviceKey}`,
  "Content-Type": "application/json",
};

/** Das Konto anlegen — oder das vorhandene nehmen. */
async function ensureUser() {
  const created = await fetch(`${apiUrl}/auth/v1/admin/users`, {
    method: "POST",
    headers,
    /* Bestaetigt, damit der erste Anmeldelink sofort funktioniert. */
    body: JSON.stringify({ email, email_confirm: true }),
  });

  if (created.ok) return (await created.json()).id;

  const list = await fetch(
    `${apiUrl}/auth/v1/admin/users?filter=${encodeURIComponent(email)}`,
    { headers },
  );
  if (!list.ok) {
    throw new Error(`Konto konnte nicht angelegt werden: ${await created.text()}`);
  }
  const found = (await list.json()).users?.find((u) => u.email === email);
  if (!found) {
    throw new Error(`Konto konnte nicht angelegt werden: ${await created.text()}`);
  }
  return found.id;
}

const userId = await ensureUser();

/*
  Die Rolle wird direkt in der Datenbank hinterlegt, nicht ueber die API.

  Der Grund steht in der Migration 20260822000400_grants.sql: profiles ist
  fuer anon gesperrt, und service_role hat bewusst gar keine Tabellenrechte.
  Das ist richtig so und soll nicht aufgeweicht werden, damit ein
  Hilfsskript bequemer wird. Der erste Zugang ist ohnehin ein Vorgang an der
  Datenbank selbst — genau einmal, von Hand, auf dem eigenen Rechner.
*/
const sql = `
  insert into public.profiles (user_id, name, role)
  values ('${userId}', ${quote(name)}, '${role}')
  on conflict (user_id) do update set name = excluded.name, role = excluded.role;
`;

try {
  execFileSync(
    docker(),
    ["exec", "-i", dbContainer(), "psql", "-U", "postgres", "-d", "postgres", "-v", "ON_ERROR_STOP=1", "-c", sql],
    { stdio: ["ignore", "pipe", "pipe"] },
  );
} catch (error) {
  console.error("Rolle konnte nicht hinterlegt werden:");
  console.error(error.stderr?.toString() ?? error.message);
  process.exit(1);
}

console.log(`Zugang angelegt: ${email} — ${name} (${role})`);
console.log("");
console.log("Anmelden:");
console.log("  1. npm run dev");
console.log("  2. http://localhost:3000/login — Adresse eintragen");
console.log(`  3. Den Link aus dem lokalen Postfach holen: ${status.MAILPIT_URL ?? status.INBUCKET_URL}`);

/* ── Docker finden ──────────────────────────────────────────────────────
   Docker Desktop legt eine Verknuepfung in /usr/local/bin an, die auf das
   Installations-Laufwerk zeigt. Nach dem Auswerfen zeigt sie ins Leere und
   `docker` ist nicht mehr auffindbar, obwohl Docker laeuft. Deshalb wird
   der Pfad in der App als Rueckfall mitgeprueft. */
function docker() {
  const candidates = [
    "docker",
    "/Applications/Docker.app/Contents/Resources/bin/docker",
  ];
  for (const candidate of candidates) {
    try {
      execFileSync(candidate, ["version", "--format", "{{.Server.Version}}"], {
        stdio: "ignore",
      });
      return candidate;
    } catch {
      /* naechster Kandidat */
    }
  }
  console.error(
    "Docker nicht gefunden oder nicht gestartet. Docker Desktop oeffnen und noch einmal versuchen.",
  );
  process.exit(1);
}

/** Der Name des Datenbankcontainers haengt am Ordnernamen — also nachfragen. */
function dbContainer() {
  const names = execFileSync(
    docker(),
    ["ps", "--filter", "name=supabase_db_", "--format", "{{.Names}}"],
    { encoding: "utf8" },
  )
    .split("\n")
    .filter(Boolean);
  if (names.length === 0) {
    console.error("Kein laufender supabase_db-Container. Erst `npx supabase start`.");
    process.exit(1);
  }
  return names[0];
}

/** Einfache Anfuehrungszeichen fuer SQL verdoppeln. */
function quote(value) {
  return `'${value.replaceAll("'", "''")}'`;
}
