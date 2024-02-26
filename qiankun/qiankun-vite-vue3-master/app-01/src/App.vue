<script setup lang="ts">
console.log("app 01 mounted");
</script>

<template>
  <h3>App 01</h3>

  <aside>
    <div>Page List:</div>
    <RouterLink to="page01">Page 01</RouterLink>
    <RouterLink to="page02">Page 02</RouterLink>
  </aside>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
aside {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
}

a {
  margin: 0 10px;
}
</style>
