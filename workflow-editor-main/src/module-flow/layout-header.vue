<template>
  <div class="z-toolbar">
    <div class="z-label">流程表单设计器</div>
    <div class="z-body" ref="toolbar">
      <el-button @click="reset">重置</el-button>
      <el-button @click="save">保存</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, SetupContext} from "vue";

export default defineComponent({
  emits: ["reset", "confirm", "save"],
  setup(props, ctx: SetupContext) {

    return {
      reset() {
        ctx.emit("reset")
      },
      confirm() {
        ctx.emit("confirm")
      },
      save() {
        ctx.emit("save")
      },
    }
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

  .z-label {
    flex-grow: 1;
  }

  .z-body {
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }
}
</style>