<template>
  <section :class="[ns.b()]">
    <slot></slot>
  </section>
</template>

<script lang="ts">
export default {
  name: "DvBreadcrumb",
};
</script>

<script setup lang="ts">
import { provide } from "vue";
import { useNamespace } from "../../hooks/useNamespace";
import { breadcrumbKey } from "./constant";

const ns = useNamespace("breadcrumb");

const props = defineProps({
  separator: {
    type: String,
    default() {
      return "/";
    },
  },
  separatorIcon: {
    type: [String, Function, Object],
    default() {
      return "";
    },
  },
});

provide(breadcrumbKey, props); // 供 breadcrumb-item 消费
</script>
