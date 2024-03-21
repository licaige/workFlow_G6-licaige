```
<template>
  <section class="block">
    <h3>测试 useThrottle</h3>
    <button @click="onThrottle">useThrottle</button>

    {{ count }}
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useThrottle } from 'divine-plus'

const count = ref(0)

const onThrottle = useThrottle(() => {
  count.value++
}, { delay: 1000 })
</script>
```
