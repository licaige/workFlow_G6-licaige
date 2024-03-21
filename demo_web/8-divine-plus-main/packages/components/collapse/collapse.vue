<template>
  <div :class="ns.b()">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "DvCollapse",
};
</script>
<script setup lang="ts">
import { computed, provide, reactive, watch } from "vue";
import { useNamespace } from "@/hooks/useNamespace";
import { COLLAPSE } from "./utils";

const ns = useNamespace("collapse");

const props = defineProps({
  accordion: Boolean,
  modelValue: {
    type: [Array<string>, String],
    default: [],
  },
});

const state = reactive({ activeNames: [...props.modelValue] });

const setActiveNames = (currentActiveNames: string[]) => {
  state.activeNames = currentActiveNames;
  emits("update:modelValue", currentActiveNames);
  emits("change", currentActiveNames);
};

const onClickItem = (name: string) => {
  if (props.accordion) {
    setActiveNames([
      state.activeNames[0] && state.activeNames[0] === name ? "" : name,
    ]);
  } else {
    const currentActiveNames = [...state.activeNames];
    const index = currentActiveNames.findIndex((value) => value === name);

    if (index > -1) {
      currentActiveNames.splice(index, 1);
    } else {
      currentActiveNames.push(name);
    }

    setActiveNames(currentActiveNames);
  }
};

watch(
  () => props.modelValue,
  () => {
    state.activeNames = Array.isArray(props.modelValue)
      ? props.modelValue
      : [props.modelValue];
  },
  { deep: true }
);

const emits = defineEmits(["update:modelValue", "change"]);

provide(COLLAPSE, {
  activeNames: computed(() => state.activeNames),
  onClickItem,
});

defineExpose({
  activeNames: state.activeNames,
  setActiveNames,
});
</script>
