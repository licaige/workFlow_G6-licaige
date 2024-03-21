```
<template>
  <dv-rate
    :max="5"
    v-model="stars"
    iconName="search"
    :iconStyle="iconStyle"
    :iconSelectedStyle="iconSelectedStyle"
  />
</template>

<script setup>
import { ref } from "vue";

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
```
