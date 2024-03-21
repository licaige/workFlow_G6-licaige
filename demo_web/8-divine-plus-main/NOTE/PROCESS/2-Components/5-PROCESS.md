# Progress 进度条

## (一) 两种方式实现环形进度条

##### (1.1) svg 实现 环形进度条

- 详见 `https://github.com/woow-wu7/8-penetrate/blob/main/1-FRONTEND/7-CSS/GG-%E7%8E%AF%E5%BD%A2%E8%BF%9B%E5%BA%A6%E6%9D%A1.html`

```
svg 画环形进度条
---

1
viewBox
- html: ------ viewBox="0 0 200 200"
- 参数: ------- startX startY width height
- 表示: ------- 截取的区域的 ( 左上角坐标 startX, startY ) 和 ( 截取区域的 width 和 height )
- 作用: svg上截取一小块，放大到整个svg显示

2
stroke-dasharray
- html: ------- stroke-dasharray="5, 5"
- css: -------- stroke-dasharray: 596 596;
- 表示: -------- 短划线 和 缺口的长度
- 作用: 控制用来描边的点划线的图案范式

3
stoke-dashoffset
- 表示: ------- 边框的偏移距离，如果使用了一个 <百分比> 值，那么这个值就代表了当前 viewport 的一个百分比

4
资料
- 多种方式实现环形进度条 https://codepen.io/pizizz/pen/mwyNyG
- https://minjiechang.github.io/css/svgCircle/

5
实战
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      svg {
        border: 1px solid red;
      }

      #circle {
        transform: rotate(-90deg); /* 这是让环的起点在圆的顶点 */
        transform-origin: center;

        transition: all 0.1s linear;

        stroke: rgb(0, 85, 255);
        stroke-width: 10px;
        stroke-linecap: round;
        stroke-dasharray: 596 596;
        stroke-dashoffset: 496;
      }

      #circle-background {
        stroke: rgba(190, 190, 190, 0.5);
      }
    </style>
  </head>
  <body>
    <svg width="200" height="200" viewBox="0 0 200 200">
      <!-- circle -->
      <!-- cx cy 表示圆心坐标 -->
      <!-- r 表示半径 -->
      <!-- fill 表示圆的填充颜色 -->
      <!-- stroke-width 边框宽度 -->
      <!-- stroke 边框填充颜色 -->
      <circle id="circle" cx="100" cy="100" r="95" fill="transparent" />
      <circle
        id="circle-background"
        cx="100"
        cy="100"
        r="95"
        fill="transparent"
        stroke-width="10"
      />
    </svg>

    <button>随机概率</button>
    <script>
      const button = document.querySelector("button");
      const circle = document.querySelector("circle");

      button.addEventListener("click", onRandom, false);
      function onRandom() {
        console.log("circle", circle);
        circle.style["stroke-dashoffset"] = Math.random() * 496;
      }
    </script>
  </body>
</html>
```

##### (1.2) HTML/CSS 实现 环形进度条

```
HTML/CSS 实现 环形进度条
---

1
原理
- 左右半圆，旋转后，隐藏

2
实现
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      svg {
        border: 1px solid red;
      }

      #circle {
        transform: rotate(-90deg); /* 这是让环的起点在圆的顶点 */
        transform-origin: center;

        transition: all 0.1s linear;

        stroke: rgb(0, 85, 255);
        stroke-width: 10px;
        stroke-linecap: round;
        stroke-dasharray: 596 596;
        stroke-dashoffset: 496;
      }

      #circle-background {
        stroke: rgba(190, 190, 190, 0.5);
      }
    </style>
  </head>
  <body>
    <svg width="200" height="200" viewBox="0 0 200 200">
      <!-- circle -->
      <!-- cx cy 表示圆心坐标 -->
      <!-- r 表示半径 -->
      <!-- fill 表示圆的填充颜色 -->
      <!-- stroke-width 边框宽度 -->
      <!-- stroke 边框填充颜色 -->
      <circle id="circle" cx="100" cy="100" r="95" fill="transparent" />
      <circle
        id="circle-background"
        cx="100"
        cy="100"
        r="95"
        fill="transparent"
        stroke-width="10"
      />
    </svg>

    <button>随机概率</button>
    <script>
      const button = document.querySelector("button");
      const circle = document.querySelector("circle");

      button.addEventListener("click", onRandom, false);
      function onRandom() {
        console.log("circle", circle);
        circle.style["stroke-dashoffset"] = Math.random() * 496;
      }
    </script>
  </body>
</html>
```
