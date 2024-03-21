```
<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section>
        <h3>dv-icon 测试</h3>

        <i class="dv-icon-star" style="color: red; font-size: 30px"></i> &nbsp;
        <i class="dv-icon-loading loading-animate"></i> &nbsp;

        <dv-icon name="star" color="red" size="20" /> &nbsp;
        <dv-icon name="search" class="search" />
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/icon-code.md";
</script>

<style lang="scss" scoped>
@keyframes round {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.loading-animate {
  color: blueviolet;
  font-size: 30px;
  animation: round 1s ease-in-out 0s infinite;
}

.search {
  color: blue;
  font-size: 30px !important;
}
</style>
```
