# Layout

布局

# 基本组件

- Row
- Col

# 基本使用

<Layout/>

# Row 组件属性

| 属性    | 描述                                  | 类型   | 可选值                                      | 默认值 |
| ------- | ------------------------------------- | ------ | ------------------------------------------- | ------ |
| gutter  | 栅格间隔                              | number | -                                           | 0      |
| tag     | 自定义元素标签                        | string | -                                           | div    |
| type    | 布局模式，可选 flex，现代浏览器下有效 | string | -                                           | -      |
| justify | flex 布局下的 - 水平排列方式          | string | start/end/center/space-around/space-between | div    |
| align   | flex 布局下的 - 垂直排列方式          | string | top/middle/bottom                           | div    |

# Col 组件属性

| 属性   | 描述               | 类型                                      | 可选值 | 默认值 |
| ------ | ------------------ | ----------------------------------------- | ------ | ------ |
| span   | 栅格占据的列数     | number                                    | -      | 24     |
| offset | 栅格左侧的间隔格数 | number                                    | -      | 0      |
| push   | 栅格向右移动格数   | number                                    | -      | 0      |
| pull   | 栅格向左移动格数   | number                                    | -      | 0      |
| xs     | <768px             | number/object (例如 {span: 4, offset: 4}) | -      | -      |
| sm     | ≥768px             | number/object (例如 {span: 4, offset: 4}) | -      | -      |
| md     | ≥992px             | number/object (例如 {span: 4, offset: 4}) | -      | -      |
| lg     | ≥1200px            | number/object (例如 {span: 4, offset: 4}) | -      | -      |
| xl     | ≥1920px            | number/object (例如 {span: 4, offset: 4}) | -      | -      |

```
xs -------- extra-small
sm -------- small
md -------- middle
lg -------- large
xl -------- extra-large
```
