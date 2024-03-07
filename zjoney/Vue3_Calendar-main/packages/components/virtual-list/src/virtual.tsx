import { createNamespace } from '@zi-shui/utils/create'
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'

export default defineComponent({
  name: 'ZVirtualList',
  props: {
    size: {
      type: Number,
      default: 35
    },
    remain: {
      default: 8,
      type: Number
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
      // 计算显示的区域
      start: 0,
      end: props.remain
    })

    const prev = computed(() => {
      // 当前开始第四条
      return Math.min(state.start, props.remain)
    })

    const next = computed(() => {
      return Math.min(props.remain, props.items.length - state.end)
    })

    // 这里应该多展示 上8条和下8条，保证用户在快速滚动的时候 不会白屏
    const visibleData = computed(() => {
      // 上下都补点
      return props.items.slice(state.start - prev.value, state.end + next.value)
    })

    const offset = ref(0)

    const handleScroll = () => {
      // 根据当前滚动的距离 来算，过去了几个数据
      const scrollTop = wrapperRef.value!.scrollTop
      state.start = Math.floor(scrollTop / props.size) // 划过去了多少个

      state.end = state.start + props.remain
      offset.value = state.start * props.size - props.size * prev.value // 滚过去了多少个
    }

    function initWrapper() {
      wrapperRef.value!.style.height = props.remain * props.size + 'px'
      barRef.value!.style.height = props.items.length * props.size + 'px'
    }
    watch(() => props.items, initWrapper)

    onMounted(() => {
      initWrapper()
    })
    return () => {
      return (
        <div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
          {/* 就是模拟总长度，感觉好像很多数据 */}
          <div class={bem.e('scroll-bar')} ref={barRef}></div>
          {/* 更新列表从哪显示到哪里 ，一直只展示 8条数据*/}
          <div
            class={bem.e('scroll-list')}
            style={{ transform: `translate3d(0,${offset.value}px,0)` }}
          >
            {visibleData.value.map((node, idx) => slots.default!({ node }))}
          </div>
        </div>
      )
    }
  }
})
