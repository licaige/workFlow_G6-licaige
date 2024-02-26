<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-11 18:50:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-11 21:06:54
-->
<template>
  <div class="layout-container">
    <div class="layout-container-table">
      点击状态：{{ sideStr }}
      <div class="box">
        <span>InSide</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import clickoutside from '@/directive/clickOutside'

export default defineComponent({
  directives: {
    // clickoutside,
  },
  setup() {
    const sideStr = ref('')
    const setData = (type) => {
      if (type) {
        sideStr.value = 'outSide'
      } else {
        sideStr.value = 'inSide'
      }
    }
    return {
      sideStr,
      setData,
    }
  },
})
</script>

<style lang="scss" scoped>
  .box {
    width: 200px;
    height: 200px;
    background: red;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
  }
</style>
