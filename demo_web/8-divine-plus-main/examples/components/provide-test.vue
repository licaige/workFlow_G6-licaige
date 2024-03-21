<template>
  <section>provide</section>
  <InjectTest></InjectTest>
</template>

<script setup>
import { reactive, provide, inject } from "vue";
import InjectTest from "../components/inject-test.vue";

const state = reactive({
  name: "woow_wu7",
});

provide("state-provide", state);

setTimeout(() => {
  // 本组件中不能通过 inject 获取到 provide 中的值，只有在后代组件中才可以获取到
  // vue2 和 vue3 都不行
  const res = inject("state-provide");
  console.log("res2 :>> ", res);
}, 1000);

</script>

<style lang="scss">
section {
  border: 1px solid black;
  padding: 20px;
  margin: 20px 0;
}
</style>
