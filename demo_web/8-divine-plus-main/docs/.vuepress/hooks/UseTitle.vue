<template>
  <Wrap :md="html">
    <template v-slot:components>
      <button @click="onDestroy">
        卸载/挂载组件 - 测试restoreOnUnmounted对标题的影响
      </button>
      <span v-if="isShowTitle">
        <UseTitleChild />
      </span>
    </template>
  </Wrap>
</template>

<script setup>
import { ref } from "vue";
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../hooks/useTitle-code.md";
import UseTitleChild from "./UseTitleChild.vue";

const isShowTitle = ref(true);
const onDestroy = () => {
  isShowTitle.value = !isShowTitle.value;
};
</script>
