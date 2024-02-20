<template>
<div
  class="vk-select"
  :class="{'is-disabled': disabled }"
  @click="toggleDropdown"
>
  <Tooltip
    placement="bottom-start"
    ref="tooltipRef"
    :popperOptions="popperOptions"
    @click-outside="controlDropdown(false)"
    manual
  >
    <Input 
      v-model="states.inputValue"
      :disabled="disabled"
      :placeholder="placeholder"
      ref="inputRef"
      readonly
    >
      <template #suffix>
        <Icon icon="angle-down" class="header-angle" :class="{ 'is-active': isDropdownShow }"/>
      </template>
    </Input>
    <template #content>
      <ul class="vk-select__menu">
        <template v-for="(item, index) in options" :key="index">
          <li 
            class="vk-select__menu-item"
            :class="{'is-disabled': item.disabled, 'is-selected': states.selectedOption?.value === item.value }"
            :id="`select-item-${item.value}`"
            @click.stop="itemSelect(item)"
          >
            {{item.label}}
          </li>
        </template>
      </ul>
    </template>
  </Tooltip>
</div>  
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import type { InputInstance } from '../Input/types'

const findOption = (value: string) => {
  const option = props.options.find(option => option.value === value)
  return option ? option : null
}
defineOptions({
  name: 'VkSelect'
})
const props = defineProps<SelectProps>()
const emits = defineEmits<SelectEmits>()
const initialOption = findOption(props.modelValue)
const tooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption
})
const isDropdownShow = ref(false)
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    }
  ],
}
const controlDropdown = (show: boolean) => {
  if (show) {
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}
const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  controlDropdown(false)
  inputRef.value.ref.focus()
}
</script>