<template>
  <Wrap :md="html">
    <template v-slot:components>
      <dv-rate :max="5" v-model="stars" allowHalf />
    </template>
  </Wrap>
</template>

<script setup>
import { ref } from "vue";
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/rate-half-code.md";

const stars = ref(3.3);
</script>
