import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5000,
    fs: {
      strict: false
    },
    open: true,
  },
  css: {

  },
  resolve: {
    alias: [
      {
        find: '@micro-zoe/micro-app',
        replacement: resolve(__dirname, '../../lib/index.esm.js')
      },
    ]
  }
})
