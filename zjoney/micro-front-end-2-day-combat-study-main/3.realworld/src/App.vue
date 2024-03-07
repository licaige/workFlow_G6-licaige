<template>
  <div id="app">
    <router-link to="/foo"> Goto Foo </router-link> |
    <router-link to="/bar"> Goto bar </router-link>

    <div>
      <router-view />
    </div>

  </div>

</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
