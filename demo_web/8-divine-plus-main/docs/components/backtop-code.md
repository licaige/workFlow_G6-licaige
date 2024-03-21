```
<template>
  <section class="block backtop" ref="app">
    <h4>Backtop 测试</h4>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <dv-backtop :target="app"></dv-backtop>
  </section>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  const app = ref();
</script>
```
