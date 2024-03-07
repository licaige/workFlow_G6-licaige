<template>
  <div :class="[bem.b()]">
    <div :class="bem.e('group')">
      <div v-if="slots.prepend" :class="bem.be('group', 'prepend')">
        <slot name="prepend"></slot>
      </div>

      <div :class="[bem.e('wrapper')]">
        <span v-if="slots.prefixIcon" :class="bem.e('prefix')">
          <slot name="prefixIcon"></slot>
        </span>
        <!-- 如果需要显示密码 在看当前是普通文本还是密码 -->
        <input
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          v-bind="attrs"
          :class="bem.e('inner')"
          ref="input"
          @input="handleInput"
          @change="handleChange"
          @blur="handleBlur"
          @focus="handleFocus"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
        />

        <z-icon
          v-if="showPwdVisible"
          @click="handlePasswordVisible"
          style="line-height: 16px; font-weight: bold"
        >
          e
        </z-icon>
        <z-icon
          v-if="showClear"
          @click="clear"
          style="line-height: 16px; font-weight: bold"
        >
          x
        </z-icon>
        <span v-if="slots.sufixIcon" :class="bem.e('suffix')">
          <slot name="sufixIcon"></slot>
        </span>
      </div>

      <div v-if="slots.append" :class="bem.be('group', 'append')">
        <slot name="prepend"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { createNamespace } from '@zi-shui/utils/create'
import {
  useAttrs,
  useSlots,
  watch,
  ref,
  onMounted,
  nextTick,
  inject
} from 'vue'
import { inputProps, inputEmits } from './input'

const formItemContext = inject('form-item')

console.log(formItemContext)

defineOptions({
  name: 'z-input',
  inheritAttrs: false
})

const bem = createNamespace('input')
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const slots = useSlots()
const attrs = useAttrs()

// 监控value的值的变化 重新赋值

// -----------------------------------
watch(
  () => props.modelValue,
  () => {
    ;(formItemContext as any)?.validate('change').catch(() => {})
    setNativeInputValue()
  }
)
const input = ref<HTMLInputElement | null>(null)
const setNativeInputValue = () => {
  const inputEle = input.value
  if (!inputEle) {
    return
  }
  inputEle.value = String(props.modelValue)
}
onMounted(() => {
  // 组件加载完毕后 设置一次输入框的值
  setNativeInputValue()
})
// ----------------------------------------
const focus = async () => {
  await nextTick() // 这里重新获取焦点
  input.value?.focus()
}
const passwordVisible = ref(false)
const showPwdVisible = computed(() => {
  return (
    props.modelValue && props.showPassword && !props.disabled && !props.readonly
  )
})
const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
  focus()
}
// ---------------------------------------------
const showClear = computed(() => {
  return (
    props.modelValue && props.clearable && !props.disabled && !props.readonly
  )
})
const clear = () => {
  emit('input', '')
  emit('update:modelValue', '') // 触发事件可以实现双向绑定
  emit('clear')
  focus()
}
// ------------------------------------
const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('input', value)
  emit('update:modelValue', value) // 触发事件可以实现双向绑定
}
const handleChange = (e: Event) => {
  emit('change', (e.target as HTMLInputElement).value)
}
const handleFocus = (e: FocusEvent) => {
  emit('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  ;(formItemContext as any)?.validate('blur').catch(() => {})
  emit('blur', e)
}
// --------------------------------------------
</script>
