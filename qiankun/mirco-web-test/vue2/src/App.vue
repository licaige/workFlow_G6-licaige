<template>
  <div id="app-vue">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style>
#container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
}
</style>
