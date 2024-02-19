import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  setup(props, { slots }) {
    return () => {
      return h('h' + props.level, {}, slots.default())
    }
  }
})