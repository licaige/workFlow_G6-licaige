<template>
  <Wrap :md="html">
    <template v-slot:components>
      <dv-progress type="circle" :percent="25"></dv-progress>
      <dv-progress
        type="circle"
        :percent="25"
        backColor="#29CE66"
        color="red"
        textColor="red"
      ></dv-progress>
      <dv-progress type="circle" :percent="100" status="success"></dv-progress>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/progress-circle-code.md";
</script>
