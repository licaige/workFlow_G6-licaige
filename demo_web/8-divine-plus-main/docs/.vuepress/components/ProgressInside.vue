<template>
  <Wrap :md="html">
    <template v-slot:components>
      <dv-progress
        :text-inside="true"
        :stroke-width="26"
        :percent="60"
      ></dv-progress>
      <dv-progress
        :text-inside="true"
        :stroke-width="24"
        :percent="100"
        status="success"
      ></dv-progress>
      <dv-progress
        :text-inside="true"
        :stroke-width="80"
        :percent="80"
        status="warning"
      ></dv-progress>
      <dv-progress
        :text-inside="true"
        :stroke-width="20"
        :percent="30"
        status="error"
      ></dv-progress>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/progress-line-inside-code.md";
</script>
