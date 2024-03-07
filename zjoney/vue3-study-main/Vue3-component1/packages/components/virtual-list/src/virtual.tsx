import { createNamespace } from '@zi-shui/utils/create'
import { computed, defineComponent, h, onMounted, reactive, ref } from 'vue'

export default defineComponent({
  name: 'ZVirtualList',
  props: {
    size: {
      type: Number,
      default: 30
    },
    remain: {
      type: Number,
      default: 8
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { slots }) {
    const bem = createNamespace('vl')

    const wrapperRef = ref<HTMLElement>()
    const barRef = ref<HTMLElement>()

    const state = reactive({
      start: 0, // 从哪里开始
      end: props.remain
    })
    const offset = ref(0)

    const prev = computed(() => {
      return Math.min(state.start, props.remain)
    })
    const next = computed(() => {
      return Math.min(props.remain, props.items.length - state.end)
    })
    const visibleData = computed(() => {
      return props.items.slice(state.start - prev.value, state.end + next.value)
    })

    const handleScroll = () => {
      // 算出来 当前滚过去几个了，当前从第几个显示
      const scrollTop = wrapperRef.value!.scrollTop
      state.start = Math.floor(scrollTop / props.size)
      state.end = state.start + props.remain

      console.log(state.start * props.size, props.size * prev.value)
      offset.value = state.start * props.size - props.size * prev.value // 让可视区域调整
    }
    onMounted(() => {
      wrapperRef.value!.style.height = props.size * props.remain + 'px'
      barRef.value!.style.height = props.items.length * props.size + 'px'
    })
    return () => {
      return (
        <div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
          <div class={bem.e('scroll-bar')} ref={barRef}></div>
          <div
            class={bem.e('scroll-list')}
            style={{
              transform: `translate3d(0,${offset.value}px,0)`,
              color: 'red'
            }}
          >
            {visibleData.value.map((node, idx) =>
              slots.default?.({ node, idx })
            )}
          </div>
        </div>
      )
    }
  }
})
