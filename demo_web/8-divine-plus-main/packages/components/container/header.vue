<template>
  <header :class="[ns.b()]" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script lang="ts">
export default {
  name: "DvHeader",
};
</script>

<script setup lang="ts">
import { useNamespace } from "@/hooks/useNamespace";

const ns = useNamespace("header");

defineProps({
  height: {
    type: String,
    default() {
      return "60px";
    },
  },
});
</script>
