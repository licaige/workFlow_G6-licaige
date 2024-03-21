<template>
  <Wrap :md="html">
    <template v-slot:components>
      <div class="divider-vertical">
        <span>left</span>
        <DvDivider direction="vertical"></DvDivider>
        <span>right</span>
      </div>
    </template>
  </Wrap>
</template>

<script setup lang="ts">
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/divider-v-code.md";
</script>
<style>
.divider-vertical {
  border: 1px solid #f0f0f0;
  padding: 20px;
}
</style>
