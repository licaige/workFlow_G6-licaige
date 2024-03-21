<template>
  <footer :class="[ns.b()]" :style="{ width }">
    <slot></slot>
  </footer>
</template>

<script lang="ts">
export default {
  name: "DvAside",
};
</script>

<script setup lang="ts">
import { useNamespace } from "@/hooks/useNamespace";

const ns = useNamespace("aside");

defineProps({
  width: {
    type: String,
    default() {
      return "300px";
    },
  },
});
</script>
