# Progress

进度条

- 三种类型
  - line
  - circle
  - dashboard
- 四种状态
  - 基础
  - success
  - warning
  - error

## 基本用法

- 值: 通过 `percent` 执行值，范围是 0-100
- 默认类型: 没有指定类型 `type` 时，默认是 `line` 模式
- 状态: 通过 `status` 指定状态，分别是 `默认-primary`，`success`，`warning`，`error`
- 格式化: 通过 `format` 函数可以修改后面的 `百分数文字`

<ProgressLine />

## 内嵌文字

- 文字内嵌: 通过 `textInside` 设置文字显示在进度条内
- 高度: 通过 `strokeWidth` 设置进度条的高度

<ProgressInside />

## 环形进度条

- 背景修改: 通过 `backColor` 修改背景颜色
- 前景修改: 通过 `color` 修改背景颜色
- 文字颜色: 通过 `textColor` 修改文字颜色

<ProgressCircle />

## Dashboard 进度条

<ProgressDashboard />

## Empty 组件属性

| 属性          | 描述                                                          | 类型                  | 可选值                | 默认值  |
| ------------- | ------------------------------------------------------------- | --------------------- | --------------------- | ------- |
| type          | 进度条类型                                                    | string                | line/circle/dashboard | line    |
| percent       | 百分比（必填）                                                | number                | 0-100                 | 0       |
| strokeWidth   | 进度条的宽度，单位 px                                         | number                | -                     | 6       |
| strokeLinecap | 路径两端的形状                                                | string                | butt/round/square     | round   |
| circleWidth   | 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用） | number                | -                     | 126     |
| status        | 进度条当前状态                                                | string                | success/warning/error | -       |
| color         | 进度条背景色（会覆盖 status 状态颜色）                        | string/function/array | -                     | -       |
| backColor     | 指定进度条底色                                                | string                | -                     | #e5e9f2 |
| textColor     | 指定进度条字体颜色                                            | string                | -                     | -       |
| textInside    | 进度条显示文字内置在进度条内（只在 type=line 时可用）色       | boolean               | -                     | false   |
| format        | 指定进度条文字内容                                            | function(percentage)  | -                     | -       |
