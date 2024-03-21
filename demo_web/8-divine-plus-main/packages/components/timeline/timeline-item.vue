<template>
  <li :class="ns.b()">
    <div :class="ns.e('tail')"></div>
    <div
      v-if="!$slots.dot"
      :class="[ns.e('node'), ns.em('node', size), ns.em('node', type)]"
      :style="{
        backgroundColor: color,
      }"
    >
      <i v-if="icon" :class="[ns.e('icon'), icon]"></i>
    </div>
    <div v-else :class="ns.e('dot')">
      <slot name="dot" />
    </div>

    <div :class="ns.e('wrapper')">
      <div
        v-if="!hideTimestamp && position === 'top'"
        :class="[ns.e('timestamp'), ns.is('top')]"
      >
        {{ timestamp }}
      </div>

      <div :class="ns.e('content')">
        <slot></slot>
      </div>

      <div
        v-if="!hideTimestamp && position === 'bottom'"
        :class="[ns.e('timestamp'), ns.is('bottom')]"
      >
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>

<script lang="ts">
export default {
  name: "DvTimelineItem",
};
</script>

<script setup lang="ts">
import { inject } from "vue";
import { useNamespace } from "../../hooks/useNamespace";
import { TIMELINE } from "./utils/constant";

const ns = useNamespace("timeline-item");

defineProps({
  timestamp: String,
  hideTimestamp: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    values: ["top", "bottom"],
    default() {
      return "bottom";
    },
  },
  type: {
    type: String,
    values: ["primary", "success", "warning", "danger", "info"],
    default() {
      return "";
    },
  },
  color: String,
  size: {
    type: String,
    values: ["small", "medium", "large"],
    default() {
      return "normal";
    },
  },
  icon: {
    type: [String, Function, Object],
    default() {
      return "";
    },
  },
});

const timeline = inject(TIMELINE);
</script>
