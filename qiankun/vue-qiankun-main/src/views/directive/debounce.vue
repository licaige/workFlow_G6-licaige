<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-11 18:50:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-11 21:07:32
-->
<template>
  <div class="layout-container">
    <div class="layout-container-table">
      <div class="box">
        <el-button type="primary">防抖按钮</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
// import Debounce from '@/directive/debounce'

export default defineComponent({
  directives: {
    // Debounce,
  },
  setup() {
    const getData = () => {
      ElMessage({
        type: 'success',
        message: '正在拉取数据',
      })
    }
    return {
      getData,
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
