import Loading from "./loading.vue";
import { createVNode, render } from "vue";
import { processPosition } from "./utils/index";
import type { LoadingOptions } from "./utils/type";

const createInstance = (options: LoadingOptions) => {
  const target: any = options.target ?? document.body;
  processPosition(target);

  const isFullscreen = target === document.body;

  const props = {
    ...options,
    visible: true,
    fullscreen: isFullscreen,
    onDestroy: () => {
      render(null, target);
    },
  };

  const vnode = createVNode(Loading, props);
  render(vnode, target);

  const vm = vnode.component!.proxy as any;
  const handler = {
    close: vm.close,
    visible: vm.visible,
  };

  const instance = {
    vnode,
    vm,
    handler,
  };

  return instance;
};

const LoadingService = (options: LoadingOptions) => {
  const instance = createInstance(options);
  return instance.handler;
};

export { LoadingService };
