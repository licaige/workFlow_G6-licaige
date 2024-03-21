# Tag

标签中的

<Tag />

## Tag 组件属性

| 属性                | 描述             | 类型    | 可选值                      | 默认值  |
| ------------------- | ---------------- | ------- | --------------------------- | ------- |
| type                | 类型             | string  | success/info/warning/danger | -       |
| closable            | 是否可以关闭     | boolean | -                           | false   |
| hit                 | 是否带有边框描边 | boolean | -                           | -       |
| background-color    | 背景颜色         | string  | -                           | -       |
| disable-transitions | 是否禁用渐变动画 | boolean | -                           | false   |
| size                | 尺寸             | string  | large / default /small      | default |
| theme               | 主题             | string  | dark / light / plain        | light   |


## Tag 事件

| 名称  | 说明                  | 回调参数                |
| ----- | --------------------- | ----------------------- |
| close | 关闭 Tag 时触发的事件 | (e: MouseEvent) => void |
| click | 点击 Tag 时触发的事件 | (e: MouseEvent) => void |
