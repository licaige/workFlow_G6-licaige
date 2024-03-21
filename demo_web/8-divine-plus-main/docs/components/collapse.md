# Collapse

折叠面板

## 基本用法

- 数据源: `module-value` 或者 `v-module`
- 模式: 支持手风琴模式 `accordion`
- 禁用: CollapseItem 支持禁用模式 `disabled`

<Collapse />

## 手风琴模式

- 手风琴模式开启方式
  - 1. `v-module` 的值是 string 类型的响应式数据
  - 2. 在 Collapse 组件中添加 `accordion` 属性

<CollapseAccordion />

## Collapse 组件属性

| 属性                  | 描述            | 类型                                   | 可选值 | 默认值 |
| --------------------- | --------------- | -------------------------------------- | ------ | ------ |
| model-value / v-model | 当前激活的面板  | string (手风琴模式) / array            | -      | -      |
| accordion             | 是否手风琴模式  | string (手风琴模式) / boolean          | -      | false  |
| change                | 展开/收缩的回调 | function 回调参数: 展开的 item 的 name | -      | -      |

## CollapseItem 组件属性

| 属性     | 描述              | 类型                         | 可选值 | 默认值 |
| -------- | ----------------- | ---------------------------- | ------ | ------ |
| title    | 每个 item 的标题  | string (手风琴模式) / string | -      | -      |
| name     | 每个 item 唯一 ID | string/number                | -      | -      |
| disabled | 是否禁用          | boolean                      | -      | false  |
