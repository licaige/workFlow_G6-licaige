<template>
  <Wrap :md="html">
    <template v-slot:components>
      <dv-rate
        :max="5"
        v-model="stars"
        iconName="search"
        :iconStyle="iconStyle"
        :iconSelectedStyle="iconSelectedStyle"
      />
    </template>
  </Wrap>
</template>

<script setup>
import { ref } from "vue";
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/rate-other-code.md";

const stars = ref(3);

const iconStyle = {
  color: "blue",
  fontSize: "20px",
};

const iconSelectedStyle = {
  color: "red",
  fontSize: "24px",
};
</script>
