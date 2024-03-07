import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankunPlugin from 'vite-plugin-qiankun';
import tsconfigPaths from 'vite-tsconfig-paths'
import { name } from './package.json';

const port = 9999; // dev port
const useDevMode = true; // 是否使用开发模式

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    qiankunPlugin(name, { useDevMode }),
    tsconfigPaths(),
  ],
  server: {
    port,
    cors: true,
    origin: `http://localhost:${port}`,
  },
  // 生产模式下依旧不支持 publicPath, 需要将 vite.config.js 中 base 配置写死【致使多环境部署不便捷】
  base: mode === 'development' ? '/' : `http://127.0.0.1:${port}/`,
  resolve: {
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
}))
