import esbuild from 'rollup-plugin-esbuild' // ts变
import vue from 'rollup-plugin-vue' // vue 变成js
import scss from 'rollup-plugin-scss' // scss 变成js
import dartSass from 'sass';  // 支持scss插件
import { terser } from "rollup-plugin-terser" // 丑化js

export default {
  input: 'src/lib/index.ts',
  output: [{
    globals: {
      vue: 'Vue'
    },
    name: 'Vue3 UI',
    file: 'dist/lib/vue3-ui.js',
    format: 'umd',
    plugins: [terser()]
  }, {
    name: 'Vue3 UI',
    file: 'dist/lib/vue3-ui.esm.js',
    format: 'es',
    plugins: [terser()]
  }],
  plugins: [
    scss({ include: /\.scss$/, sass: dartSass }),
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015' 
    }),
    vue({
      include: /\.vue$/,
    })
  ],
}