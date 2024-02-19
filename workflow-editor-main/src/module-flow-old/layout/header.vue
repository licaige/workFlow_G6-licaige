<template>
  <div class="z-toolbar">
    流程表单设计器
    <div class="z-body" ref="toolbar"></div>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, watch} from "vue";

export default defineComponent({
  setup() {


  }
})
</script>
<style lang="less" scoped>
.z-toolbar {
  height: 44px;
  background-color: #f7f9fb;
  border-bottom: 1px solid #bbb;
  box-shadow: 0 2px 2px #ccc;
  z-index: 3;
  display: flex;
  align-items: center;
  padding-left: 10px;

  .z-body {
    height: 100%;
  }
}
</style>