# Badge

徽章

# 基本使用

<Badge />

## Badge 组件属性

| 属性   | 描述                                                                   | 类型                                                  | 可选值                          | 默认值 |
| ------ | ---------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------- | ------ |
| value  | 显示值                                                                 | string/number                                         | <div style="width:40pt">-</div> | ''     |
| max    | 最大值，超过最大值会显示 {max}+，max 生效的前提是 value 是 number 类型 | number                                                | -                               | number |
| is-dot | 是否显示小圆点                                                         | boolean                                               | -                               | false  |
| hidden | 是否隐藏 Badge                                                         | boolean                                               | -                               | false  |
| type   | badge 类型                                                             | 'primary' / 'success' / 'warning' / 'danger' / 'info' | -                               | -      |

## Badge 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |
