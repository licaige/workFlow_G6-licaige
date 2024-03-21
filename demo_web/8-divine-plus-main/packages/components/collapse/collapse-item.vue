<template>
  <div :class="ns.b()">
    <div
      :class="ns.e('header')"
      @click="onHeaderClick"
      :id="`dv-collapse-head-${state.id}`"
      :tabindex="disabled ? undefined : 0"
      @keyup.space.enter.stop="onEnterClick"
    >
      <slot name="title">{{ title }}</slot>
      <svg
        :class="[ns.e('arrow'), { 'is-active': isActive }]"
        t="1687438785751"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2393"
        width="20"
        height="20"
      >
        <path
          d="M384.32 797.512a30.088 30.088 0 0 1-21.288-51.392L597.144 512 363.032 277.816a30.088 30.088 0 0 1 0-42.568 30.088 30.088 0 0 1 42.568 0l255.392 255.464a30.088 30.088 0 0 1 0 42.568L405.6 788.696a30.04 30.04 0 0 1-21.28 8.816z"
          fill="#888888"
          p-id="2394"
        ></path>
      </svg>
    </div>

    <DvCollapseTransition>
      <div
        :class="ns.e('wrap')"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`dv-collapse-head-${state.id}`"
        :id="`dv-collapse-content-${state.id}`"
      >
        <div :class="ns.e('content')">
          <slot></slot>
        </div>
      </div>
    </DvCollapseTransition>
  </div>
</template>

<script lang="ts">
export default {
  name: "DvCollapseItem",
};
</script>
<script setup lang="ts">
import { computed, inject, reactive } from "vue";
import DvCollapseTransition from "./collapse-transition.vue";
import { useNamespace } from "@/hooks/useNamespace";
import { COLLAPSE } from "./utils";
import type { ICollapseProvider } from "./utils";

const ns = useNamespace("collapse-item");

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  title: String,
});

const state = reactive({ id: +new Date() });

const collapse = inject<ICollapseProvider>(COLLAPSE)!;

const isActive = computed(() =>
  collapse.activeNames.value.includes(props.name)
);

const onHeaderClick = () => {
  if (props.disabled) return;
  collapse.onClickItem(props.name);
};

const onEnterClick = () => {
  if (props.disabled) return;
  collapse.onClickItem(props.name);
};
</script>
