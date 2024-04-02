<template>
  <el-button type="primary">这是一个按钮，类型为{{ props.textType }}</el-button>
</template>

<script lang='ts'>
export default {
  name: 'MyButton'
}
</script>
<script lang='ts' setup>
import { defineProps, PropType } from "vue"
type textTyping = 1 | 2
const props = defineProps({
  textType: {
    type: Number as PropType<textTyping>,
    required: true
  }
})
</script>