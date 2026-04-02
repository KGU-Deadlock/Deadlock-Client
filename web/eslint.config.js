import path from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", ["parent", "sibling"], "index"],
          pathGroups: [
            { pattern: "@/app/**", group: "external", position: "after" },
            { pattern: "@/pages/**", group: "external", position: "after" },
            { pattern: "@/widgets/**", group: "external", position: "after" },
            { pattern: "@/features/**", group: "external", position: "after" },
            { pattern: "@/shared/**", group: "external", position: "after" },
            {
              pattern: "@/components/**",
              group: "external",
              position: "after",
            },
            { pattern: "@/model/**", group: "external", position: "after" },
            { pattern: "@/api/**", group: "external", position: "after" },
            { pattern: "@/utils/**", group: "external", position: "after" },
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
    },
  },
]);
