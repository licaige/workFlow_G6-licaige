import { createVNode, render } from "vue";
import Fullscreen from "./fullscreen.vue";
import { DV_FULLSCREEN } from "./utils/constant";
import type { TDirective } from "@/directives/utils";

const processStyle = (el: HTMLElement) => {
  el.style.position = "relative";
  const style = window.getComputedStyle(el);
  if (!style.background.includes("rgba(0,0,0,0)")) {
    el.style.background = "#fff";
  }
};

export const vDvFullscreen: TDirective = {
  name: DV_FULLSCREEN,
  options: {
    mounted(el) {
      processStyle(el);

      const fullscreen = createVNode(Fullscreen, {
        container: el,
      });

      render(fullscreen, el);
    },
    unmounted(el) {
      render(null, el);
    },
  },
};
