<template>
<div class="vue2">
  <el-button type="primary" round @click='changeData'>发送数据</el-button>
  <micro-app
    name='vue2'
    url='http://localhost:4001/micro-app/vue2'
    :data='data'
  >
    <!-- destroy inline scopecss  baseRoute='/vue2' -->
  </micro-app>
</div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

const data = ref({from: '来自基座的初始化数据'})
const changeData = () => {
  data.value = {from: '来自基座的数据' + (+new Date())}
}

// onMounted(() => {
//   let e = document.getElementById('vue2')
//   console.log(e.attributes.getNamedItem("name"))
//   let a = document.createAttribute("name")
//   a.value = 'vue2'
//   e.attributes.setNamedItem(a)
// })

</script>

<style>

</style>
