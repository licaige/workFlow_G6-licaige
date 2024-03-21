import { createVNode, render } from "vue";
import { processPosition } from "./utils/index";
import Loading from "./loading.vue";
import type { DirectiveBinding, UnwrapRef } from "vue";
import type { LoadingOptions } from "./utils/type";

export interface ILoadingEl extends HTMLElement {
  INSTANCE: {
    [key: string]: any;
  };
}
export type LoadingBinding = boolean | UnwrapRef<LoadingOptions>;

const createInstance = (
  el: ILoadingEl,
  binding: DirectiveBinding<LoadingBinding>
) => {
  processPosition(el);

  const props = {
    visible: binding.value,
    fullscreen: binding.modifiers.fullscreen,
    text: el.getAttribute("dv-loading-text"),
    background: el.getAttribute("dv-loading-background-color"),
  };
  const vnode = createVNode(Loading, props);

  el.INSTANCE = {
    props,
    instance: vnode,
  };
  render(vnode, el);
};

const LoadingDirective = {
  mounted(el: ILoadingEl, binding: DirectiveBinding<LoadingBinding>) {
    if (binding.value) {
      createInstance(el, binding);
    }
  },
  updated(el: ILoadingEl, binding: DirectiveBinding<LoadingBinding>) {
    createInstance(el, binding);
  },
  unmounted(el: ILoadingEl) {
    render(null, el);
  },
};

export { LoadingDirective };
