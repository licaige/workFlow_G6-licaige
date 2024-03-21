<template>
  <Wrap :md="html">
    <template v-slot:components>
      <dv-rate
        :max="5"
        v-model="stars"
        allowClear
        @clickOutside="clickOutside"
      />
    </template>
  </Wrap>
</template>

<script setup>
import { ref } from "vue";
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/rate-clear-code.md";

const stars = ref(0);

const clickOutside = () => {
  stars.value = 0;
};
</script>
