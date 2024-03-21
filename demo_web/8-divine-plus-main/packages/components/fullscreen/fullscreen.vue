<template>
  <span
    :class="[ns.b(), ns.is('directive', !Boolean($slots.default))]"
    ref="refFullscreen"
  >
    <div v-if="!isFullscreen" :class="ns.e('zoom')" @click="onMax">
      <svg
        t="1689072802809"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4187"
        width="20"
        height="20"
      >
        <path
          d="M258.275556 197.006222l50.176-50.176a9.159111 9.159111 0 0 0-5.404445-15.530666l-183.068444-21.617778a9.159111 9.159111 0 0 0-10.154667 10.183111l21.589333 183.068444a9.159111 9.159111 0 0 0 15.530667 5.404445l49.948444-49.976889 152.803556 152.689778c3.555556 3.555556 9.386667 3.555556 12.913778 0l48.469333-48.355556a9.159111 9.159111 0 0 0 0-12.885333L258.275556 197.006222z m403.057777 214.044445c3.555556 3.555556 9.386667 3.555556 12.942223 0l152.803555-152.689778 49.92 49.948444a9.159111 9.159111 0 0 0 15.559111-5.376l21.617778-182.954666a9.159111 9.159111 0 0 0-10.183111-10.183111l-183.096889 21.617777a9.159111 9.159111 0 0 0-5.376 15.530667L765.724444 197.12l-152.803555 152.576a9.159111 9.159111 0 0 0 0 12.913778l48.469333 48.440889z m231.224889 309.959111a9.159111 9.159111 0 0 0-15.559111-5.404445l-49.92 49.976889-152.803555-152.689778a9.187556 9.187556 0 0 0-12.913778 0l-48.469334 48.355556a9.159111 9.159111 0 0 0 0 12.913778l152.803556 152.775111-50.176 50.176a9.159111 9.159111 0 0 0 5.404444 15.559111l183.068445 21.589333a9.159111 9.159111 0 0 0 10.154667-10.183111l-21.589334-183.068444z m-529.92-108.117334a9.187556 9.187556 0 0 0-12.942222 0l-152.803556 152.689778-49.948444-49.948444a9.159111 9.159111 0 0 0-15.530667 5.376l-21.617777 182.954666a9.159111 9.159111 0 0 0 10.183111 10.183112l183.096889-21.617778a9.159111 9.159111 0 0 0 5.376-15.530667l-50.176-50.062222 152.803555-152.661333a9.159111 9.159111 0 0 0 0-12.913778l-48.469333-48.469334z"
          p-id="4188"
        ></path>
      </svg>
    </div>

    <div v-else :class="ns.e('zoom')" @click="onMin">
      <svg
        t="1689076614077"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6996"
        width="20"
        height="20"
      >
        <path
          d="M366.2 181.8c-1-8-10.8-11.4-16.5-5.7l-53.1 53.1L134.2 67c-3.8-3.8-10-3.8-13.7 0L69 118.3c-3.8 3.8-3.8 10 0 13.7l162.4 162.4-53.3 53.3c-5.7 5.7-2.3 15.5 5.7 16.5l194.6 23c6.2 0.7 11.5-4.5 10.8-10.8l-23-194.6z m12.3 453.3l-194.7 23c-8 1-11.4 10.8-5.7 16.5l53.3 53.3L69 890.1c-3.8 3.8-3.8 10 0 13.7l51.5 51.4c3.8 3.8 10 3.8 13.7 0l162.4-162.3 53.1 53.1c5.7 5.7 15.5 2.3 16.5-5.7l23-194.4c0.7-6.3-4.5-11.5-10.7-10.8z m269.4-248l194.7-23c8-1 11.4-10.8 5.7-16.5L795 294.4l162.4-162.3c3.8-3.8 3.8-10 0-13.7L905.9 67c-3.8-3.8-10-3.8-13.7 0L729.7 229.2l-53.1-53.1c-5.7-5.7-15.6-2.3-16.5 5.7l-23 194.5c-0.6 6.3 4.6 11.5 10.8 10.8zM795 727.8l53.3-53.3c5.7-5.7 2.3-15.5-5.7-16.5L648 635c-6.2-0.7-11.5 4.5-10.8 10.8l23 194.6c1 8 10.8 11.4 16.5 5.7l53.1-53.1 162.4 162.3c3.8 3.8 10 3.8 13.7 0l51.5-51.4c3.8-3.8 3.8-10 0-13.7L795 727.8z m0 0"
          p-id="6997"
        ></path>
      </svg>
    </div>
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { DV_FULLSCREEN } from "./utils/constant";
export default {
  name: DV_FULLSCREEN,
};
</script>

<script setup lang="ts">
import { ref, useSlots, useAttrs, onMounted, computed } from "vue";
import { useNamespace } from "@/hooks/useNamespace";

const props = defineProps({ container: Object });

const ns = useNamespace("fullscreen");

const slots = useSlots();
const attrs: {
  onZoomOut?: () => void;
  onZoomIn?: () => void;
} = useAttrs();

const refFullscreen = ref();
const isFullscreen = ref(false);

onMounted(() => {
  document.addEventListener(
    "fullscreenchange",
    () => {
      if (getFullscreenElement() == null) {
        isFullscreen.value = false;
      } else {
        isFullscreen.value = true;
      }
    },
    false
  );
});

const container = computed(() =>
  slots.default ? refFullscreen.value : props.container
);

const onMax = () => {
  const target = container.value;

  if (target.requestFullscreen) {
    target.requestFullscreen();
  } else if (target.webkitRequestFullScreen) {
    target.webkitRequestFullScreen();
  } else if (target.mozRequestFullScreen) {
    target.mozRequestFullScreen();
  } else if (target.msRequestFullscreen) {
    target.msRequestFullscreen();
  }

  isFullscreen.value = true;
  attrs?.onZoomOut?.();
};

const onMin = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }

  isFullscreen.value = false;
  attrs?.onZoomIn?.();
};

const getFullscreenElement = () => {
  return document["fullscreenElement"] || null;
};
</script>
