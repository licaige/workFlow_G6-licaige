<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <SiEditor/>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import SiEditor from './views/siEditor'

export default {
  name: 'App',
  components: {
    SiEditor
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
body {
  margin: 0;
  padding: 0;
}
</style>
