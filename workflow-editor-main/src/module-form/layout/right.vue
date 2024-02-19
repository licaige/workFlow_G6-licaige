<template>
  <Panel direct="right" title="属性设置" width="350px">
    <div class="z-form">
      <el-form v-if="form" style="width: 100%;" :model="form">
        <el-form-item
            label="标签名称">
          <el-input v-model="form.label" @update:model-value="changeLabel" clearable/>
        </el-form-item>
        <el-form-item
            v-if="[
                CompType.String,
                CompType.Password,
                CompType.Textarea,
                CompType.Number,
                CompType.Select,
                ].indexOf(form.type) !== -1"
            label="占位提示">
          <el-input v-model="form.placeholder" @change="changeForm" clearable/>
        </el-form-item>
        <el-form-item
            v-if="[
                CompType.Radio,
                CompType.Checkbox,
                CompType.Switch,
                CompType.CurrentDatetime,
                CompType.CurrentUser,
                CompType.Upload,
                CompType.Image,
                ].indexOf(form.type) === -1"
            label="是否可清空">
          <el-switch v-model="form.clearable" @change="changeForm" active-text="是" inactive-text="否"/>
        </el-form-item>
        <el-form-item
            v-if="[
                CompType.Upload,
                CompType.Image,
                ].indexOf(form.type) !== -1"
            label="允许多选">
          <el-switch v-model="form.ext.multiple" @change="changeForm" active-text="是" inactive-text="否"/>
        </el-form-item>
        <el-form-item
            v-if="[
                CompType.Upload,
                CompType.Image,
                ].indexOf(form.type) !== -1"
            label="数量限制">
          <el-input v-model.number="form.ext.limit" type="number" @update:model-value="changeLabel" clearable/>
        </el-form-item>

        <template v-if="[
            CompType.Select,
            CompType.Checkbox,
            CompType.Radio,
        ].indexOf(form.type) > -1">
          <el-divider>选项</el-divider>

          <div>
            <VueDraggableNext
                v-model="form.options" tag="transition-group" :animation="200" group="description"
                @ended="changeForm"
            >
              <div v-for="item in form.options" class="z-option">
                <div>
                  <svg style="width: 32px;height: 32px;" t="1648911384622" class="icon" viewBox="0 0 1024 1024"
                       version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3644" width="200" height="200">
                    <path
                        d="M369 400.5c4.2 4.6 9.9 6.9 15.6 6.9 5.1 0 10.3-1.9 14.3-5.6 8.7-8 9.2-21.5 1.3-30.1L315 278.6c-8-8.8-23.3-8.8-31.3 0l-85.3 93.1c-8 8.7-7.4 22.2 1.3 30.1 8.7 8 22.1 7.4 30.1-1.3l48.4-52.8v328.2l-48.4-52.8c-8-8.7-21.4-9.2-30.1-1.3-8.7 8-9.2 21.5-1.3 30.1l85.3 93.1 0.3 0.3c0.6 0.6 1.4 1.2 2.1 1.8l1.2 1c0.8 0.6 1.7 1 2.7 1.5 0.3 0.2 0.6 0.4 1 0.6 1.1 0.5 2.3 0.8 3.5 1.1l0.6 0.2c1.4 0.3 2.8 0.5 4.3 0.5s3-0.2 4.3-0.5l0.6-0.2c1.2-0.3 2.4-0.6 3.5-1.1 0.3-0.1 0.6-0.4 1-0.5 0.9-0.5 1.8-0.9 2.7-1.5 0.4-0.3 0.8-0.6 1.2-1l2.1-1.8 0.3-0.3 85.3-93.1c8-8.7 7.4-22.2-1.3-30.1-8.7-8-22.1-7.4-30.1 1.3L320.6 676V347.7l48.4 52.8zM733.5 381h-270c-13.8 0-25-11.2-25-25s11.2-25 25-25h270c13.8 0 25 11.2 25 25s-11.2 25-25 25zM734 536H464c-13.8 0-25-11.2-25-25s11.2-25 25-25h270c13.8 0 25 11.2 25 25s-11.2 25-25 25zM734 691H464c-13.8 0-25-11.2-25-25s11.2-25 25-25h270c13.8 0 25 11.2 25 25s-11.2 25-25 25z"
                        p-id="3645"></path>
                  </svg>
                </div>
                <el-input v-model="item.label" @change="changeForm" clearable/>
                <el-input v-model="item.value" @change="changeForm" clearable/>
                <div style="cursor:pointer;" @click="form.options = form.options.filter(r=>r.id !== item.id)">
                  <svg style="width: 18px;height: 18px;margin-left: 5px;" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="4572" width="200" height="200">
                    <path
                        d="M768 384c-19.2 0-32 12.8-32 32l0 377.6c0 25.6-19.2 38.4-38.4 38.4L326.4 832c-25.6 0-38.4-19.2-38.4-38.4L288 416C288 396.8 275.2 384 256 384S224 396.8 224 416l0 377.6c0 57.6 44.8 102.4 102.4 102.4l364.8 0c57.6 0 102.4-44.8 102.4-102.4L793.6 416C800 396.8 787.2 384 768 384z"
                        p-id="4573" fill="#d81e06"/>
                    <path
                        d="M460.8 736l0-320C460.8 396.8 448 384 435.2 384S396.8 396.8 396.8 416l0 320c0 19.2 12.8 32 32 32S460.8 755.2 460.8 736z"
                        p-id="4574" fill="#d81e06"/>
                    <path
                        d="M627.2 736l0-320C627.2 396.8 608 384 588.8 384S563.2 396.8 563.2 416l0 320C563.2 755.2 576 768 588.8 768S627.2 755.2 627.2 736z"
                        p-id="4575" fill="#d81e06"/>
                    <path
                        d="M832 256l-160 0L672 211.2C672 166.4 633.6 128 588.8 128L435.2 128C390.4 128 352 166.4 352 211.2L352 256 192 256C172.8 256 160 268.8 160 288S172.8 320 192 320l640 0c19.2 0 32-12.8 32-32S851.2 256 832 256zM416 211.2C416 198.4 422.4 192 435.2 192l153.6 0c12.8 0 19.2 6.4 19.2 19.2L608 256l-192 0L416 211.2z"
                        p-id="4576" fill="#d81e06"/>
                  </svg>
                </div>
              </div>
            </VueDraggableNext>
            <el-button style="border-style: dashed;width: 100%;margin-top: 5px;" @click="addOption">添加</el-button>
          </div>

        </template>

        <template v-if="CompType.Switch === form.type">
          <el-divider>自定义配置</el-divider>
          <el-form label-width="100px;">
            <el-form-item label="打开文本">
              <el-input v-model="form.ext.trueLabel" @change="changeForm" clearable/>
            </el-form-item>
            <el-form-item label="关闭文本">
              <el-input v-model="form.ext.falseLabel" @change="changeForm" clearable/>
            </el-form-item>
          </el-form>
        </template>
      </el-form>
    </div>
  </Panel>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef, watch} from "vue";
import Panel from "../../components/panel"
import {ComponentItem, CompType} from "./events";
import {VueDraggableNext} from 'vue-draggable-next'
import zpx from "zpx";

export default defineComponent({
  components: {Panel, VueDraggableNext},
  props: {
    base: {type: Object, default: () => ({})},
    data: {type: Array as PropType<ComponentItem[]>, default: () => ([])},
    current: {type: Object as PropType<ComponentItem>, default: () => ({})},
  },
  emits: ["changeCurrent"],
  setup(props, ctx) {
    let form = ref<ComponentItem>({} as any)
    watch(toRef(props, "current"), (v: ComponentItem) => {
      form.value = v
    })

    return {
      form, CompType,
      changeLabel() {
        form.value.placeholder = `${props.current.ctype == 'input' ? "请输入" : "请选择"}${form.value.label}`
        ctx.emit("changeCurrent", form.value)
      },
      changeForm() {
        ctx.emit("changeCurrent", form.value)
      },
      addOption() {
        form.value.options?.push({id: zpx.uuid(), label: "选项", value: "0"})
      }
    }
  }
})
</script>

<style lang="less" scoped>
.z-form {
  padding: 15px;

  ::v-deep(.el-divider__text) {
    background-color: #f7f9fb;
  }

  .z-option {
    display: flex;
    align-items: center;

    & > div:first-child {
      width: 60px;

      svg {
        cursor: move;
      }
    }

    & > div {
      flex-grow: 1;
    }
  }
}
</style>