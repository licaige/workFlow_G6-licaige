module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    // "plugin:prettier/recommended",
    "prettier",
  ],
  overrides: [],
  // "parser": "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "no-unused-vars": "off",
    "no-self-assign": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-this-alias": ["off"],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-function": "off",
    semi: 0,
  },
};
