import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    /*
      Bauergebnisse sind kein Quelltext. Die Sternchen-Formen fangen
      ausserdem die Kopien ab, die macOS beim Synchronisieren anlegt
      ("out 2") — sonst prueft ESLint ploetzlich 53 MB minifiziertes
      JavaScript und meldet Hunderte Warnungen, die niemand geschrieben hat.
    */
    ignores: [
      "node_modules/**",
      ".next*/**",
      "out*/**",
      "build/**",
      ".static-export-build*/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
