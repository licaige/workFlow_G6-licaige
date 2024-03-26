import babel from '@rollup/plugin-babel'
import vuePlugin from 'rollup-plugin-vue'
const es = {
  input: './test/src/entry.js',
  output: {
    file: './test/dist/index.bundle.js',
    name: 'Element',
    format: 'es',
    globals: {
      vue: 'Vue'
    }
  },
  external: ['vue'],
  plugins: [
    babel(),
    vuePlugin({
      css: true
    })
  ]
}
const iife = {
  input: './test/src/entry.js',
  output: {
    file: './test/dist/index.js',
    name: 'Element',
    format: 'iife',
    globals: {
      vue: 'Vue'
    }
  },
  external: ['vue'],
  plugins: [
    babel(),
    vuePlugin({
      css: true
    })
  ]
}
import { terser } from 'rollup-plugin-terser'
const minEs = {
  input: './test/src/entry.js',
  external: ['vue'],
  output: {
    file: './test/dist/index.min.js',
    name: 'Element',
    format: 'umd'
  },
  plugins: [
    babel(),
    vuePlugin({
      css: true
    }),
    terser()
  ]
}

const cjs = {
  input: './test/src/entry.js',
  external: ['vue'],
  output: {
    file: './test/dist/index.cjs.js',
    name: 'Element',
    format: 'cjs'
  },
  plugins: [
    babel(),
    vuePlugin({
      css: true
    })
  ]
}
export default [es, iife, minEs, cjs]
