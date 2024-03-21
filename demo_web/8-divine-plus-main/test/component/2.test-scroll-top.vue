<template>
  <section class="container">
    <h4>测试 scrollTop</h4>

    <main class="out-wrap" ref="outWrap">
      <p>请滚动鼠标</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </main>
  </section>
</template>

<script setup lang="ts">
// 1
// scroll 事件
// - 作用于 ( 具有滚动条的元素，即可以滚动的元素 )

// 2
// scrollTop
// - 指的是，滚动元素的内部的元素 ( 当前元素的垂直滚动条向下滚动的像素数量 )
import { ref, onMounted } from "vue";

const outWrap = ref();

onMounted(() => {
  outWrap.value.addEventListener(
    "scroll",
    (e: any) => {
      console.log("e.target.scrollTop", e.target.scrollTop);
    },
    false
  );
});
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid red;
  padding: 10px;
  margin: 30px 0;
}

.out-wrap {
  height: 300px;
  border: 1px solid #88aef4;
  overflow: auto;
}
.in-wrap {
}
</style>
