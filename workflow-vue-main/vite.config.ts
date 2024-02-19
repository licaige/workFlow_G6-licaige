// import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

const createBanner = () => {
  return `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} workflow-vue
  * @license ${pkg.license}
  */`
}

const isView = process.argv[4] === 'view'

const getBuildConfig = (): any => {
  if (!isView) {
    return {
      rollupOptions: {
        external: [
          'vue',
          'element-plus'
        ],
        output: {
          globals: {
            vue: 'Vue'
          },
          banner: createBanner()
        }
      },
      lib: {
        entry: path.resolve(__dirname, './packages/index.ts'),
        name: 'workflow',
        fileName: 'index',
        formats: ['es', 'umd']
      },
      outDir: path.resolve(__dirname, './dist')
    }
  }
  return {
    outDir: '../dist',
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/workflow-vue/',
  root: process.env.NODE_ENV !== 'production' ? path.resolve(__dirname, './example') : undefined,
  server: {
    port: 5555,
    host: '0.0.0.0'
  },
  plugins: [
    vue(),
    !isView && dts({
      include: ['./packages'],
      outputDir: './types',
      skipDiagnostics: false,
      logDiagnostics: true
    })
  ],
  build: getBuildConfig()
})
