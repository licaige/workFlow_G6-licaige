<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "Tabs"
}
</script>

<script lang="ts" setup>
import { FATHER_KEY } from "./index"
import { useChildren } from "../../tools/useRelation/useChildren"
import { defineProps, defineEmits, ref, watch } from "vue"

// 获取子组件实例
const { linkChildren } = useChildren(FATHER_KEY)

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  }
})

const activeName = ref(props.modelValue)


const emit = defineEmits<{ (event: "update:modelValue", value: string): void }>()

// 向子组件传递当前props和activeName
linkChildren({ props, activeName })

const handleEmit = (value: string) => {
  emit("update:modelValue", value)
}

watch(() => activeName.value, () => {
  handleEmit(activeName.value)
})
</script>