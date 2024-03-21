<template>
  <transition :class="`${ns.namespace.value}-fade-in`">
    <section v-if="state.visible" :class="[ns.b()]" :style="styles">
      <slot>
        <DvIcon
          name="youjiantou"
          style="transform: rotate(-90deg)"
          size="50"
          @click.stop="handleClick"
        />
      </slot>
    </section>
  </transition>
</template>

<script lang="ts">
export default {
  name: "DvBacktop",
};
</script>

<script setup lang="ts">
import { computed, watch, reactive, onMounted } from "vue";
import { useEventListener, useThrottleFn } from "@vueuse/core";
import DvIcon from "@/components/icon/icon.vue";
import { useNamespace } from "../../hooks/useNamespace";
import { definePropType } from "../../utils/definePropType";
import { easeInOutCubic } from "./utils";
import type { State } from "./utils";

const ns = useNamespace("backtop");

const props = defineProps({
  target: {
    // type: [String, Object, Function] as PropType< string | HTMLElement | (() => HTMLElement) >
    type: definePropType<string | HTMLElement | (() => HTMLElement)>([
      String,
      Object,
      Function,
    ]),
    default() {
      return "#app";
    },
  },
  visibilityHeight: {
    type: Number,
    default() {
      return 200;
    },
  },
  right: {
    type: Number,
    default() {
      return 40;
    },
  },
  bottom: {
    type: Number,
    default() {
      return 40;
    },
  },
});

const emit = defineEmits(["click"]);

const state = reactive<State>({
  container: document,
  el: document.documentElement,
  visible: false,
});

const handleScroll = () => {
  console.log("--------state.el.scrollTop", state.el.scrollTop);
  if (state.el) {
    state.visible = state.el.scrollTop > props.visibilityHeight;
  }
};
const handleScrollThrottled = useThrottleFn(handleScroll, 50);

watch(
  () => props.target,
  (v) => {
    v && processContainer(v);
  }
);

watch(
  () => state.container,
  () => {
    useEventListener(state.container, "scroll", handleScrollThrottled); // 滚动事件
  }
);

onMounted(() => {
  processContainer(props.target);
});

const styles = computed(() => ({
  right: `${props.right}px`,
  bottom: `${props.bottom}px`,
}));

const processContainer = (target: typeof props.target) => {
  state.container = document;

  console.log("target ===>", target);
  if (typeof target === "string") {
    state.el = (document.querySelector(target) as HTMLElement) ?? undefined;
  } else if (typeof target === "function") {
    state.el = target() as HTMLElement;
  } else {
    state.el = target as HTMLElement;
  }

  if (!state.el) {
    throw new Error(`target is not existed: ${props.target}`);
  }

  state.container = state.el;
};

const handleClick = (event: MouseEvent) => {
  scrollToTop();
  emit("click", event);
};

const scrollToTop = () => {
  if (!state.el) return;
  const beginTime = Date.now();
  const beginValue = state.el.scrollTop;
  const frameFunc = () => {
    if (!state.el) return;
    const progress = (Date.now() - beginTime) / 500;
    if (progress < 1) {
      state.el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
      requestAnimationFrame(frameFunc);
    } else {
      state.el.scrollTop = 0;
    }
  };
  requestAnimationFrame(frameFunc);
};
</script>
