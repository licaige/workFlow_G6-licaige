import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

import { getFileExtName } from './src/utils/index'

export default defineConfig(({ command, mode }) => {
  /**
   * @param { 通过该方式获取环境变量 }
   */
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      /**
       * @param { 定义全局常量替换方式 }
       * @param { 把env改为__APP_ENV_，需在 env.d.ts 中 declare }
       */
      __APP_ENV__: env
    },
    /**
     * @param { 插件，同webpack 配置类似 }
     */
    plugins: [
      vue(),
      qiankun('app-2', {
        useDevMode: true
      })
    ],
    build: {
      minify: 'esbuild',
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const extName = getFileExtName(assetInfo.name as string)
            console.log('extName:----- ', extName)
            if (/\.(jpg|png|jpeg|webp)$/.test(extName)) {
              return 'assets/images/[name]-[hash][extname]'
            }
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(extName)) {
              return 'assets/media/[name]-[hash][extname]'
            }
            if (/\.css$/.test(extName)) {
              return 'css/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          }
        }
      }
    },
    resolve: {
      /**
       * @param { 当使用文件系统路径的别名时，请始终使用绝对路径。 }
       * @param { 相对路径的别名值会原封不动地被使用，因此无法被正常解析。 }
       */
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@models': fileURLToPath(new URL('./src/models', import.meta.url))
      },
      /**
       * @param { 导入时想要省略的扩展名列表 }
       * @param { 注意，不 建议忽略自定义导入类型的扩展名（例如：.vue）}
       * @param { 因为它会影响 IDE 和类型支持。}
       */
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    server: {
      /**
       * @param { dev环境启动端口 }
       */
      port: 2222,

      /**
       * @param { 代理 }
       */
      proxy: {
        /**
         * @param { 此处通过Apifox 进行 mock 真实请求 }
         */
        '/api': {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true
          /**
           * @param { 正则替换重定向 }
           * @param { 当需要重定向到别的域名时使用 }
           */
          // rewrite: path => path.replace(/^\/api/, '')
        },

        /**
         * @param { 例如多个模块区分 }
         */
        '/order': {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/order/, '/api/order')
        },

        /**
         * @param { 例如多个模块区分 }
         */
        '/common': {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/common/, '/api/common')
        }
      }
    }
  }
})
