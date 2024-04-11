# js横向/竖向轮播插件
基于原生js实现的轮播插件,灵活配置轮播元素(不限制于图片)，支持横向及竖向轮播

### 特点
1. 不依赖任何框架，原生js；
2. 响应式宽度，相对于父元素100%；
3. 支持左右箭头和圆点播放；
4. 支持横向，竖直方向轮播；
5. 支持横向手势滑动；

### 演示
[demo](./test/carousel.html)

## 快速开始

### 引入
``` html
<link rel="stylesheet" href="dist/carousel.min.css">
<script src="dist/carousel.min.js"></script>
```
### HTML
``` HTML
    <div class="carousel-inner" id="carousel_container">
        <div class="item">
            <div>first slide content</div>
        </div>
        <div class="item">
            <div>second slide content</div>
        </div>
        <div class="item">
            <div>third slide content</div>
        </div>
        <div class="item">
            <div>fourth slide content</div>
        </div>
        <span class="btn-prev">
               ‹</span>
        <span class="btn-next">›</span>
        <div class="btn-num-container">
            <span data-slide-to=0 class="btn-num"></span>
            <span data-slide-to=1 class="btn-num"></span>
            <span data-slide-to=2 class="btn-num"></span>
            <span data-slide-to=3 class="btn-num"></span>
        </div>
    </div>
```
##### 说明
* .item元素中可自定义填充内容，灵活修改
* 左右按钮可自定义样式,无需左右箭头，可省略
* btn-num为轮播圆点，data-slide-to为相应item索引

### 使用

``` javaScript
    var options={
        container: document.getElementById('carousel_container'),
        startIndex: 2,
        duration: 600,
        interval: 3000,
        isCycle: true,
        isTouch: true,
        direction:'vertical'
    }; 
    var carousel = new Carousel(options);
```
### options(配置项)

##### container
* 非必填，轮播容器元素
* 默认为页面中第一个.carousel-inner

##### startIndex
* 非必填，轮播开始索引
* 默认为0，Number类型

##### duration
* 非必填，过渡时间,单位ms
* 默认为600，Number类型

##### interval
* 非必填，循环时间,单位ms
* 默认为3000，Number类型

##### isCycle
* 非必填，是否循环播放
* 默认true,取值true/false，Boolean类型

##### direction
* 非必填，轮播方向
* 默认横向播放，无需传入，若需竖直方向播放，设置为'vertical'

##### isTouch
* 非必填，是否支持手势横向滑动
* 默认false，取值true/false，Boolean类型
