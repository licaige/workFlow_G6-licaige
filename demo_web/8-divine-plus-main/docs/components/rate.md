# Rate

评分组件

## 基本用法

<Rate />

## 取消选择

- 1. 通过 `allowClear` 属性，我们再次点击选中的星星就是取消选择
- 2. 通过 `clickOutside` 事件，在星星外点击，即可取消选择

<RateClear />

## 允许半星

- 通过 `allowHalf` 属性，我们再次点击选中的星星就是取消选择

<RateHalf />

## 其他设置

- 改变图标样式

<RateOther />

## 组件属性

| 属性              | 描述                                        | 类型                                    | 可选值 | 默认值 |
| ----------------- | ------------------------------------------- | --------------------------------------- | ------ | ------ |
| v-model           | 评分数据                                    | number                                  | -      | -      |
| max               | 评分的上限，即星星的个数                    | number                                  | -      | 5      |
| readonly          | 只读                                        | boolean                                 | -      | false  |
| allowClear        | 选中后，再次点击可以取消选择                | boolean                                 | -      | false  |
| allowHalf         | 是否允许半星                                | boolean                                 | -      | false  |
| texts             | 尾部的文字说明，                            | string[]                                | -      | []     |
| showScore         | 尾部显示分数，texts 和 showScore 只能二选一 | boolean                                 | -      | false  |
| iconName          | 图标名，设置不同的图标，必须使用本库图标    | string                                  | -      | -      |
| iconStyle         | 图标-默认样式设置                           | Object                                  | -      | -      |
| iconSelectedStyle | 图标-选中样式设置                           | Object，只支持 color 和 fontSize 的修改 | -      | -      |

## 组件事件

| 事件         | 描述           | 类型                         | 可选值 | 默认值 |
| ------------ | -------------- | ---------------------------- | ------ | ------ |
| clickOutside | 星星外点击事件 | function                     | -      | -      |
| change       | 星星变化后触发 | function(stars: number):void | -      | -      |
