# vue优化

## 加稳定且唯一的key

index下标不稳定，不适合当key，id最好

## 冻结对象

冻结对象不需要双向绑定，节省性能

没有proxySetter这一步，将对象转为响应式

## 函数式组件

```
Vue.component('my-component', {
  <!-- 开启函数式组件，函数式组件是没有data的，无状态组件 -->
  functional: true,
  props: {},
  <!-- 为了弥补缺少的实例，提供第二个参数作为上下文 -->
  render: function (createElement, context) {}
})
```

对时间性能提升不大，但对内存消耗提升巨大！

函数式组件不会被vue创建实例，即不会new VueComponent，只做纯渲染，不会生成到组件树中

## 使用计算属性

没有缓存，可以跟随依赖

## 非实时绑定的表单项

v-model:会保证数据和渲染数据永远保持统一，但会产生重渲染，因为改变了cssom树

不用v-model:input的输入和vue无关，不会触发重新渲染，不会阻止动画的运行，但是可能会导致数据不一致！

用v-model.lazy绑定的是@change

不用lazy绑定的是@input

## 保持对象引用稳定

```
function hasChanged(x, y) {
  if (x === y) {
    <!-- 排除+0和-0的区别 -->
    return x === 0 && 1 / x !== 1 / y
  } else {
    <!-- 避免NaN的情况 -->
    return x === x || y === y
  }
}
```

## v-show替代v-if

## 延迟装载

让组件按照指定的先后顺序依次一个一个渲染

利用 requestAnimationFrame事件分批渲染内容，它的具体实现多种多样

一次一次的绘制，而不是同时绘制，可能总用时变长了，但是给用户看到的效果变好了。

和React Fiber同源，Fiber粒度更细

## 利用keep-alive
## 长列表优化
## 打包体积优化