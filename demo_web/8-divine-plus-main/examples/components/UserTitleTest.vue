<template>
  <div>
    <h3>测试 useTitle 测试</h3>
    <div>{{ title }}</div>
    <button @click="onChangeTitle">changeTitle</button>
  </div>
</template>

<script setup>
import { useTitle } from "../../packages/hooks";

const [title, changeTitle] = useTitle("text-title", {
  restoreOnUnmounted: true,
});
const onChangeTitle = () => {
  changeTitle("change-title");
};
</script>
