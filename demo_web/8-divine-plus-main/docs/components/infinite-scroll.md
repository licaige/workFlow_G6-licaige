# InfiniteScroll

无限滚动指令 `v-dv-infinite-scroll`

## 基本用法

- 当指令 el 和 具有滚动条的元素 是同一个元素时 如该例
- `v-dv-infinite-scroll='loadData'`
- 指令的值: 必须是一个函数，用于在触底时加载新的数据
- distance 属性: 表示距离底部 distance 长度时触发，px

<InfiniteScroll/>

## 禁用加载

- 当指令 el 和 具有滚动条的元素 不是同一个元素时 如该例
- disabled 属性: 表示该属性为 true 以，不会在调用 callback

<InfiniteScrollDisable/>

## 指令

| 指令                 | 值                                               |
| -------------------- | ------------------------------------------------ |
| v-dv-infinite-scroll | 必须是一个函数，用户触底条件触发时，请求新的数据 |

## InfiniteScroll 属性

| 属性      | 描述                                                 | 类型          | 可选值 | 默认值 |
| --------- | ---------------------------------------------------- | ------------- | ------ | ------ |
| distance  | 触发加载的距离阈值，单位为 px                        | number/string | -      | 0      |
| delay     | 节流时延，单位为 ms                                  | number/string | -      | 200    |
| disabled  | 是否禁用                                             | boolean       | -      | false  |
| immediate | 是否立即执行加载方法，以防初始状态下内容无法撑满容器 | boolean       | -      | false  |
