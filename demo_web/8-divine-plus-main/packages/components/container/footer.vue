<template>
  <footer :class="[ns.b()]" :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script lang="ts">
export default {
  name: "DvFooter",
};
</script>

<script setup lang="ts">
import { useNamespace } from "@/hooks/useNamespace";

const ns = useNamespace("footer");

defineProps({
  height: {
    type: String,
    default() {
      return "60px";
    },
  },
});
</script>
