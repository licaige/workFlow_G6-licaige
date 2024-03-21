# Watermark

水印组件

## 水印文字

<Watermark/>

## 水印图片

<WatermarkImg />

## Watermark 组件属性

| 属性      | 描述                             | 类型             | 可选值 | 默认值 |
| --------- | -------------------------------- | ---------------- | ------ | ------ |
| content   | 水印文字                         | string           | -      | -      |
| fontsize  | 水印文字字体大小                 | String           | -      | 16px   |
| fontcolor | 水印文字字体颜色                 | string           | -      | -      |
| zIndex    | 水印 z-index                     | string ｜ number | -      | -9999  |
| gap       | 水印文字/图片间距                | string ｜ number | -      | 10     |
| imgSrc    | 水印图片地址，图片优先级高于文字 | string           | -      | -      |
| imgWidth  | 水印图片宽度                     | string ｜ number | -      | 120    |
| imgHeight | 水印图片高度                     | string ｜ number | -      | 64     |
