<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section class="block backtop" ref="app">
        <h4>Backtop 测试</h4>
        <p>test</p>
        <dv-backtop :target="app"></dv-backtop>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/backtop-code.md";
</script>

<style lang="scss" scoped>
.badge {
  margin-top: 30px;
}
.item {
  margin-right: 30px;
}
</style>
