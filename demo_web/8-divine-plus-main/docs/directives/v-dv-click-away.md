# v-dv-click-away 监听元素外点击

- `v-dv-click-away: '[onClickAway, targets, events]'`
- 本库同时支持
  - `自定义hooks-监听元素外的点击事件`
  - `useClickAway(onClickAway, targets, events)`，详见 [hooks](http://localhost:7070/hooks/useClickAway.html)

## 使用案列

- 支持监听 `多个DOM元素外的点击事件的监听`
- 支持监听 `多种事件` `比如 click contextmenu 事件等`
- hooks 方式 [useClickAway](http://localhost:7070/hooks/useClickAway.html)

<v-dv-click-away />

## 指令的值

| 组件事件    | 描述                                       | 类型              | 默认值  |
| ----------- | ------------------------------------------ | ----------------- | ------- |
| 是一个数组  | 数组成员由 onClickAway targets events      |                   | -       |
| onClickAway | 元素外点击时触发的事件                     | function          | -       |
| targets     | 不触发事件的元素，或者该类型元素组成的数组 | Element/ref/array | el      |
| events      | 元素外点击时，触发的事件类型。或者数组     | EventType/array   | 'click' |
