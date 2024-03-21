<template>
  <transition :name="ns.b()" v-on="on"> <slot></slot> </transition>
</template>

<script lang="ts">
export default {
  name: "DvCollapseTransition",
};
</script>

<script lang="ts" setup>
import { useNamespace } from "@/hooks/useNamespace";
import type { RendererElement } from "@vue/runtime-core";

const ns = useNamespace("collapse-transition");

const on = {
  // 相当于 v-enter-from
  beforeEnter(el: RendererElement) {
    if (!el.dataset) el.dataset = {};

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;

    // 这里用的是 maxHeight，element-ui时用的 scrollHeight
    el.style.maxHeight = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  },

  // 相当于 v-enter-active
  enter(el: RendererElement) {
    el.dataset.oldOverflow = el.style.overflow;

    // el.scrollHeight !== 0，则获取 真实的子元素的高度，可以通过 scrollHeight 来获取
    // - 对比: 这里 scrollHeight 比 offsetHeight/clientHeight 好，因为可以出现滚动条
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = `${el.scrollHeight}px`;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    // el.scrollHeight = 0，说明 el 没有子元素，表示其高度不是靠子元素撑起来的，可能是在 css 中设置的 height
    else {
      el.style.maxHeight = 0;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    el.style.overflow = "hidden";
  },

  // 相当于 v-enter-to 即进入动画已经结束
  // - 两个阶段
  //    - enter 进入阶段
  //    - leave 出去阶段
  afterEnter(el: RendererElement) {
    el.style.maxHeight = "";
    el.style.overflow = el.dataset.oldOverflow;
  },

  beforeLeave(el: RendererElement) {
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.maxHeight = `${el.scrollHeight}px`;
    el.style.overflow = "hidden";
  },

  leave(el: RendererElement) {
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  },

  afterLeave(el: RendererElement) {
    el.style.maxHeight = "";
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  },
};
</script>
