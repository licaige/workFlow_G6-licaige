<template>
  <Wrap :md="html">
    <template v-slot:components>
      <dv-rate :max="5" v-model="stars" @clickOutside="clickOutside" />
    </template>
  </Wrap>
</template>

<script setup>
import { ref } from "vue";
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/rate-code.md";

const stars = ref(1);

const clickOutside = () => {};
</script>
