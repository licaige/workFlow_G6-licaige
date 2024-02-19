<template>
  <Header/>
  <div class="wcontent">
    <Left></Left>
    <div ref="container" class="container"></div>
    <Right></Right>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import Header from "./layout/header.vue"
import Left from "./layout/left.vue"
import Right from "./layout/right.vue"
import InitGraph from "./lib/init"
import DoEvent from "./lib/event"
import "./g6"

export default defineComponent({
  components: {Header, Left, Right},
  props: {},
  setup(props) {
    let {container, graph} = InitGraph()
    DoEvent(graph as any)

    return {
      container,
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
  }
}


</style>