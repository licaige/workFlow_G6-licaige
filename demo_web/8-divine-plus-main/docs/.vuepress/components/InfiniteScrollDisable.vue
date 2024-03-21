<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section class="block">
        <h4>v-infinite-scroll 测试</h4>
        <h4>el !== container</h4>

        <div style="height: 300px; overflow: auto; marginBottom: 100px">
          <ul v-dv-infinite-scroll="fetchData2" :disabled="disabled" class="scroll-disabled">
            <li v-for="item in infiniteScrollState.count2" class="scroll-disabled-item">{{ item }}</li>
          </ul>
          <p v-if="infiniteScrollState.loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import { reactive, computed } from 'vue'
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components//infinite-scroll-disabled-code.md";

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

<style >
.scroll-disabled {
  list-style: none;
  padding: 0;
}

.scroll-disabled-item {
  margin: 10px 0;
  padding: 10px 0;
  background: #fff6f6;
  text-align: center;
}
</style>
