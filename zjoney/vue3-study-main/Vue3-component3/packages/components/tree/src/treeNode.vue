<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSeleted),
      bem.is('disabled', node.disabled)
    ]"
  >
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: `${node.level * 16}px` }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node.isLeaf },
          bem.is('leaf', node.isLeaf)
        ]"
        @click="handleExpand"
      >
        <z-icon size="25">
          <Switcher v-if="!isLoading"></Switcher>
          <Loading v-else></Loading>
        </z-icon>
      </span>

      <z-checkbox
        v-if="showCheckbox"
        :disabled="disabled"
        :model-value="checked"
        :indeterminate="indeterminate"
        @change="handleCheckChange"
      ></z-checkbox>
      <span @click="handleSeleted" :class="bem.e('label')">
        <ZTreeNodeContent :node="node"></ZTreeNodeContent>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Switcher from './icon/Switcher'
import ZIcon from '@zi-shui/components/icon'
import { createNamespace } from '@zi-shui/utils/create'
import { treeNodeEmitts, treeNodeProps } from './tree'
import Loading from './icon/Loading'
import { computed } from 'vue'
import ZTreeNodeContent from './tree-node-content'
import ZCheckbox from '@zi-shui/components/checkbox'
const bem = createNamespace('tree-node')
const props = defineProps(treeNodeProps)

const emit = defineEmits(treeNodeEmitts)
function handleExpand() {
  emit('toggle', props.node)
}
const isLoading = computed(() => {
  return props.loadingKeys.has(props.node.key)
})

const isSeleted = computed(() => {
  return props.selectedKeys.includes(props.node.key)
})
function handleSeleted() {
  if (props.node.disabled) return
  emit('select', props.node)
}
function handleCheckChange(val: boolean) {
  emit('check', props.node, val)
}
</script>
