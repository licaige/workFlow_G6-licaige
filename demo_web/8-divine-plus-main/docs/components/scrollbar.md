# Scrollbar

滚动条

## 基本用法

- hover 显示滚动条
- 支持 滚动 和 拖动
- 支持 显示原生滚动条

<Scrollbar/>

## 横向滚动条

- showHorizontalBar
- 总是显示滚动条

<ScrollbarHorizontal />

## 自定义滚动条

- barStyle

<ScrollbarManual />

## Scrollbar 组件属性

| 属性              | 描述                 | 类型          | 可选值 | 默认值  |
| ----------------- | -------------------- | ------------- | ------ | ------- |
| height            | 滚动区域的高度       | string/number | -      | -       |
| max-height        | 滚动区域的最大高度   | string/number | -      | -       |
| native            | 是否使用原生滚动条   | boolean       | -      | false   |
| wrapStyle         | 包裹容器的自定义样式 | string/Object | -      | -       |
| always            | 滚动条总是显示       | boolean       | -      | false   |
| showHorizontalBar | 是否显示横向滚动条   | boolean       | -      | - false |
| barStyle          | 滚动条的自定义样式   | object        | -      | -       |
