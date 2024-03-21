<template>
  <ul :class="ns.b()">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
export default {
  name: "DvTimeline",
};
</script>

<script setup lang="ts">
import { provide } from "vue";
import { useNamespace } from "../../hooks/useNamespace";
import { TIMELINE } from "./utils/constant";

const ns = useNamespace("timeline");

const props = defineProps({
  reverse: {
    type: Boolean,
    default: false,
  },
});

provide(TIMELINE, props);
</script>
