<template>
  <component :is="tag" :class="[ns.b(), classes]" :style="style">
    <slot></slot>
  </component>
</template>

<script lang="ts">
export default {
  name: "DvCol",
};
</script>

<script setup lang="ts">
import { computed, inject } from "vue";
import { useNamespace } from "../../hooks/useNamespace";
import { rowContextKey } from "../row/constant";
import type { CSSProperties } from "vue";

const ns = useNamespace("col");

const props = defineProps({
  span: {
    type: Number,
    default: 24,
  },
  tag: {
    type: String,
    default: "div",
  },
  offset: Number,
  pull: Number,
  push: Number,
  xs: [Number, Object],
  sm: [Number, Object],
  md: [Number, Object],
  lg: [Number, Object],
  xl: [Number, Object],
});

const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) });

const style = computed(() => {
  const styles: CSSProperties = {};
  if (!gutter.value) {
    return styles;
  }

  styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
  return styles;
});

const classes = computed(() => {
  const classes: string[] = [];
  const pos = ["span", "offset", "pull", "push"] as const;

  pos.forEach((prop) => {
    const size = props[prop];
    if (!!Number(size)) {
      if (prop === "span") classes.push(ns.b(`${props[prop]}`));
      else if ((size as number) > 0)
        classes.push(ns.b(`${prop}-${props[prop]}`));
    }
  });

  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
  sizes.forEach((size) => {
    if (!!Number(props[size])) {
      classes.push(ns.b(`${size}-${props[size]}`));
    } else if (typeof props[size] === "object") {
      Object.entries(props[size] as object).forEach(([prop, sizeProp]) => {
        classes.push(
          prop !== "span"
            ? ns.b(`${size}-${prop}-${sizeProp}`)
            : ns.b(`${size}-${sizeProp}`)
        );
      });
    }
  });

  // this is for the fix
  if (gutter.value) {
    classes.push(ns.is("guttered"));
  }

  return classes;
});
</script>
