<template>
  <el-drawer
      :model-value="modelValue"
      :before-close="close"
      :size="680"
  >
    <template #title>
      <span style="font-size: 16px;">添加表单组件</span>
    </template>

    <div class="z-content">
      <div class="z-example">
        <el-form :model="exampleForm" label-width="80px">
          <el-form-item :label="form.name" prop="name" :rules="{required: form.required,message: example.roleMessage}">
            <el-input v-if="form.type === 'string'" v-model="exampleForm.name" :placeholder="`${example.placeholder}`"
                      style="width:200px;"></el-input>
            <el-input v-else-if="form.type === 'number'" v-model.number="exampleForm.name" type="number"
                      :placeholder="`${example.placeholder}`" style="width:200px;"></el-input>
            <el-checkbox-group v-else-if="form.type === 'checkbox'" v-model="exampleForm.name">
              <el-checkbox
                  v-for="child in form.items"
                  :is="child.component"
                  :label="child.value"
              >
                {{ child.label }}
              </el-checkbox>
            </el-checkbox-group>
            <el-radio-group v-else-if="form.type === 'radio'" v-model="exampleForm.name">
              <el-radio
                  v-for="child in form.items"
                  :is="child.component"
                  :label="child.value"
              >
                {{ child.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <el-form
          ref="compForm"
          :model="form"
          label-width="80px"
          class="z-form"
      >
        <div style="display: flex;height: 100%;">
          <div class="form-component">
            <div class="form-title">组件设置</div>

            <div style="padding: 5px;">
              <el-form-item label="字段名称" prop="name" :rules="ruleChange">
                <el-input v-model="form.name" placeholder="请输入字段名称" style="width: 100%;"/>
              </el-form-item>
              <el-form-item label="组件类型" prop="type" :rules="ruleBlur">
                <el-select v-model="form.type" placeholder="请选择组件类型" style="width: 100%;">
                  <el-option v-for="item in componentType" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>

              <el-form-item label="是否必填" prop="required" :rules="ruleChange">
                <el-radio-group v-model="form.required">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="form-field">
            <div class="form-title">属性设置</div>
            <div style="padding: 5px;">
              <template v-if="['string','number'].indexOf(form.type) > -1">
                <el-form-item label="默认值" prop="default">
                  <el-input v-model="form.default" placeholder="请输入默认值" style="width: 100%;"/>
                </el-form-item>
              </template>
              <template v-if="['checkbox','radio'].indexOf(form.type) > -1">
                <el-button style="border-style: dashed;width: 100%;" @click="showAddItem = true">添加选项</el-button>
              </template>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm" close>确定</el-button>
      </span>
    </template>
  </el-drawer>
  <EdgeEditAddItem v-model="showAddItem" :value="showAddItemForm" :type="showAddItemType"
                   @confirm="showAddItemConfirm"/>
</template>
<script lang="ts">
import {defineComponent, reactive, ref, SetupContext, toRef, watch} from "vue";
import {ElInput, ElCheckbox, ElCheckboxGroup, ElDatePicker} from "element-plus";
import EdgeEditAddItem from "./edge_edit_add_item.vue"

export default defineComponent({
  components: {ElInput, ElCheckbox, ElDatePicker, ElCheckboxGroup, EdgeEditAddItem},
  props: {
    modelValue: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props: any, ctx: SetupContext) {
    let componentType = [
      {label: "字符串", value: "string", component: "el-input", trigger: "blur"},
      {label: "整形", value: "number", component: "el-input", trigger: "blur"},
      {label: "复选框", value: "checkbox", component: "el-checkbox-group", trigger: "change"},
      {label: "单选框", value: "radio", component: "el-radio-group", trigger: "change"},
      {label: "日期选择", value: "date", component: "el-date-picker", trigger: "change"},
      {label: "日期时间", value: "datetime", component: "el-date-picker", trigger: "change"},
    ]

    let showAddItem = ref(false)
    let showAddItemType = ref("add")
    let showAddItemForm = ref({})

    let ruleBlur = {required: true, message: "必填"}
    let ruleChange = {required: true, message: "必填"}

    let example = ref<Record<string, any>>({
      component: null,
      placeholder: null,
      roleMessage: null,
    })
    let exampleForm = ref<Record<string, any>>({})

    let form = reactive({
      name: "字段名称",
      type: "string",
      required: true,
      default: null,
      items: [] as any[],
    })

    let current = ref<any>()

    watch(toRef(form, "default"), (v) => {
      exampleForm.value.name = v
    })
    watch(toRef(form, "type"), (v) => {
      let item = componentType.find(r => r.value == v)
      if (item) {
        current.value = item
        example.value = {
          component: item.component,
        }

        switch (item.trigger) {
          case "blur":
            example.value.placeholder = "请输入" + form.name;
            example.value.roleMessage = form.name + "必填";
            break;
          case "change":
            example.value.placeholder = "请选择" + form.name;
            example.value.roleMessage = form.name + "必选";
            break;
        }
      } else {
        example.value = {
          component: null,
        }
      }
    }, {immediate: true})


    return {
      ruleBlur, ruleChange, example, exampleForm, showAddItem, showAddItemForm, showAddItemType,
      form, componentType,
      close() {
        ctx.emit("update:modelValue", false)
      },
      showAddItemConfirm(item: any) {
        if (showAddItemType.value == "add") {
          form.items.push({
            label: item.label,
            value: item.value,
          })
        } else {
          form.items[item.id] = {
            label: item.label,
            value: item.value,
          }
        }
      },
      confirm() {
        console.log(form)
        // ctx.emit("update:modelValue", false)
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