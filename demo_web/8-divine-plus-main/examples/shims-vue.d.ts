/* eslint-disable */

// 因为: 我们在根目录下配置了 global.d.ts
// 所以: 其实这里可以不在声明 shims-vue.d.ts 文件了

declare module "8-divine-plus";
declare module "divine-plus";
declare module "*.md";

// 1
declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
// 这两种写法都可以
// ReturnType<typeof defineComponent> 返回 ReturnType 的返回值类型
// 2
// declare module "*.vue" {
//   import type { DefineComponent } from "vue";
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }
