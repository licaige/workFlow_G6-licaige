<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { TreeOption } from '@zi-shui/components/tree/src/tree'
import { ref } from 'vue'

function createData(level = 4, parentKey = ''): any {
  if (!level) return []
  const arr = new Array(20 - level).fill(0)
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx
    return {
      xx: createLabel(level), // 显示的内容
      key, // 为了唯一性
      children: createData(level - 1, key) // 孩子
    }
  })
}
function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false
//     }
//   ]
// }
function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }
  return ''
}
const handleLoad = (node: TreeOption) => {
  // 每次实现懒加载时，会触发此方法，将当前点击的node传入
  return new Promise<TreeOption[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false
        }
      ])
    }, 2000)
  })
}
// const data = ref<TreeOption[]>([
//   {
//     key: '0',
//     label: '0',
//     children: [
//       {
//         key: '0-0',
//         label: '0-0'
//       },
//       {
//         disabled: true,
//         key: '0-1',
//         label: '0-1',
//         children: [
//           {
//             label: '0-1-0',
//             key: '0-1-0'
//           },
//           {
//             label: '0-1-1',
//             key: '0-1-1'
//           }
//         ]
//       }
//     ]
//   }
// ])

const data = ref(createData())

const value = ref([])
</script>

<template>
  <z-icon :color="'red'" :size="40">
    <AddCircle></AddCircle>
  </z-icon>
  <z-icon :color="'yellow'" :size="40">
    <AddCircle></AddCircle>
  </z-icon>
  <!-- 在使用树组件的时候 会传递一个树型的结构 -->

  {{ value }}
  <z-tree
    v-model:selectedKeys="value"
    :data="data"
    :on-load="handleLoad"
    selectable
    multiple
    label-field="xx"
  >
    <template #default="{ node }">{{ node.key }} {{ node.label }}</template>
  </z-tree>
</template>
