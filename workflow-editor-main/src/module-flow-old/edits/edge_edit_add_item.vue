<template>
  <el-dialog
      :model-value="modelValue"
      title="添加选项"
      width="360px"
      :before-close="close"
  >
    <el-form ref="compForm" :model="form" label-width="80px">
      <template v-if="modelValue">
        <el-form-item label="展示值" prop="label" :rules="rules">
          <el-input v-model="form.label" placeholder="请输入展示值"/>
        </el-form-item>
        <el-form-item label="表单值" prop="value" :rules="rules">
          <el-input v-model="form.value" placeholder="请输入表单值"/>
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import {defineComponent, reactive, ref, SetupContext, toRef, watch} from "vue";
import {FormInstance} from "element-plus"

export default defineComponent({
  components: {},
  props: {
    modelValue: Boolean,
    value: Object,
    type: {type: String, default: "add"}
  },
  emits: ["update:modelValue", "confirm"],
  setup(props: any, ctx: SetupContext) {

    let compForm = ref<FormInstance>()
    let form = ref<Record<string, string | null>>({
      id: null,
      label: null,
      value: null,
    })

    watch(toRef(props, "modelValue"), (v) => {
      if (!v) {
        return
      }

      form.value = {
        id: null,
        label: null,
        value: null,
      }
      if (props.value && props.type == "edit") {
        form.value.id = props.value.id
        form.value.label = props.value.label
        form.value.value = props.value.value
      }
    })

    return {
      form, compForm,
      rules:[{required: true,message: '必填'}],
      close() {
        ctx.emit("update:modelValue", false)
      },
      confirm() {
        if (compForm.value) {

          compForm.value.validate((flag: boolean) => {
            if (!flag) {
              return
            }

            ctx.emit("confirm", form.value)
            ctx.emit("update:modelValue", false)
          })


        }
      }
    }
  }
})

</script>

<style lang="less" scoped>
.edge-edit-form > :global( .el-drawer__header) {
  margin-bottom: 0;
}

.z-content {
  display: flex;
  flex-direction: column;
  height: 100%;

  .z-example {
    height: 80px;
    border: 1px dashed #bbb;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-form {
      padding: 0;
      margin-bottom: 0;

      .el-form-item--default {
        margin-bottom: 0;
      }
    }
  }

  .z-form {
    flex-grow: 1;
    height: 100%;

    .form-title {
      background-color: #eee;
      padding: 5px;
    }

    .form-component {
      width: 1px;
      flex-grow: 1;
      border: 1px dashed #bbb;
      height: 100%;
    }

    .form-field {
      width: 1px;
      flex-grow: 1;
      border: 1px dashed #bbb;
      margin-left: 5px;
      height: 100%;
    }
  }
}
</style>