<template>
  <section :class="ns.b()">
    <span
      v-for="item in state.max"
      :key="item.count"
      ref="RefStars"
      :class="ns.e('item')"
      @mousemove="onMouseMove(item, $event)"
      @mouseleave="onMouseLeave()"
      @click="onSelect(item)"
    >
      <dv-icon
        :name="iconNames(item)"
        :class="[ns.e('icon'), ns.is('hover', item.isHover)]"
        :style="[
          {
            width: item.isHalf ? '44%' : '100%',
            overflow: 'hidden',
          },
          iconStyle,
          customIconSelectedStyle(item.isHover),
        ]"
      >
      </dv-icon>
    </span>

    <span v-if="showTail" :class="ns.e('text')">{{ getText }}</span>
  </section>
</template>

<script lang="ts">
export default {
  name: "DvRate",
};
</script>

<script lang="ts" setup>
import { reactive, watch, ref, onMounted, computed, watchEffect } from "vue";
import { useNamespace, useClickAway } from "@/hooks";
import { rateProps } from "./utils/constant";
import type { TState, TMax, TIconSelectStyle } from "./utils/constant";

const ns = useNamespace("rate");

const props = defineProps(rateProps);
const emits = defineEmits(["update:modelValue", "clickOutside", "change"]);

const RefStars = ref();

function getFractional(num: number) {
  return num - Math.trunc(num);
}

const initMax = () => {
  const max = new Array(props.max).fill(0).map((_, index) => {
    return { count: index + 1, isHalf: false };
  });

  return max;
};

const state = reactive<TState>({
  max: initMax(),
  hoverIndex: props.modelValue,
  isHalf: false,
});

const initUseClickAway = () => {
  useClickAway(
    () => {
      if (props.readonly) return;
      emits("clickOutside");
    },
    RefStars.value,
    {
      root: (props.eventBoundary as HTMLElement) || document,
    }
  );
};

// const runIconSelectStyle = () => {
//   const iconSelectedStyle = props.iconSelectedStyle as TIconSelectStyle;
//   const root = document.querySelector(":root") as HTMLElement;
//   if (iconSelectedStyle?.color) {
//     root.style.setProperty(
//       "--scoped-rate-icon-selected-color",
//       iconSelectedStyle.color
//     );
//   }
//   if (iconSelectedStyle?.fontSize) {
//     root.style.setProperty(
//       "--scoped-rate-icon-selected-size",
//       iconSelectedStyle.fontSize
//     );
//   }
// };

onMounted(() => {
  initUseClickAway();
  // runIconSelectStyle(); // 这样会影响到所有rate组件，采用js事件动态设置行内style代替

  //     root.style.setProperty(
  //       "--scoped-rate-icon-selected-color",
  //       iconSelectedStyle.color
});

const iconNames = computed(() => (item: TMax) => {
  if (props.iconName) return props.iconName;
  else {
    return item.isHover ? "star2" : "star";
  }
});

const customIconSelectedStyle = computed(() => (isHover: any) => {
  const { color, fontSize } =
    (props.iconSelectedStyle as TIconSelectStyle) || {};

  if (isHover) {
    return {
      color: color ? `${color} !important` : "",
      fontSize: fontSize ? `${fontSize} !important` : "",
    };
  }

  return undefined;
});

const showTail = computed(() => props.showScore || props.texts.length);

const getText = computed(() => {
  if (props.showScore) return props.modelValue;
  if (props.texts.length) {
    return props.texts[state.hoverIndex];
  }
});

const setMax = (count: number, isHalf: boolean) => {
  let newCount = count;

  if (getFractional(count) !== 0) {
    newCount = Math.ceil(count);
  }

  const newMax = state.max.map((_item) => {
    return {
      ..._item,
      isHover: _item.count <= newCount,
      isHalf: _item.count === newCount && isHalf,
    };
  });

  state.max = newMax;
};

const setMax_init_and_leave = () => {
  state.hoverIndex = props.modelValue - 1;

  const isHalf =
    props.allowHalf &&
    getFractional(props.modelValue) <= 0.5 &&
    getFractional(props.modelValue) !== 0;

  setMax(props.modelValue as number, isHalf);
};

watch(() => props.modelValue, setMax_init_and_leave, {
  immediate: true,
  deep: true,
});

const onMouseLeave = () => {
  if (props.readonly) return;
  setMax_init_and_leave();
};

const onMouseMove = (item: TState["max"][number], event: MouseEvent) => {
  if (props.readonly) return;

  let isHalf = false;

  if (props.allowHalf) {
    const fullWidth = RefStars.value[item.count - 1]?.clientWidth;
    isHalf = event.offsetX * 2 <= fullWidth;
  } else {
    isHalf = false;
    state.hoverIndex = item.count - 1;
  }

  setMax(item.count, isHalf);
};

const onSelect = (item: TMax) => {
  if (props.readonly) return;

  let newCount = item.count;

  if (item.isHalf) {
    newCount = item.count - 0.5;
  }

  if (props.allowClear) {
    if (props.modelValue !== 0 && props.modelValue === item.count) {
      emits("update:modelValue", 0);
      emits("change", 0);
      return;
    }
  }

  emits("update:modelValue", newCount);
  emits("change", newCount);
};
</script>
