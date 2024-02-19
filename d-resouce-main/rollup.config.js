import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { eslint } from "rollup-plugin-eslint";
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "src/main.js",
  output: [
    {
      file: "dist/d-resouce.umd.js",
      format: "umd",
      name: "dResouce",
    },
    {
      file: "dist/d-resouce.es.js",
      format: "es",
    },
    {
      file: "dist/d-resouce.cjs.js",
      format: "cjs",
    },
  ],
  plugins: [
    resolve({}),
    commonjs(),
    eslint({
      include: ["src/**"],
      exclude: ["node_modules/**"],
    }),
    babel({
      exclude: "node_modules/**", // exclude的配置选项来忽略掉 node_modules目录。
    }),
    uglify(),
  ],
};
