# vue3-jsx-ui

yarn create vite

yarn add @vitejs/plugin-vue-jsx -D

在 vite.config.ts 中导入 @vitejs/plugin-vue-jsx

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()]
})
```

使用 npx eslint --init

yarn add -D prettier eslint-plugin-prettier eslint-config-prettier

npx mrm@2 lint-staged

yarn add -D vitepress

TypeError: dns.setDefaultResultOrder is not a function

原因 Node 版本太低，安装 Node v17 就可以了

npm i -g ts-node-dev
