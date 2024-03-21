```
<template>
  <dv-rate :max="5" v-model="stars" allowHalf />
  </Wrap>
</template>

<script setup>
import { ref } from "vue";
const stars = ref(3.3);
</script>
```
