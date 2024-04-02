<template>
  <div :class="parentModelValue === props.name ? 'active' : ''" @click="toggle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Tab'
}
</script>

<script lang="ts" setup>
import { defineProps, defineExpose, Ref, computed } from "vue";
import { useParent } from "../../tools/useRelation/useParent"
import { FATHER_KEY } from "./index"

// 获取父组件
const { parent } = useParent<{ props: any, activeName: Ref<string> }>(FATHER_KEY)

// 获取父组件modelValue绑定值
const parentModelValue = computed(() => parent?.props.modelValue)

const props = defineProps({
  name: {
    type: String,
    default: ""
  }
})

// 选中子组件方法
const toggle = () => {
  parent!.activeName.value = props.name
}

// 导出子组件方法，供父组件使用
defineExpose({ toggle, name: props.name })



</script>

<style lang="scss" scoped>
.active {
  color: red
}
</style>