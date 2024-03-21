# v-dv-loading 加载动画

## loading 指令方式调用

- v-loading
- `dv-loading-text`: loading 的文字
- `dv-loading-background-color`: loading 的背景颜色
- 全屏: 事件修饰符可配置全屏 `v-loading.fullscreen=""`

<LoadingBase/>

## loading 服务方式调用

- 通过函数调用，默认全屏
- 可以通过 target 指定 loading 需要插入的 DOM 元素

<LoadingService />

## loading 直接引入调用

<LoadingServiceImmediate />

## Loading 配置属性

| 属性                        | 描述                                    | 类型    | 可选值 | 默认值        |
| --------------------------- | --------------------------------------- | ------- | ------ | ------------- |
| target                      | Loading 需要覆盖的 DOM 节点             | object  | -      | document.body |
| text                        | 显示在加载图标下方的加载文案            | string  | -      | -             |
| fullscreen                  | 同 v-loading 指令中的 fullscreen 修饰符 | boolean | -      | -             |
| background                  | 遮罩背景色                              | string  | -      | -             |
| v-loading                   | 是否显示动画                            | boolean | -      | -             |
| dv-loading-text             | 显示在加载图标下方的加载文案            | string  | -      | -             |
| dv-loading-background-color | 遮罩背景色                              | string  | -      | -             |
