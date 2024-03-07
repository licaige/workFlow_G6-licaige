import { defineComponent, inject } from 'vue'
import { treeInjectionKey, treeNodeContentProps } from './tree'

export default defineComponent({
  name: 'ZTreeNodeContent',
  props: treeNodeContentProps,
  setup(props) {
    const tree = inject(treeInjectionKey)
    return () => {
      const node = props.node
      console.log(node)
      return tree?.slots.default ? tree.slots.default({ node }) : node?.label
    }
  }
})
