<script setup lang="ts">
function toApp(path: string) {
  history.pushState({}, "", path);
}
</script>

<template>
  <header>
    <h3>App List:</h3>
    <!-- 不能使用a标签 -->
    <!-- <a href="/app_01">app 01</a>
    <a href="/app_02">app 02</a> -->
    <a @click="toApp('/app_01')">app 01</a>
    <a @click="toApp('/app_02')">app 02</a>
  </header>

  <main id="container"></main>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;

  border-bottom: 1px solid #e8e8e8;
}

a {
  /* font-size: 30px; */
  margin: 0 10px;
}
</style>
