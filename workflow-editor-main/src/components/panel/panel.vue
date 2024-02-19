<template>
  <div class="z-panel" :style="localStyle">
    <div class="z-title" v-if="title||$slots.title">
      <slot name="title">
        <div class="z-title-default">{{ title }}</div>
      </slot>
      <div style="padding-right: 5px;">
        <slot name="title-action"></slot>
      </div>
    </div>
    <div class="z-body">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRef, watch} from 'vue'
import zpx from "zpx";


export default defineComponent({
  name: "Panel",
  props: {
    title: String,
    width: {type: String, default: "250px"},
    direct: {
      type: String,
      validator: v => ["top", "bottom", "left", "right"].indexOf(v) > -1
    },
    style: {type: Object, default: () => ({})},
  },
  setup(props) {
    let localStyle = reactive<Record<string, string>>(props.style as {})
    watch([
      toRef(props, "width"),
      toRef(props, "direct"),
    ], ([width, direct]) => {

      localStyle.width = width

      switch (direct) {
        case "top":
          localStyle["border-bottom"] = "1px solid #e6e9ed";
          break;
        case "left":
          localStyle["border-right"] = "1px solid #e6e9ed";
          break;
        case "right":
          localStyle["border-left"] = "1px solid #e6e9ed";
          break;
        case "bottom":
          localStyle["border-top"] = "1px solid #e6e9ed";
          break;
        default:
      }
    }, {immediate: true})
    return {
      localStyle,
    }
  }
})
</script>
<style lang="less" scoped>
.z-panel {
  z-index: 2;
  background: #f7f9fb;
  width: 200px;
  display: flex;
  flex-direction: column;
  font-size: 14px;

  .z-title {
    height: 32px;

    border-top: 1px solid #dce3e8;
    border-bottom: 1px solid #dce3e8;
    background: #ebeef2;
    color: #000;
    line-height: 32px;
    padding-left: 12px;
    display: flex;

    &-default {
      flex-grow: 1;
    }
  }

  .z-body {
    flex-grow: 1;
  }
}
</style>