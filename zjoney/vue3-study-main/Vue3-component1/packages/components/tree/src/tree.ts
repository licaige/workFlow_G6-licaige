// vue组件的props

import { ExtractPropTypes, InjectionKey, PropType, SetupContext } from 'vue'

export type Key = string | number
export interface TreeNode extends Required<TreeOption> {
  level: number
  rawNode: TreeOption
  children: TreeNode[]
  isLeaf: boolean
  disabled: boolean
}
export interface TreeOption {
  label?: Key
  key?: Key
  children?: TreeOption[]
  isLeaf?: boolean
  [key: string]: unknown // 任意的接口
}
export const treeProps = {
  // props 是仅读的
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  labelField: {
    type: String,
    default: 'label'
  },
  keyField: {
    type: String,
    default: 'key'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  multiple: {
    type: Boolean,
    default: true
  },
  selectable: {
    type: Boolean,
    default: true
  },
  selectedKeys: Array as PropType<Key[]>,
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>
} as const

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    required: true
  },
  selectedKeys: {
    type: Array as PropType<Key[]>
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>
  }
} as const

export const treeEmits = {
  'update:selectedKeys': (keys: Key[]) => keys
}
export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node
}

export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>

export interface TreeContext {
  slots: SetupContext['slots']
}
export const treeInjectionKey: InjectionKey<TreeContext> = Symbol()

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
} as const
