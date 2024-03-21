<template>
  <section class="define-expose-father">
    <h4>测试 defineExpose</h4>
    <button @click="getChildData">获取子组件中的数据</button>
    <TestDefinePropsChild ref="ChildComponentRef" />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TestDefinePropsChild from "./1.test-define-expose-child.vue";

const ChildComponentRef = ref<InstanceType<typeof TestDefinePropsChild> | null>(null);

const getChildData = () => {
  console.log("count", ChildComponentRef.value?.count);
  console.log("doubleCount", ChildComponentRef.value?.state.doubleCount);
  // setTimeout(() => ChildComponentRef.value?.add(), 2000) // 未通过 defineExpose 导出的值，无法通过 ref 获取，比如这里的add，ts就报错了
};
</script>

<style lang="scss" scoped>
.define-expose-father {
  border: 1px solid red;
  padding: 10px;
}
</style>
