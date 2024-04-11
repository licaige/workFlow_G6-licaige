<template>
  <div>
    <h1>这是app组件</h1>
    <h3>{{msg}}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'is ok'
    }
  }
}
</script>
<style scoped>
h1 {
  color: red;
  
}
</style>