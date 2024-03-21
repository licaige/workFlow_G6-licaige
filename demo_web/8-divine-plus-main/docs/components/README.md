# 安装

::: tip 提示
divinePlus 基于 vue3 + webpack5 + ts + vuepress2 构建
:::

## Install

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:no-line-numbers
yarn add divine-plus
```

  </CodeGroupItem>

  <CodeGroupItem title="npm" active>

```bash:no-line-numbers
npm install divine-plus
```

  </CodeGroupItem>
</CodeGroup>

## Usage

```js
// install
npm install divine-plus -S
```

```js
// main.ts
import DivinePlus from "divine-plus";
import "divine-plus/css/index.css";

const app = createApp(App);
app.use(DivinePlus);
app.mount("#app");
```
