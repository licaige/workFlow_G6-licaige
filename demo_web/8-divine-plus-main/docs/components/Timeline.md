# Timeline

时间线

## 基本用法

<Timeline />

## Timeline 组件属性

| 属性    | 描述     | 类型    | 可选值 | 默认值 |
| ------- | -------- | ------- | ------ | ------ |
| reverse | 排序方向 | boolean | -      | false  |

## TimelineItem 组件属性

| 属性          | 描述           | 类型    | 可选值                                      | 默认值 |
| ------------- | -------------- | ------- | ------------------------------------------- | ------ |
| timestamp     | 时间戳         | string  | -                                           | -      |
| hideTimestamp | 是否隐藏时间戳 | boolean | -                                           | false  |
| position      | 时间戳位置     | string  | top / bottom                                | bottom |
| type          | 节点类型       | string  | primary / success / warning / danger / info | -      |
| color         | 节点颜色       | string  | -                                           | -      |
| size          | 节点尺寸       | string  | normal / large                              | normal |
| icon          | 节点图标       | string  | -                                           | -      |

## Timeline 插槽

| 插槽名  | 描述       |
| ------- | ---------- |
| default | -          |
| dot     | 自定义节点 |
