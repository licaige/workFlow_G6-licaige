<template>
  <section>
    <h1>父组件 v-model 测试</h1>
    <input type="text" v-model="state.inputValue1" />
    <div>这是组件中的v-model: {{ state.inputValue1 }}</div>
  </section>

  <section id="child">
    <h1>子组件 v-model 测试</h1>
    <!-- v-model 组件上的 默认传递 和 传递多个值 -->
    <VModelTestChild
      v-model="state.name"
      v-model:age="state.age"
      v-model:sex="state.sex"
    ></VModelTestChild>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import VModelTestChild from "./v-model-test-child.vue";
const state = reactive({
  inputValue1: "初始值1",
  name: "woow_wu7",
  age: 20,
  sex: "man",
});
</script>

<style lang="scss">
section {
  border: 1px solid black;
  padding: 20px;
  margin: 20px 0;
}
</style>
