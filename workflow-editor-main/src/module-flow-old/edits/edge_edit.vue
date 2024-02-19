<template>
  <Panel v-if="!!edge" class="z-edge-edit" :title="info.name">
    <template #title-action>
      <el-button class="button" type="text" @click="EdgeDelete">删除</el-button>
    </template>
    <template #default>
      <el-form
          label-position="top"
          :model="form"
      >
        <el-form-item label="名称">
          <el-input v-model="form.name"/>
        </el-form-item>
        <div>
          <el-button style="width: 47%" @click="resetForm(edge)">重置</el-button>
          <el-button style="width: 47%" type="primary" @click="submit()">提交</el-button>
        </div>
      </el-form>

      <Panel class="z-edge-edit-form" title="表单设置">
        <div class="z-content">
          <el-button class="z-add" @click="ShowEdit">添加</el-button>
        </div>
      </Panel>

      <EdgeEditForm v-model="showEdit"></EdgeEditForm>
    </template>
  </Panel>
</template>

<script lang="ts" setup>
import Panel from "../../components/panel"
import EdgeEditForm from "./edge_edit_form.vue"
import zpx from "zpx";
import {Events, GraphMode, VEvents} from "../lib/types";
import {IEdge} from "@antv/g6";
import {ref} from "vue";

const showEdit = ref(false)
const edge = ref<IEdge | null>()
const info = ref<any>({})
const form = ref<any>({})

zpx.on(VEvents.EdgeEdit, (v: IEdge | null) => {
  edge.value = v
  if (!v) {
    info.value = {}
    return
  }
  resetForm(v, true)
})

function ShowEdit() {
  showEdit.value = true
}

function resetForm(v: IEdge, flag = false) {
  info.value = {
    name: zpx.val(v, "_cfg.model.label")
  }

  form.value = {
    name: flag ? info.value.name : null
  }
  submit(flag)
}

function submit(flag = false) {
  if (!edge.value) {
    return
  }
  zpx.emit(Events.GraphUpdateElement, {
    item: edge.value,
    cfg: {
      label: form.value.name,
    }
  })
  if (!flag) {
    zpx.emit(Events.GraphModeChange, GraphMode.default)
    edge.value = null
  }
}

function EdgeDelete() {
  if (!edge.value) {
    return
  }


  let obj = edge.value as IEdge

  let source = obj.getSource()
  source.removeEdge(obj)
  source.refresh()

  let target = obj.getTarget()
  target.removeEdge(obj)
  target.refresh()

  let group = obj.getContainer()
  group.remove(true)

  zpx.emit(Events.GraphRemoveElement, obj)
  zpx.emit(Events.GraphModeChange, GraphMode.default)
  edge.value = null
}

</script>

<style lang="less" scoped>
.z-edge-edit {
  ::v-deep(.el-form) {
    padding: 5px;
    margin-bottom: 10px;

    .el-form-item__label {
      margin-bottom: 3px;
    }
  }

  .z-edge-edit-form {
    .z-content {
      width: calc(100% - 10px);
      margin: 5px;

      .z-add {
        border-style: dashed;
        width: 100%;
      }
    }
  }
}
</style>