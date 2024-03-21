<template>
  <section>inject</section>
</template>

<script setup>
import { reactive, inject } from "vue";
const propState = inject("state-provide");
console.log("propState--:>> ", propState);
</script>

<style lang="scss">
section {
  border: 1px solid black;
  padding: 20px;
  margin: 20px 0;
}
</style>
