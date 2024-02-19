<template>
  <Header @reset="onReset" @confirm="onConfirm" @save="onSave"/>
  <div class="wcontent">
    <Panel direct="left" style="height: 100%;">
      <div style="display: flex;flex-direction: column;height: 100%;">
        <Panel direct="left" title="流程组件" style="flex-grow: 1;">
          <LayoutSteps @add="onAdd"></LayoutSteps>
        </Panel>
        <Panel direct="left" title="流程组件">
        </Panel>
      </div>
    </Panel>
    <div class="container">
      <div class="container-c" ref="container"></div>
    </div>
    <Panel direct="right">
      <div class="z-right">
        <div class="z-content">
        </div>
        <Panel class="z-mini-canvas" title="导航器">
          <div class="z-minimap" ref="minimap"></div>
        </Panel>
      </div>
    </Panel>
  </div>
</template>
<script lang="ts">
import {defineComponent, SetupContext} from "vue";
import Header from "./layout-header.vue"
import LayoutSteps from "./layout-steps.vue";
import Panel from "../components/panel"
import init from "./init";

export default defineComponent({
  components: {Header, LayoutSteps, Panel},
  props: {},
  setup(props: any, ctx: SetupContext) {
    return {
      ...init(props, ctx),
    }
  }
})


</script>

<style lang="less">
.workflow-editor {
  display: flex;
  height: 100%;
  flex-direction: column;
  font-size: 14px;
}
</style>
<style lang="less" scoped>
.wcontent {
  display: flex;
  flex-grow: 1;
  z-index: 1;

  .container {
    flex-grow: 1;
    position: relative;

    .container-c {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}

.z-right {
  display: flex;
  flex-direction: column;
  height: 100%;

  .z-content {
    flex-grow: 1;
  }

  .z-mini-canvas {
    height: 250px;

    .z-minimap {
      height: 100%;
    }
  }
}
</style>