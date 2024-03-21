```
<template>
  <section>
    <h4>v-infinite-scroll 测试</h4>
    <h4>el === container</h4>

    <ul v-dv-infinite-scroll="fetchData" distance="20" class="infinite-scroll">
      <li v-for="item in infiniteScrollState.count" class="infinite-scroll-item">{{ item }}</li>
    </ul>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/empty-code.md";

const infiniteScrollState = reactive({
  count: 10,
});

const fetchData = () => {
  infiniteScrollState.count = infiniteScrollState.count + 2;
};
</script>
```
