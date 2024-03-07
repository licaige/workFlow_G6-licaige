<template>
  <div :class="bem.b()">
    <!-- 模版有自带的优化，如果自定义比较强的我们采用 tsx来编写 -->
    <z-virtual-list :items="flattenTree" :remain="8" :size="35">
      <template #default="{ node }">
        <z-tree-node
          :key="node.key"
          :node="node"
          :expanded="isExpanded(node)"
          :loadingKeys="loadingKeysRef"
          :selectedKeys="selectKeysRef"
          @select="handleSelect"
          @toggle="toggleExpand"
        >
        </z-tree-node
      ></template>
    </z-virtual-list>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { createNamespace } from '@zi-shui/utils/create'
import { provide, ref, useSlots, watch } from 'vue'
import {
  Key,
  treeEmitts,
  treeInjectKey,
  TreeNode,
  TreeOption,
  treeProps
} from './tree'
import ZTreeNode from './treeNode.vue'
import ZVirtualList from '@zi-shui/components/virtual-list'
const bem = createNamespace('tree')

defineOptions({
  name: 'z-tree'
})

const props = defineProps(treeProps)

// 有了props 要对用户的数据进行格式化 ，格式化一个固定的结果
// label , key , children,

// 我们将props.data 格式化后放到tree中
const tree = ref<TreeNode[]>([])

// 1) 用来获取对应的字段
function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string // 用户传递的key
    },
    getLabel(node: TreeOption) {
      return node[label] as string // 用户传递label
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[] // 用户传递的children获取孩子
    }
  }
}
const treeOptions = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField
)
// 2) 将用户传毒的数据进行格式化操作
function createTree(data: TreeOption[], parent: TreeNode | null = null) {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      const children = treeOptions.getChildren(node) || []
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [], // 默认为空
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        disabled: !!node.disabled,
        // 判断节点是否自带isLeaf 如果自带了 以自带的为准，如果没有自带的则看一下有没有children属性
        // 对 ||的增强操作  ?.  ??
        isLeaf: node.isLeaf ?? children.length == 0
      }
      if (children.length > 0) {
        // 有孩子再去递归孩子，将其格式化成treeNode类型
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }
  const result: TreeNode[] = traversal(data, parent)
  return result
}
// 监控数据变化，调用格式化方法。 一上来先格式化一次
watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data)
  },
  { immediate: true }
)

// 希望将一颗树拍平， 点击还能实现展开操作
// 默认

// 需要展开的key 有哪些
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))

// 3) 将树拍平， 这里需要依赖 当前展开的节点 动态的计算
const flattenTree = computed(() => {
  const expandedKeys = expandedKeysSet.value // 要展开的keys有哪些
  // 最终拍平的节点
  const flattenNodes: TreeNode[] = [] // 这个就是拍平后的结果
  const nodes = tree.value || [] // 被格式化后的节点
  const stack: TreeNode[] = [] // 用于遍历树的栈  [40,30,31,32,41]
  // [40, 41]
  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i])
  }
  // [41,50,40,30]
  // 深度遍历
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    flattenNodes.push(node)
    if (expandedKeys.has(node.key)) {
      const children = node.children // [30,31,32];
      if (children) {
        for (let i = node.children.length - 1; i >= 0; --i) {
          stack.push(node.children[i])
        }
      }
    }
  }
  return flattenNodes
})

function isExpanded(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key)
}
// 折叠功能
function collpase(node: TreeNode) {
  expandedKeysSet.value.delete(node.key)
}

const loadingKeysRef = ref(new Set<Key>())

function triggerLoading(node: TreeNode) {
  // 这个节点需要异步加载
  if (!node.children.length && !node.isLeaf) {
    // 如果没有加载过这个节点 就加载这个节点
    const loadingKeys = loadingKeysRef.value
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key)
      const onLoad = props.onLoad
      if (onLoad) {
        onLoad(node.rawNode).then(children => {
          // 修改原来的节点
          node.rawNode.children = children
          // 更新自定义的node
          node.children = createTree(children, node)
          loadingKeys.delete(node.key)
        })
      }
    }
  }
}

// 展开功能
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key)

  // 这里应该实现对应的加载逻辑
  triggerLoading(node)
}
// 4) 让用户点击展开
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeysSet.value
  // 如果当前这个节点 正在加载中 不能收起
  if (expandKeys.has(node.key) && !loadingKeysRef.value.has(node.key)) {
    collpase(node)
  } else {
    expand(node)
  }
}

// 5) 实现选中节点
const emit = defineEmits(treeEmitts)

const selectKeysRef = ref<Key[]>([])

watch(
  () => props.selectedKeys,
  value => {
    if (value) {
      selectKeysRef.value = value
    }
  },
  {
    immediate: true
  }
)
// 处理选中的节点
function handleSelect(node: TreeNode) {
  let keys = Array.from(selectKeysRef.value)

  if (!props.selectable) return // 如果不能选择什么都不用做了

  if (props.multiple) {
    const index = keys.findIndex(key => key === node.key)
    if (index > -1) {
      keys.splice(index, 1)
    } else {
      keys.push(node.key)
    }
  } else {
    if (keys.includes(node.key)) {
      keys = []
    } else {
      keys = [node.key]
    }
  }
  emit('update:selectedKeys', keys)
}
provide(treeInjectKey, {
  slots: useSlots()
})
</script>
