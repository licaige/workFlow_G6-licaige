import { name } from "./package.json";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { babel } from "@rollup/plugin-babel";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default {
  input: "main.ts",
  output: [
    {
      name: `${name}`,
      file: `dist/${name}.umd.js`,
      format: "umd",
      sourcemap: true,
      exports: "named",
      globals: {
        axios: "axios",
      },
    },
    {
      file: `dist/${name}.cjs.js`,
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [
    nodePolyfills(),
    resolve(),
    commonjs(),
    json(),
    typescript(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: [".ts"],
    }),
  ],
  external: ["axios"],
};
