import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import path from 'path'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import pkg from '../package.json'
import tsConfig from "../tsconfig.json"
import scss from "rollup-plugin-scss"; // 解析scss
const deps = Object.keys(pkg.dependencies)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vue = require('rollup-plugin-vue')
import { writeFileSync, existsSync, mkdirSync } from "fs";
// import VueJsx from 'unplugin-vue-jsx/rollup'

export default [
  {
    input: path.resolve(__dirname, '../packages/index.ts'),
    output: [
      {
        name: "custom-ui", // 打包完之后的名称
        format: 'es',
        file: pkg.module,
        // sourcemap: true // sourcemap bug调试的时候打开
      }
    ],
    plugins: [
      vue({
        target: 'browser',
        css: false,
        exposeFilename: false
      }),
      // VueJsx(),
      scss({
        output: function (styles) {
          if (!existsSync("lib/")) {
            mkdirSync("lib/");
          }
          writeFileSync("lib/index.css", styles);
        },
      }),
      babel({
        exclude: 'node_modules/**', // 只转译我们的源代码
        runtimeHelpers: true
      }),
      terser(), // 压缩
      nodeResolve(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true // 是否创建 typescript 声明文件
          },
          include: tsConfig.include,
          exclude: tsConfig.exclude
        }
      })
    ],
    external(id) {
      return deps.some(k => new RegExp('^' + k).test(id))
    }
  }
]