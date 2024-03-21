<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section class="empty">
        <dv-empty description="描述文字"></dv-empty>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/empty-code.md";
</script>

<style lang="scss" scoped>
.empty {
  margin-top: 30px;
}
</style>
