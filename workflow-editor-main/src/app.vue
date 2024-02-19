<template>
  <div class="workflow-editor">
    <AppFlow v-if="type==='flow'"></AppFlow>
    <AppForm v-else-if="type === 'form'"></AppForm>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";
import AppFlow from "./module-flow/index.vue";
import AppForm from "./module-form/index.vue"

export default defineComponent({
  name: "WorkflowEditor",
  components: {AppFlow,AppForm},
  props: {},
  setup(props) {
    let type = ref("flow")
    return {
      type,
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
.workflow-editor {
  .wcontent {
    display: flex;
    flex-grow: 1;
    z-index: 1;

    .container {
      flex-grow: 1;
    }
  }

}

</style>