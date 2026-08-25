/**
 * Ist eine Supabase-Instanz hinterlegt?
 *
 * Solange nicht, liest die Seite aus den importierten Dateien in data/. Das
 * ist kein Notbehelf, sondern Absicht: der Pitch-Build muss auf jedem Rechner
 * ohne Zugangsdaten laufen, und die Bestandsdaten sind dieselben, die der
 * Seed in die Datenbank schreibt. Wer die Umgebungsvariablen setzt, schaltet
 * die Quelle um — ohne dass sich eine Komponente aendert.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;
