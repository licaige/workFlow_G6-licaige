import type { App } from "vue";
import { LoadingService } from "./service";
import { LoadingDirective } from "./directive";

const install = (app: App) => {
  app.directive("loading", LoadingDirective);
  app.config.globalProperties.$loading = LoadingService;
};

export default {
  install,
  directive: LoadingDirective,
  service: LoadingService,
};
