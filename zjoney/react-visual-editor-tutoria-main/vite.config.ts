// @ts-ignore
import reactRefresh from '@vitejs/plugin-react-refresh'
import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        base: '/react-visual-editor/',
        outDir: 'docs',
    },
    optimizeDeps: {
        include: []
    },
    plugins: [reactRefresh()],
    esbuild: {
        jsxInject: "import React from 'react'",
    },
    server:{
        host: '0.0.0.0', // 新增的，解决 use `--host` to expose的问题
    }
})
