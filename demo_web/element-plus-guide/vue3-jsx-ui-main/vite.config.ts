/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  test: {
    // jest like test api
    globals: true,
    // 模拟 DOM 环境
    environment: 'happy-dom',
    // 支持 TSX
    transformMode: {
      web: [/.[tj]sx$/]
    }
  }
});
