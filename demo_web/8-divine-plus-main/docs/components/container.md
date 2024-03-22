# Container

布局容器

## 基本组件

- Container
  - Header
  - Footer
  - Aside
  - Main

## 基本用法

<Container/>

## Container 组件属性

| 属性      | 描述             | 类型   | 可选值                  | 默认值                                                             |
| --------- | ---------------- | ------ | ----------------------- | ------------------------------------------------------------------ |
| direction | 子元素的排列方向 | string | 'horizontal'/'vertical' | 子元素中有 el-header 或 el-footer 时为 vertical，否则为 horizontal |

## Header 和 Footer 组件属性

| 属性   | 描述 | 类型   | 可选值 | 默认值 |
| ------ | ---- | ------ | ------ | ------ |
| height | 高度 | string | -      | 60px   |

## Aside 组件属性

| 属性  | 描述 | 类型   | 可选值 | 默认值 |
| ----- | ---- | ------ | ------ | ------ |
| width | 宽度 | string | -      | 300px  |

## main 组件属性

| 属性 | 描述                                                                                                                                               | 类型   | 可选值 | 默认值 |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------ |
| -    | main 没有任何属性，因为在有 header 或 footer 是 vertical 排列，所以 aside 和 main 则是 horizontal 排列，aside 有默认宽度，则 main 充满剩余水平位置 | string | -      | 300px  |