<template>
  <h3>项目一</h3>
  <aside>
    <div>来点真的</div>
    <RouterLink to="page01">页面一</RouterLink>
    <RouterLink to="page02">页面二</RouterLink>
  </aside>
  <main>
    <RouterView />
  </main>
</template>
<script setup lang="ts">
console.log("app 01 mounted");
</script>
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
