<template>
  <i :class="ns.b(name)" :style="styles">
    <slot></slot>
  </i>
</template>

<script lang="ts">
export default {
  name: "DvIcon",
};
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { useNamespace } from "@/hooks/useNamespace";

const ns = useNamespace("icon");

const props = defineProps({
  name: String,
  color: String,
  size: {
    type: [Number, String],
    default: 16,
  },
});

const attrs = useAttrs();

const styles = computed(() => {
  if (attrs.class) return;

  const style = {
    color: props.color,
    fontSize: props.size + "px",
  };
  return style;
});
</script>
