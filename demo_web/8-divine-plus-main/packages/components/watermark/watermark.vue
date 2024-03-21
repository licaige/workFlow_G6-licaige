<template>
  <section :class="ns.b()" ref="watermarkRef">
    <slot></slot>
  </section>
</template>

<script lang="ts">
export default {
  name: "DvWatermark",
};
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, reactive } from "vue";
import { useNamespace } from "@/hooks/useNamespace";
import { useCreateWatermark, watermarkProps } from "./utils";

const props = defineProps(watermarkProps);

const watermarkRef = ref<HTMLElement>();
const ns = useNamespace("watermark");
const watermarkState = useCreateWatermark(props);

const state = reactive<{
  div: HTMLDivElement | null;
  observer: MutationObserver | null;
}>({
  div: null,
  observer: null,
});

onMounted(() => {
  initObserver();
});
onUnmounted(() => {
  state.observer?.disconnect();
});

watch(
  () => [watermarkState.watermark.base64, watermarkRef.value],
  () => paint(),
  {
    immediate: true,
  }
);

const initObserver = () => {
  const callback = (mutationsList: MutationRecord[]) => {
    const [mutation] = mutationsList;
    // 删除
    for (let i = 0; i < mutation.removedNodes.length; i++) {
      if (mutation.removedNodes[i] === state.div) {
        paint();
      }
    }
    // 属性修改
    if (mutation.target === state.div) {
      paint();
    }
  };
  state.observer = new MutationObserver(callback);
  watermarkRef.value &&
    state.observer.observe(watermarkRef.value, {
      attributes: true,
      childList: true,
      subtree: true,
    });
};

function paint() {
  if (!watermarkRef.value) return;
  if (state.div) state.div.remove();

  state.div = document.createElement("div");
  state.div.style.backgroundImage = `url(${watermarkState.watermark.base64})`;
  state.div.style.backgroundSize = `${watermarkState.watermark.width} ${watermarkState.watermark.height}`;

  state.div.style.position = "absolute";
  state.div.style.inset = "0";
  state.div.style.zIndex = String(props.zIndex);

  watermarkRef.value.appendChild(state.div);
}
</script>
