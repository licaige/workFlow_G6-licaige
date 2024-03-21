<template>
  <section class="recursive-component-wrap">
    <h4>测试递归组件 recursive-component</h4>
    <Recursive :list="navList" />
  </section>
</template>

<script setup>
import Recursive from "./3.recursive-component.vue";
const navList = [
  {
    name: "一级导航 1",
  },
  {
    name: "一级导航 2",
    children: [
      { name: "二级导航 2-1" },
      {
        name: "二级导航 2-2",
        children: [{ name: "三级导航 2-2-1" }, { name: "三级导航 2-2-2" }],
      },
      { name: "二级导航 2-2" },
    ],
  },
  {
    name: "一级导航 3",
  },
];
</script>

<style lang="scss" scoped>
.recursive-component-wrap {
  border: 1px solid red;
  padding: 10px;
}
</style>
