<template>
  <Panel direct="left" title="输入型组件" width="350px">
    <div class="left-content">
      <div class="left-item" v-for="item in compInputs" @click="()=>select(item)">
        <div>{{ item.label }}</div>
      </div>
    </div>

    <Panel direct="left" title="选择型组件" width="350px">
      <div class="left-content">
        <div class="left-item" v-for="item in compSelects" @click="()=>select(item)">
          <div>{{ item.label }}</div>
        </div>
      </div>

      <Panel direct="left" title="系统组件" width="350px">
        <div class="left-content">
          <div class="left-item" v-for="item in compSystems" @click="()=>select(item)">
            <div>{{ item.label }}</div>
          </div>
        </div>
      </Panel>
    </Panel>
    <Panel direct="left" title="基础设置" width="350px">
      <div class="left-content">
        <el-form style="width: 100%;">
          <el-form-item label="标签宽度">
            <el-input-number v-model="form.labelWidth" :step="10" style="width: 100%;" @change="changeForm"/>
          </el-form-item>
          <el-form-item label="标签对齐">
            <el-radio-group v-model="form.labelType" @change="changeForm">
              <el-radio-button label="left">左对齐</el-radio-button>
              <el-radio-button label="right">右对齐</el-radio-button>
              <el-radio-button label="top">顶部对齐</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </Panel>
  </Panel>
</template>

<script lang="ts">
import {defineComponent, reactive, SetupContext} from "vue";
import Panel from "../../components/panel"
import {CompType, ComponentItem} from "./events"


const compInputs: ComponentItem[] = [
  {label: "文本", type: CompType.String, ctype: "input", ext: {}},
  {label: "密码", type: CompType.Password, ctype: "input", ext: {}},
  {label: "多行文本", type: CompType.Textarea, ctype: "input", ext: {}},
  {label: "数字", type: CompType.Number, ctype: "input", ext: {}},
  {label: "计数器", type: CompType.Snumber, ctype: "input", ext: {}},
]
const compSelects: ComponentItem[] = [
  {label: "下拉框", type: CompType.Select, ctype: "select", ext: {}},
  {label: "单选框", type: CompType.Radio, ctype: "select", ext: {}},
  {label: "复选框", type: CompType.Checkbox, ctype: "select", ext: {}},
  {label: "开关", type: CompType.Switch, ctype: "select", ext: {}},
  {label: "滑块", type: CompType.Slider, ctype: "select", ext: {}},
  {label: "评分", type: CompType.Rate, ctype: "select", ext: {}},
  {label: "日期", type: CompType.Date, ctype: "select", ext: {}},
  {label: "日期范围", type: CompType.Dates, ctype: "select", ext: {}},
  {label: "时间", type: CompType.Time, ctype: "select", ext: {}},
  {label: "颜色选择", type: CompType.Color, ctype: "select", ext: {}},
  {label: "文件上传", type: CompType.Upload, ctype: "select", ext: {}},
  {label: "图片上传", type: CompType.Image, ctype: "select", ext: {}},
]
const compSystems: ComponentItem[] = [
  {label: "当前用户", type: CompType.CurrentUser, ctype: "other", ext: {}},
  {label: "当前时间", type: CompType.CurrentDatetime, ctype: "other", ext: {}},
]

export default defineComponent({
  components: {Panel},
  emits: ["addComponent", "baseChange"],
  setup(props: any, ctx: SetupContext) {

    let form = reactive({
      labelWidth: 120,
      labelType: "right",
    })
    ctx.emit("baseChange", form)

    return {
      compInputs, compSelects, compSystems, form,
      select(item: any) {
        ctx.emit("addComponent", item)
      },
      changeForm() {
        ctx.emit("baseChange", form)
      }
    }
  }
})
</script>

<style lang="less" scoped>
.left-content {
  padding: 5px;
  display: flex;
  flex-wrap: wrap;

  .left-item {
    width: 158px;
    background-color: #e5e8fd;
    margin: 2px 5px;
    text-align: center;
    padding: 5px 0;
    color: #3d3d3d;
    cursor: pointer;
    font-size: 13px;
    border-radius: 3px;
    border: 1px solid #e5e8fd;

    &:hover {
      border: 1px dashed #5d6bff;
      color: #5d6bff;
    }

  }
}
</style>