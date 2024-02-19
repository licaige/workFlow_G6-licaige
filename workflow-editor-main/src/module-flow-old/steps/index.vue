<template>
  <div class="z-steps">
    <div class="z-item" v-for="(item,index) in steps" :key="index">
      <img draggable="true" @dragend="handleDragEnd($event,item)"
           :style="{width: item.size[0]+'px',height: item.size[1]+'px'}" :src="item.background" alt=""/>
      <div style="font-size: 14px;padding: 5px;">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import zpx from "zpx";
import {Events, INode} from "../lib/types";
import {ModelConfig} from "@antv/g6-core/lib/types";
import {steps, stepAttr} from "../g6/element/default-nodes";


export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    return {
      steps,
      handleDragEnd(e, item) {
        zpx.emit(Events.NodeAddPx, {
          ...stepAttr(item.type),
          x: e.x,
          y: e.y,
        } as ModelConfig)
      }
    }
  }
})

</script>

<style lang="less" scoped>
.z-steps {
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