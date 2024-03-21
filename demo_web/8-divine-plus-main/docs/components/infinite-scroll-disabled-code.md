```
<template>
  <section class="block">
    <h4>v-infinite-scroll 测试</h4>
    <h4>el !== container</h4>

    <div style="height: 200px; overflow: auto; marginBottom: 100px">
      <ul v-dv-infinite-scroll="fetchData2" :disabled="disabled" class="scroll-disabled">
        <li v-for="item in infiniteScrollState.count2" class="scroll-disabled-item">{{ item }}</li>
      </ul>
      <p v-if="infiniteScrollState.loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed } from 'vue'
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/infinite-scroll-code.md";

const infiniteScrollState = reactive({
  count2: 10,
  loading: false
});

const fetchData2 = () => {
  infiniteScrollState.loading = true
  setTimeout(() => {
    infiniteScrollState.count2 = infiniteScrollState.count2 + 2;
    infiniteScrollState.loading = false

  }, 2000)
};
const noMore = computed(() => infiniteScrollState.count2 > 20);
const disabled = computed(() => infiniteScrollState.loading || noMore.value);
</script>
```
