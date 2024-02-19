<template>
  <Panel direct="right">
    <div class="z-right">
      <div class="z-content">
        <NodeEdit></NodeEdit>
        <EdgeEdit></EdgeEdit>
      </div>
      <Panel class="z-mini-canvas" title="导航器">
        <Minimap class="z-minimap"/>
      </Panel>
    </div>
  </Panel>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue'
import Panel from "../../components/panel"
import Minimap from "./minimap.vue"
import NodeEdit from "../edits/node_edit.vue"
import EdgeEdit from "../edits/edge_edit.vue"


export default defineComponent({
  components: {Panel, Minimap, NodeEdit, EdgeEdit},
  props: {},
  setup(props) {

    return {}
  }
})

</script>
<style lang="less" scoped>
.z-right {
  display: flex;
  flex-direction: column;
  height: 100%;

  .z-content {
    flex-grow: 1;
  }

  .z-mini-canvas {
    height: 250px;
  }
}
</style>