# Collapse 折叠面板

## 前置知识

### (1) 一些单词

```
collapse 折叠
accordion 手风琴
keyboard 键盘
```

### (2) div 的 tabindex 和 focus/blur 事件的关系

```
div 的 tabindex 和 focus/blur 事件的关系
---

1
div是否支持 focus/blur 事件
- div不支持: 不带 tabindex 属性的 div 不支持 focus/blur 事件
- input/a支持: input/a 默认支持 focus/blur


2
tabindex
- 作用: tabindex属性表示其元素是否可以聚焦，以及它是否/在何处参与顺序键盘导航（通常使用Tab键，因此得名）
- 值:
 - tabindex=负数: 可以聚焦，可以 tab 键访问
 - tabindex=0: 可以聚焦，可以 tab 键访问，顺序由 DOM结构决定
 - tabindex=正数: 可以聚焦，可以 tab 键访问，顺序由 tabindex数字大小决定

3
扩展
- vue3 中 collapse 组件的实现: 展开和隐藏需要用到focus/blur事件
- 详见 `https://github.com/woow-wu7/8-penetrate/commit/8dfbc32a2da9bec4908e5cbb5946233706df6771`
```

### (3) 键盘事件

```
键盘事件
- keydown: 按下键盘时触发
- keypress: 按下有值键时触发，即按下 Ctrl、Alt、Shift、Meta 这样无值的键不会触发
- keyup: 松开键盘时触发
---

1
keydown 和 keypress 的先后顺序
- 当按下有值键时，先触发 keydown，再出发 keypress

2
连续触发
- 如果用户一直按键不松开，就会连续触发键盘事件

3
回车键
div.addEventListener("keydown", (e) => { if (e.keyCode == 13) { } }, false );
```

### (4) Transition 内置组件

- 官网 https://cn.vuejs.org/guide/built-ins/transition.html

```
Transition
---

1
Transition 触发的条件
- v-if 和 v-show
- <component> 内置组件的切换
- 改变特殊的 key 属性


2
两个阶段 和 三种状态
- 两个阶段: Enter  Leave
- 三种状态: from  active  to
- 具体
  - v-enter-from  v-enter-active  v-enter-to
  - v-leave-from  v-leave-active  v-leave-to
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}


3
事件
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
></Transition>
--
实战如下
 <transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
></Transition>
const onBeforeEnter = (el: RendererElement) => {
  el.style.height = "0px";
};
const onEnter = (el: RendererElement) => {
  el.style.transition = "none";
  el.style.height = "auto";
  const height = el.offsetHeight;

  el.style.height = "0px";
  el.offsetHeight;
  el.style.height = height + "px";
  el.style.transition = "all 0.2s";
};
const onLeave = (el: RendererElement) => {
  el.style.height = "0px";
};
```

# 资料

- [collapse-transition 到底写了什么](https://juejin.cn/post/6904560856210620429)
