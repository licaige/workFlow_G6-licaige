<template>
  <section class="define-expose-child">
    <div>count: {{ count }}</div>
    <div>doubleCount: {{ state.doubleCount }}</div>
    <button @click="add">add</button>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const count = ref(1);
const state = reactive({
  doubleCount: 1,
});

const add = () => {
  count.value += 1;
  state.doubleCount *= 2;
};

// 导出 count 和 state，未导出 add
defineExpose({
  count,
  state,
  // add
});
</script>

<style lang="scss" scoped>
.define-expose-child {
  border: 1px solid 	#6495ED;
  padding: 10px;
  margin: 10px 0;
}
</style>
