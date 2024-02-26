<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-10 23:37:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-13 12:14:58
-->
<template>
  <div class="menn-setting">
    <i class="iconfont icon-shezhi-xianxing" @click="handleClick"></i>
    <el-drawer v-model="drawer" title="系统设置" :show-close="false" size="20%">
      <span>Hi there!</span>
    </el-drawer>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  components: {
  },
  setup() {
    const drawer = ref(false)
    const handleClick = () => {
      drawer.value = true
    }
    return {
      drawer,
      handleClick,
    }
  },
}
</script>
