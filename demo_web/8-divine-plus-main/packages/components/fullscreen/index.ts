import DvFullscreen from "./fullscreen.vue";
import { vDvFullscreen } from "./directive";
import { DV_FULLSCREEN } from "./utils/constant";
import type { App } from "vue";

const install = (app: App) => {
  app.component(DV_FULLSCREEN, DvFullscreen);
  app.directive(DV_FULLSCREEN, vDvFullscreen.options);
};

export default {
  install,
  directive: vDvFullscreen.options,
};
