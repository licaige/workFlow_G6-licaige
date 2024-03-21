<template>
  <section :class="[ns.b(), ns.m(direction)]" :style="borderStyle">
    <div
      v-if="$slots.default && direction === 'horizontal'"
      :class="[ns.e('text'), ns.is(contentPosition)]"
    >
      <slot name="default"></slot>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "DvDivider",
};
</script>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { useNamespace } from "../../hooks/useNamespace";

const ns = useNamespace("divider");

// const slots = useSlots();
// - 在 <script setup> 使用 slots 和 attrs 的情况应该是相对来说较为罕见的，因为可以在模板中直接通过 $slots 和 $attrs 来访问它们。
// - https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose

const props = defineProps({
  direction: {
    type: String as PropType<"horizontal" | "vertical">,
    default() {
      return "vertical";
    },
  },
  contentPosition: {
    type: String as PropType<"left" | "center" | "right">,
    default() {
      return "center";
    },
  },
  borderStyle: {
    type: String as PropType<"solid" | "dotted" | "dashed">,
    default() {
      return "solid";
    },
  },
});

const borderStyle = computed(() => {
  return props.direction === "horizontal"
    ? {
        "border-style": props.borderStyle,
      }
    : {};
});
</script>
