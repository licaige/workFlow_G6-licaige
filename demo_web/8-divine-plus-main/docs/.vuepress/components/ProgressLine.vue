<template>
  <Wrap :md="html">
    <template v-slot:components>
      <h4>Progress 测试</h4>
      <dv-progress :percent="50"></dv-progress>
      <dv-progress :percent="100" :format="format"></dv-progress>
      <dv-progress :percent="percent" status="success"></dv-progress>
      <dv-progress :percent="60" status="warning"></dv-progress>
      <dv-progress :percent="50" status="error"></dv-progress>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/progress-line-code.md";

const format = (percent) => {
  return percent === 100 ? "完成" : `${percent}%`;
};
</script>
