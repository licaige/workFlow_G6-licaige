```
<template>
  <dv-rate
    :max="5"
    v-model="stars"
    allowClear
    @clickOutside="clickOutside"
  />
</template>

<script setup>
import { ref } from "vue";

const stars = ref(0);

const clickOutside = () => {
  stars.value = 0;
};
</script>
```
