<template>
  <Wrap :md="html">
    <template v-slot:components>
      <dv-scrollbar height="300" style="background: yellow" :native="false">
        <div v-for="value in 40" style="width: 600px; user-select: none">
          测试scrollbar测试scrollbar测试scrollbar测试
        </div>
      </dv-scrollbar>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/scrollbar-code.md";
</script>

<style lang="scss" scoped></style>
