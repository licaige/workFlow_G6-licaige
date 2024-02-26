/*
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-09 22:36:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-26 17:46:50
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    semi: ["error", "never"],
    "max-len": ["error", { code: 300 }],
    quotes: ["warn", "single"],
    "no-param-reassign": ["error", { props: false }],
    "import/no-cycle": [0, { maxDepth: 10 }],
    "no-useless-return": 0
  },
};
