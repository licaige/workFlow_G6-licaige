<template>
  <section class="component-wrap">
    <header v-if="slots?.title || slots?.subtitle">
      <div class="header__title">
        <slot name="title"> </slot>
      </div>
      <div class="header__subtitle">
        <slot name="subtitle"></slot>
      </div>
    </header>

    <main>
      <slot name="components"></slot>
    </main>

    <footer>
      <div class="footer__tool" v-if="true" @click="toggle">
        <span>查看代码</span>
        <dv-icon name="youjiantou" :class="['arrow', { 'is-down': visible }]" />
      </div>
      <transition
        name="fade"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div class="footer__code" v-show="visible" ref="refCode">
          <template v-if="hasMd">
            <slot name="md"></slot>
          </template>
          <div v-else v-html="md" />
        </div>
      </transition>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { ref, useSlots, computed } from "vue";
import type { RendererElement } from "@vue/runtime-core";

const visible = ref(false);
const refCode = ref();
const slots = useSlots();
const hasMd = computed(() => slots?.md?.()?.length);

defineProps({
  code: String,
  md: String,
});

const toggle = () => {
  visible.value = !visible.value;
};

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
</script>

<style lang="scss" scoped>
.component-wrap {
  margin: 10px 0px;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;

  header,
  main,
  footer {
    border-top: 1px solid #f0f0f0;
    padding: 20px;
    box-sizing: border-box;
  }

  footer {
    padding-bottom: 0px;
  }

  header {
    padding-bottom: 0px;

    .header__title {
      font-size: 18px;
      font-weight: 700;
      color: #3eaf7c;
    }

    .header__subtitle {
      margin-top: 20px;
    }
  }

  main {
    border-top: 0;
    height: auto;
  }

  footer {
    .footer__tool {
      cursor: pointer;
      display: flex;
      align-items: center;
      user-select: none;
      margin-bottom: 20px;
    }

    .footer__code {
      background: #141414;
      overflow: hidden;
    }
  }

  .arrow {
    margin-left: 10px;
    margin-bottom: 2px;
    height: 20px;
    width: 20px;
    transition: all 0.3s;
    font-size: 20px;
  }

  .is-down {
    transform: rotate(90deg);
  }
}

// .fade-enter-active,
// .fade-leave-active {
//   max-height: 1000px;
//   transition: all 0.3s;
// }

// .fade-enter-from,
// .fade-leave-to {
//   max-height: 0;
// }
</style>
