module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    extraFileExtensions: ".mjs",
    project: "tsconfig.json",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      module: true,
    },
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "jest-dom",
    "jsx-a11y",
    "prettier",
    "react-hooks",
    "testing-library",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest-dom/recommended",
    "plugin:jsx-a11y/strict",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:testing-library/react",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  rules: {
    // this rule was deprecated in favor of another
    // not sure why it is still giving errors
    "jsx-a11y/label-has-for": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, variables: false },
    ],
    // disabling this bc it is checked by typescript so it is
    // redundant and doesn't function properly
    "react/prop-types": 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        // ignore underscore _vars or jsx imports or React imports
        argsIgnorePattern: "^_.*",
        varsIgnorePattern: "^jsx$|^React$|^_.*",
        ignoreRestSiblings: true,
      },
    ],
    "no-underscore-dangle": 0,
    // these are meant to allow jsx to mark react as used. Not working right now though
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error",
    // Allow " and ' in jsx
    "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
    // disable this rule because it is unnecessarily strict for TS
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    // if we want this, we should turn disallow any in tsconfig not here
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-var-requires": 0,
    // Disable this rule because server API uses a lot of snake_case
    camelcase: 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/prefer-namespace-keyword": "error",
    eqeqeq: ["error", "smart"],
    "id-blacklist": [
      "error",
      "any",
      "Number",
      "number",
      "String",
      "string",
      "Boolean",
      "boolean",
      "Undefined",
    ],
    "id-match": "error",
    "no-eval": "error",
    "no-redeclare": "error",
    "no-var": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
