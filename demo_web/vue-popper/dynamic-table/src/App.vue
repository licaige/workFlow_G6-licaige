<template>
  <DynamicModifyTable />
</template>

<script>
import DynamicModifyTable from './components/DynamicModifyTable.vue'

export default {
  name: 'App',
  components: {
    DynamicModifyTable
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
