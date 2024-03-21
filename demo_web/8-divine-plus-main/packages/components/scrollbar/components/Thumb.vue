<template>
  <div>
    <div
      v-if="direction === 'vertical'"
      :class="[ns.e('thumb'), ns.is('vertical', direction === 'vertical')]"
      :style="barStyle"
      ref="refVThumbRoot"
    ></div>
    <div
      v-else
      :class="[ns.e('thumb'), ns.is('horizontal', direction === 'horizontal')]"
      :style="barHStyle"
      ref="refHThumbRoot"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";
import type { ExtractPropTypes } from "vue";
import { useNamespace } from "../../../hooks/useNamespace";
import {
  thumbProps,
  scrollbarProps as scrollbarPropsType,
} from "../utils/constant";

const ns = useNamespace("scrollbar");
defineProps(thumbProps);

const refVThumbRoot = ref<HTMLDivElement>();
const refHThumbRoot = ref<HTMLDivElement>();

const scrollbarProps =
  inject<ExtractPropTypes<typeof scrollbarPropsType>>("scrollbarProps");

const barStyle = scrollbarProps?.barStyle;

const barHStyle = computed(() => ({
  ...barStyle,
  width: barStyle?.height,
  height: barStyle?.width,
}));

defineExpose({
  refVThumbRoot,
  refHThumbRoot,
});
</script>
