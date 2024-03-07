import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankunPlugin from './src/plugins/qiankun/vite-plugin-qiankun';
import tsconfigPaths from 'vite-tsconfig-paths'
import { name } from './package.json';

const port = 8888; // dev port
const useDevMode = true; // 是否使用开发模式

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        babelrc: false,
        plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
      },
    }),
    qiankunPlugin(name, { useDevMode }),
    tsconfigPaths(),
  ],
  server: {
    port,
    cors: true,
  },
  // 生产模式下依旧不支持 publicPath, 需要将 vite.config.js 中 base 配置写死【致使多环境部署不便捷】
  base: mode === 'development' ? '/' : `http://127.0.0.1:${port}/`,
}))
