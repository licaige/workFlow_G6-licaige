<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section class="empty">
        <dv-empty
          image="https://source.unsplash.com/random/160x160/?girl"
          description="girl random"
        ></dv-empty>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/empty-custom-code.md";
</script>

<style lang="scss" scoped>
.empty {
  margin-top: 30px;
}
</style>
