<template>
  <div
    class="inline-block"
    :style="interactiveStyle"
    @mouseleave="hover && closePopper()"
    ref="popperContainerNode"
  >
    <div
      ref="triggerNode"
      @mouseover="hover && openPopper()"
      @click="togglePopper"
      @focus="openPopper"
      @keyup.esc="closePopper"
    >
      <!-- The default slot to trigger the popper 触发popper的默认插槽  -->
      <slot />
    </div>
   <!--下拉展示框-->
    <Transition name="fade">
      <div
        @click="!interactive && closePopper()"
        v-show="shouldShowPopper"
        class="popper"
        ref="popperNode"
      >
        <slot name="content" :close="close" :isOpen="modifiedIsOpen">
          {{ content }}
        </slot>
        <Arrow v-if="arrow" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
  import { debounce } from "debounce";
  import {
    ref,
    computed,
    defineProps,
    useSlots,
    toRefs,
    watch,
    watchEffect,
    onMounted,
  } from "vue";
  import { usePopper, useContent, useClickAway } from "@/composables";
  import Arrow from "./Arrow.vue";

  const emit = defineEmits(["open:popper", "close:popper"]);
  const slots = useSlots();
  const props = defineProps({
    /**
     * Preferred placement (the "auto" placements will choose the side with most space.)
     * 首选放置（“自动”放置将选择空间最大的一侧。）
     */
    placement: {
      type: String,
      default: "bottom",
      validator: function(value) {
        return [
          "auto",
          "auto-start",
          "auto-end",
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "right",
          "right-start",
          "right-end",
          "left",
          "left-start",
          "left-end",
        ].includes(value);
      },
    },
    /**
     * Disables automatically closing the popover when the user clicks away from it
     * 禁用在用户单击离开弹出窗口时自动关闭弹出窗口
     */
    disableClickAway: {
      type: Boolean,
      default: false,
    },
    /**
     * Offset in pixels along the trigger element
     * 沿触发元素的像素偏移
     */
    offsetSkid: {
      type: String,
      default: "0",
    },
    /**
     * Offset in pixels away from the trigger element
     * 与触发元素的偏移（以像素为单位）
     */
    offsetDistance: {
      type: String,
      default: "12",
    },
    /**
     * Trigger the popper on hover
     * 悬停时触发popper
     */
    hover: {
      type: Boolean,
      default: false,
    },
    /**
     * Manually open/close the Popper, other events are ignored if this prop is set
     * 手动打开/关闭Popper，如果设置了此道具，则忽略其他事件
     */
    show: {
      type: Boolean,
      default: null,
    },
    /**
     * Disables the Popper. If it was already open, it will be closed.
     * 禁用Popper。如果它已经打开，它将关闭。
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Open the Popper after a delay (ms).
     * 延迟（ms）后打开提升阀。
     */
    openDelay: {
      type: [Number, String],
      default: 0,
    },
    /**
     * Close the Popper after a delay (ms).
     * 延迟（ms）后关闭提升阀
     */
    closeDelay: {
      type: [Number, String],
      default: 0,
    },
    /**
     * The z-index of the Popper.
     * Popper的z索引
     */
    zIndex: {
      type: [Number, String],
      default: 9999,
    },
    /**
     * Display an arrow on the popper
     * 在弹出窗口上显示箭头
     */
    arrow: {
      type: Boolean,
      default: false,
    },
    /**
     * Stop arrow from reaching the edge of the popper
     * 阻止箭头到达popper的边缘
     */
    arrowPadding: {
      type: String,
      default: "0",
    },
    /**
     * If the Popper should be interactive, it will close when clicked/hovered if false
     * 如果Popper应该是交互式的，它将在单击/悬停时关闭（如果为false）
     */
    interactive: {
      type: Boolean,
      default: true,
    },
    /**
     * Lock the Popper into place, it will not flip dynamically when it runs out of space if true
     * 将Popper锁定到位，如果为true，则在空间不足时不会动态翻转
     */
    locked: {
      type: Boolean,
      default: false,
    },
    /**
     * If the content is just a simple string, it can be passed in as a prop
     * 如果内容只是一个简单的字符串，它可以作为道具传入
     */
    content: {
      type: String,
      default: null,
    },
  });

  const popperContainerNode = ref(null);
  const popperNode = ref(null);
  const triggerNode = ref(null);
  const modifiedIsOpen = ref(false);

  onMounted(() => {
    const children = slots.default();

    if (children && children.length > 1) {
      return console.error(
        `[Popper]: The <Popper> component expects only one child element at its root. You passed ${children.length} child nodes.`,
      );
    }
  });

  const {
    arrowPadding,
    closeDelay,
    content,
    disableClickAway,
    disabled,
    interactive,
    locked,
    offsetDistance,
    offsetSkid,
    openDelay,
    placement,
    show,
  } = toRefs(props);

  const { isOpen, open, close } = usePopper({
    arrowPadding,
    emit,
    locked,
    offsetDistance,
    offsetSkid,
    placement,
    popperNode,
    triggerNode,
  });

  const { hasContent } = useContent(slots, popperNode, content);

  const manualMode = computed(() => show.value !== null);
  const invalid = computed(() => disabled.value || !hasContent.value);
  const shouldShowPopper = computed(() => isOpen.value && !invalid.value);
  const enableClickAway = computed(
    () => !disableClickAway.value && !manualMode.value,
  );
  // Add an invisible border to keep the Popper open when hovering from the trigger into it
  // 添加一个不可见的边界，以在从触发器悬停到Popper时保持Popper打开
  const interactiveStyle = computed(() =>
    interactive.value
      ? `border: ${offsetDistance.value}px solid transparent; margin: -${offsetDistance.value}px;`
      : null,
  );
  const openPopperDebounce = debounce(open, openDelay.value);
  const closePopperDebounce = debounce(close, closeDelay.value);
  const openPopper = async () => {
    if (invalid.value || manualMode.value) {
      return;
    }

    closePopperDebounce.clear();
    openPopperDebounce();
  };

  const closePopper = async () => {
    if (manualMode.value) {
      return;
    }

    openPopperDebounce.clear();
    closePopperDebounce();
  };

  const togglePopper = () => {
    isOpen.value ? closePopper() : openPopper();
  };

  /**
   * If Popper is open, we automatically close it if it becomes
   * disabled or without content.
   * 如果Popper是打开的，如果它被禁用或没有内容，我们会自动关闭它
   */
  watch([hasContent, disabled], ([hasContent, disabled]) => {
    if (isOpen.value && (!hasContent || disabled)) {
      close();
    }
  });

  /**
   * In order to eliminate flickering or visibly empty Poppers due to
   * the transition when using the isOpen slot property, we need to return a
   * separate debounced value based on isOpen.
   * 为了消除在使用isOpen插槽属性时由于转换而导致的闪烁或明显空的Poppers，
   * 我们需要基于isOpen返回一个单独的去抖动值。
   */
  watch(isOpen, isOpen => {
    if (isOpen) {
      modifiedIsOpen.value = true;
    } else {
      debounce(() => {
        modifiedIsOpen.value = false;
      }, 200);
    }
  });

  /**
   * Watch for manual mode.
   * 注意手动模式
   */
  watchEffect(() => {
    if (manualMode.value) {
      show.value ? openPopperDebounce() : closePopperDebounce();
    }
  });

  /**
   * Use click away if it should be enabled.
   * 如果应该启用，请使用“点击离开”。
   */
  watchEffect(() => {
    if (enableClickAway.value) {
      useClickAway(popperContainerNode, closePopper);
    }
  });
</script>

<style scoped>
  .inline-block {
    display: inline-block;
  }
  .popper {
    transition: background 250ms ease-in-out;
    background: var(--popper-theme-background-color);
    padding: var(--popper-theme-padding);
    color: var(--popper-theme-text-color);
    border-radius: var(--popper-theme-border-radius);
    border-width: var(--popper-theme-border-width);
    border-style: var(--popper-theme-border-style);
    border-color: var(--popper-theme-border-color);
    box-shadow: var(--popper-theme-box-shadow);
    z-index: v-bind(zIndex);
  }

  .popper:hover,
  .popper:hover > #arrow::before {
    background: var(--popper-theme-background-color-hover);
  }

  .inline-block {
    display: inline-block;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
