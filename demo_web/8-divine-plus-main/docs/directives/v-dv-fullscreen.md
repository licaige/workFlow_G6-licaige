# v-dv-fullscreen 全屏

## 组件方式

- 支持全屏/缩小时的回调
- `zoomIn`
- `zoomOut`

<v-dv-fullscreen />

## 指令方式

<v-dv-fullscreen-directive />

## Fullscreen 组件属性

| 属性               | 描述 | 类型          | 可选值 | 默认值 |
| ------------------ | ---- | ------------- | ------ | ------ |
| container 内置属性 | 容器 | 指令时默认 el | -      | -      |

## Fullscreen 事件

| 组件事件 | 描述       | 类型     | 可选值 | 默认值 |
| -------- | ---------- | -------- | ------ | ------ |
| zoomIn   | 缩小时回调 | function | -      | -      |
| zoomOut  | 全屏时回   | function | -      | -      |
