import js from "@eslint/js";
import reactApp from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "react-hooks": reactApp,
      "react-refresh": reactRefresh
    },
    rules: {
      ...reactApp.configs.recommended.rules,
      "react-refresh/only-export-components": "warn"
    }
  },
  prettier
];

