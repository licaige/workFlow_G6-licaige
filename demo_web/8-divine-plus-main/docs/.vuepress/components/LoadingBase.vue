<template>
  <Wrap :md="html">
    <template v-slot:components>
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
  </Wrap>
</template>

<script setup>
import { reactive, onMounted } from "vue";

import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/loading-code.md";

const state = reactive({
  loading: true,
});

onMounted(() => {
  setInterval(() => {
    state.loading = !state.loading;
  }, 1000);
});
</script>
