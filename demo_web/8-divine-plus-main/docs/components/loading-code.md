```
<template>
  <div
    v-loading="state.loading"
    dv-loading-text="Loading"
    dv-loading-background-color="rgba(255,182,193,0.2)"
  >
    <p>v-loading</p>
    <p>v-loading</p>
    <p>v-loading</p>
    <p>v-loading</p>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";

const state = reactive({
  loading: true,
});

onMounted(() => {
  setInterval(() => {
    state.loading = !state.loading;
  }, 1000);
});
</script>
```
