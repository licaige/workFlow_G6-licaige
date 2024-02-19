<template>
  <div class="z-toolbar">
    <div class="z-body"></div>
    <div class="z-action">

      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="$emit('confirm')">确定</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  emits:["confirm","cancel"]
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
    flex-grow: 1;
  }

  .z-action {
    padding: 0 10px;
  }
}
</style>