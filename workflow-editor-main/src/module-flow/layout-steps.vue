<template>
  <div class="z-layout-steps">
    <div class="z-item" v-for="(item,index) in items" :key="index">
      <img draggable="true" @dragend="handleDragEnd($event,item)"
           :style="{width: item.width+'px',height: item.height+'px'}" :src="item.img" alt=""/>
      <div style="font-size: 14px;padding: 5px;">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, SetupContext} from "vue";
import {StepNode} from "./type"
import StepStart from "../assets/step_start.svg"
import StepEnd from "../assets/step_end.svg"
import GatewayMutex from "../assets/gateway-mutex.svg"
import GatewayParallel from "../assets/gateway-parallel.svg"
import FlowTask from "../assets/flow-task.svg"
import FlowUser from "../assets/flow-user.svg"

export default defineComponent({
  setup(props, ctx: SetupContext) {
    let items: StepNode[] = [
      {
        name: "开始",
        type: "c-image",
        imgType: "endpoint",
        img: StepStart,
        width: 42,
        height: 42,
      },
      {
        name: "结束",
        type: "c-image",
        imgType: "endpoint",
        img: StepEnd,
        width: 42,
        height: 42,
      },
      {
        name: "任务流转",
        type: "c-image",
        imgType: "rect",
        img: FlowTask,
        width: 80,
        height: 44,
      },
      {
        name: "人员指派",
        type: "c-image",
        imgType: "rect",
        img: FlowUser,
        width: 80,
        height: 44,
      },
      {
        name: "并行任务",
        type: "c-image",
        imgType: "gateway",
        img: GatewayParallel,
        width: 42,
        height: 42,
      },
      {
        name: "互斥任务",
        type: "c-image",
        imgType: "gateway",
        img: GatewayMutex,
        width: 42,
        height: 42,
      },
    ]

    return {
      items,
      handleDragEnd(e: DragEvent, item: StepNode) {
        ctx.emit("add", e, item)
      }
    }
  }
})
</script>
<style lang="less" scoped>
.z-layout-steps {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .z-item {
    width: calc(50% - 20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;

    img {
      cursor: move;
    }
  }
}
</style>