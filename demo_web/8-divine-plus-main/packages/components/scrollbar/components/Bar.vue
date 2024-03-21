<template>
  <Thumb direction="horizontal" ref="refHThumb" @mousedown="onMouseHDown" />
  <Thumb direction="vertical" ref="refVThumb" @mousedown="onMouseVDown" />
</template>

<script setup lang="ts">
import { inject, reactive, onMounted, ref } from "vue";
import type { Ref } from "vue";
import type { ExtractPropTypes } from "vue";
import { scrollbarProps as scrollbarPropsType } from "../utils/constant";
import Thumb from "./Thumb.vue";

const refHThumb = ref();
const refVThumb = ref();

const ratio = inject<Ref<{ ratioY: number; ratioX: number }>>("ratio");
const refWrap = inject<Ref<HTMLDivElement>>("refWrap");
const scrollbarProps =
  inject<ExtractPropTypes<typeof scrollbarPropsType>>("scrollbarProps");

const state = reactive({
  isDown: false,
  mouseVOffset: 0,
  isRight: false,
  mouseHOffset: 0,
});

const onMouseVDown = (e: MouseEvent) => {
  state.isDown = true;
  state.mouseVOffset =
    e.clientY - refVThumb.value?.refVThumbRoot.getBoundingClientRect().top;
};

const onMouseHDown = (e: MouseEvent) => {
  state.isRight = true;
  state.mouseHOffset =
    e.clientX - refHThumb.value?.refHThumbRoot.getBoundingClientRect().left;
};

onMounted(() => {
  document.addEventListener("mousemove", onMouseMove, false);
  document.addEventListener("mouseup", onMouseUp, false);
});

const onMouseMove = (e: MouseEvent) => {
  processVMove(e);
  processHMove(e);
};

const onMouseUp = () => {
  state.isDown = false;
  state.isRight = false;
};

const processVMove = (e: MouseEvent) => {
  if (!refWrap?.value || !refVThumb.value?.refVThumbRoot) return;

  if (state.isDown) {
    const barScrollDistance =
      e.clientY -
      refWrap?.value.getBoundingClientRect().top! -
      state.mouseVOffset;

    if (
      barScrollDistance <= 0 ||
      barScrollDistance >=
        refWrap!.value.offsetHeight -
          refVThumb.value?.refVThumbRoot.offsetHeight
    ) {
      return;
    }

    refWrap.value.scrollTop = barScrollDistance * ratio?.value?.ratioY!;
    refVThumb.value.refVThumbRoot.style.transform = `translateY(${barScrollDistance}px)`;
  }
};

const processHMove = (e: MouseEvent) => {
  if (
    !refWrap?.value ||
    !refHThumb.value?.refHThumbRoot ||
    !scrollbarProps?.showHorizontalBar
  )
    return;

  if (state.isRight) {
    const barScrollDistance =
      e.clientX -
      refWrap?.value.getBoundingClientRect().left! -
      state.mouseHOffset;

    if (
      barScrollDistance <= 0 ||
      barScrollDistance >=
        refWrap!.value.offsetWidth - refHThumb.value?.refHThumbRoot.offsetWidth
    ) {
      return;
    }

    refWrap.value.scrollLeft = barScrollDistance * ratio?.value?.ratioX!;
    refHThumb.value.refHThumbRoot.style.transform = `translateX(${barScrollDistance}px)`;
  }
};

defineExpose({
  refHThumb,
  refVThumb,
});
</script>
