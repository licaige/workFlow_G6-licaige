```
<template>
  <dv-rate :max="5" v-model="stars" />
</template>

<script setup>
import { ref } from "vue";
const stars = ref(1);
</script>
```
