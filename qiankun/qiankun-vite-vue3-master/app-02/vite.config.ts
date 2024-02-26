import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import qiankun from "vite-plugin-qiankun";

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(), // default
  base: "/sub/app-02",
  publicDir: "public", // default
  cacheDir: "node_modules/.vite", // default
  // 定义全局常量替换方式
  define: {},
  envDir: "./env", // 环境变量的存储路径
  logLevel: "info", // default
  clearScreen: false, // 默认值为true。调试时设置为false，可以看到更多信息
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    qiankun("app-02", {
      useDevMode: true,
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, "dist"),
    assetsDir: "static",
    emptyOutDir: false,
    target: "esnext", // default，最低为es2015
    cssCodeSplit: true, // default
    sourcemap: false, // default
  },
  server: {
    host: "0.0.0.0",
    port: 8082,
    cors: true,
    // origin: "http://localhost:8081",
  },
});
