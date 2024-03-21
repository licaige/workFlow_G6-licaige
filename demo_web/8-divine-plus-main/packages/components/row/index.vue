<template>
  <component
    :is="tag"
    :class="[
      ns.b(),
      ns.is(`justify-${props.justify}`, justify !== 'start'),
      ns.is(`align-${props.align}`, align !== 'top'),
      ns.isM('flex', type === 'flex'),
    ]"
    :style="style"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
export default {
  name: "DvRow",
};
</script>

<script setup lang="ts">
import { PropType, computed, provide } from "vue";
import type { CSSProperties } from "vue";
import { useNamespace } from "../../hooks/useNamespace";
import { rowContextKey } from "./constant";

const ns = useNamespace("row");

const props = defineProps({
  gutter: {
    type: Number,
    default() {
      return 0;
    },
  },
  tag: {
    type: String,
    default() {
      return "div";
    },
  },
  type: String,
  justify: {
    type: String as PropType<
      "start" | "end" | "center" | "space-around" | "space-between"
    >,
    default() {
      return "start";
    },
  },
  align: {
    type: String as PropType<"top" | "middle" | "bottom">,
    default() {
      return "top";
    },
  },
});

const style = computed(() => {
  const styles: CSSProperties = {};
  if (!props.gutter) {
    return styles;
  }

  styles.marginLeft = styles.marginRight = `-${props.gutter / 2}px`;
  return styles;
});

const gutter = computed(() => props.gutter);
provide(rowContextKey, { gutter });
</script>
