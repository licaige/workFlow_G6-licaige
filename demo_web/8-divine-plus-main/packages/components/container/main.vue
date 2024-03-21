<template>
  <main :class="ns.b()">
    <slot />
  </main>
</template>

<script lang="ts">
export default {
  name: "DvMain",
};
</script>

<script lang="ts" setup>
import { useNamespace } from "@/hooks/useNamespace";
const ns = useNamespace("main");
</script>
