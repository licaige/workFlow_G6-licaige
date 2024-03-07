import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // legacy({
    //   targets: ['Chrome >= 59']
    // }),
    vue(),
    (function () {
      let basePath = ''
      return {
        name: "vite:micro-app",
        apply: 'build',
        configResolved(config) {
          basePath = `${config.base}${config.build.assetsDir}/`
        },
        renderChunk(code, chunk) {
          if (chunk.fileName.endsWith('.js') && /(from|import)(\s*['"])(\.\.?\/)/g.test(code)) {
            code = code.replace(/(from|import)(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
              return all.replace($3, new URL($3, basePath))
            })
          }
          return code
        }
      }
    })(),
  ],
  server: {
    port: 7001,
  },
  build: {
    outDir: 'vite',
  },
  clearScreen: false,
  base: `${process.env.NODE_ENV === 'production' ? 'https://zeroing.jd.com' : ''}/micro-app/vite/`,
})
