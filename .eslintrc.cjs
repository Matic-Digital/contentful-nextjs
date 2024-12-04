/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "@eslint-react"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
  overrides: [
    // https://eslint-react.xyz/docs/installation
    // directories in components
    {
      files: ["src/components/**"],
      rules: {
        "@eslint-react/naming-convention/filename": ["error", "kebab-case"],
      },
    },
    // custom components
    {
      files: ["src/components/**/*.{ts,tsx}"],
      rules: {
        "@eslint-react/naming-convention/filename": ["error", "PascalCase"],
      },
    },
    // shadcn components installed via CLI
    {
      files: ["src/components/ui/*.{ts,tsx}"],
      rules: {
        "@eslint-react/naming-convention/filename": ["error", "kebab-case"],
      },
    },
    // hooks
    {
      files: ["src/hooks/**/use*.{ts,tsx}"],
      rules: {
        "@eslint-react/naming-convention/filename": ["error", "camelCase"],
      },
    },
    // shadcn hooks
    {
      files: ["src/hooks/**/use-*.{ts,tsx}"],
      rules: {
        "@eslint-react/naming-convention/filename": ["error", "kebab-case"],
      },
    },
  ],
};
module.exports = config;
