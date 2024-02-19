<template>
  <el-config-provider :locale="zhCn">
    <Header @confirm="onConfirm" @cancel="onCancel"/>
    <div class="wcontent">
      <Left @addComponent="addComponent" @baseChange="baseChange"></Left>
      <Body @current="changeCurrent" @change="v=>data = v" :base="base" :data="data" :current="current"
            class="container"></Body>
      <Right :base="base" :data="data" :current="current" @changeCurrent="changeCurrentForm"></Right>
    </div>
  </el-config-provider>
</template>
<script lang="ts">
import {defineComponent, ref, SetupContext} from "vue";
import Header from "./layout/header.vue"
import Left from "./layout/left.vue"
import Right from "./layout/right.vue"
import Body from "./layout/body.vue"
import {ComponentItem, CompType} from "./layout/events";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zpx from "zpx";


export default defineComponent({
  components: {Header, Left, Right, Body},
  props: {},
  emits: ["confirm", "cancel"],
  setup(props, ctx: SetupContext) {
    const base = ref<any>({})
    const data = ref<ComponentItem[]>([])
    const current = ref<ComponentItem | null>()

    return {
      zhCn,
      base, data, current,
      onConfirm() {
        console.log(base.value, data.value)
        ctx.emit("confirm", base.value, data.value)
      },
      onCancel() {
        ctx.emit("cancel")
      },
      changeCurrentForm(item: ComponentItem) {
        current.value = item

        for (let i = 0; i < data.value.length; i++) {
          if (data.value[i].id == item.id) {
            data.value[i] = item
            break
          }
        }
      },
      changeCurrent(item: ComponentItem | null) {
        current.value = item
        data.value.forEach(v => {
          if (item && v.id === item.id) {
            v.active = true
          } else {
            v.active = false
          }
        })

      },
      baseChange(form: any) {
        base.value = form
      },
      addComponent(item: ComponentItem) {
        data.value.forEach(v => {
          v.active = false
        })

        const placeholder = `${item.ctype == 'input' ? "请输入" : "请选择"}${item.label}`
        current.value = {
          ...item,
          id: zpx.uuid(),
          value: item.type == CompType.Checkbox ? [] : null,
          prop: "",
          rules: [],
          options: [
            {id: zpx.uuid(), label: "选项一", value: "1"},
            {id: zpx.uuid(), label: "选项二", value: "2"},
          ],
          active: true,
          placeholder,
        }
        data.value.push(current.value)
      }
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