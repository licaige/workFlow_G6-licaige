<template>
  <div id="app">
    <div class='tab-con'>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="home" name="/"></el-tab-pane>
        <el-tab-pane label="page2" name="page2"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      activeName: window.location.href.includes('#/page2') ? 'page2': '/',
    }
  },
  created () {

  },
  components: {

  },
  methods: {
    handleClick(tab) {
      this.$router.push(tab.name)
    }
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
  background: #fff;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
