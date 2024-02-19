<template>
  <div class="z-minimap" ref="minimap"></div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue'
import Panel from "../../components/panel"
import zpx from "zpx";
import G6 from '@antv/g6';
import {Events} from "../lib/types";


export default defineComponent({
  components: {Panel},
  props: {},
  setup(props) {
    let minimap = ref()
    watch(minimap, v => {
      Init(v)
    })

    return {minimap}
  }
})

function Init(minimap) {
  let w = minimap.clientWidth
  let h = minimap.clientHeight
  let plugin = new G6.Minimap({
    container: minimap,
    size: [w, h]
  })
  zpx.emit(Events.PluginMinimapRegister, plugin)
}
</script>

<style scoped>
.z-minimap {
  height: 100%;
}
</style>