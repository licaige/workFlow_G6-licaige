<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-11 18:50:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-11 20:56:01
-->
<template>
  <div class="layout-container">
    <div class="layout-container-table">
      <div class="box">
        <el-input v-model="input" placeholder="输入需要粘贴的值"></el-input>
        <el-button type="primary">复制到剪切板</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import Copy from '@/directive/copy'

export default defineComponent({
  directives: {
    // Copy,
  },
  setup() {
    const input = ref('')
    return {
      input,
    }
  },
})
</script>

<style lang="scss" scoped>
  .box {
    display: flex;
    .el-input {
      margin-right: 10px;
    }
  }
</style>
