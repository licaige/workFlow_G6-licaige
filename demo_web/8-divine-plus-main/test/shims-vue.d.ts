/* eslint-disable */

// 因为: 我们在根目录下配置了 global.d.ts
// 所以: 其实这里可以不在声明 shims-vue.d.ts 文件了

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

