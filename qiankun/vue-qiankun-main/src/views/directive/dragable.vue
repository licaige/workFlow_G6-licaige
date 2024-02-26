<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-11 18:50:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-11 21:00:14
-->
<template>
  <div class="layout-container">
    <div class="layout-container-table">
      <p>自由切换父级</p>
      <el-button @click="changeBox('father')">father</el-button>
      <el-button @click="changeBox('body')">body</el-button>
      <el-button @click="changeBox('.layout-container-table')">自定义父级类名：.layout-container-table</el-button>
      <p>父级：{{ dragableFather }}</p>
      <div class="box">
        <div class="row"></div>
        <div class="row"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import dragable from '@/directive/dragable'

export default defineComponent({
  directives: {
    // dragable,
  },
  setup() {
    const dragableFather = ref('body')
    const changeBox = (str) => {
      dragableFather.value = str
    }
    return {
      dragableFather,
      changeBox,
    }
  },
})
</script>

<style lang="scss" scoped>
  .box {
    border: 1px solid #eee;
    width: 100%;
    height: 200px;
    .row {
      width: 50px;
      height: 50px;
      background: red;
    }
  }
</style>
