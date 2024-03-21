import { createVNode, render } from "vue";
import Message from "./message.vue";
import { instances } from "./instances";
import type { MessageContext } from "./instances";

let seed = 1;
let zIndex = 77;

const closeMessage = (instance: MessageContext) => {
  const idx = instances.indexOf(instance);
  if (idx === -1) return;

  instances.splice(idx, 1);
  const { handler } = instance;
  handler.close();
};

const createMessage = (options: any) => {
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;

  if (typeof options === "string") {
    options = {
      message: options,
    };
  }

  const props = {
    ...options,
    id,
    zIndex: zIndex++,
    onClose: () => {
      userOnClose?.();
      closeMessage(instance);
    },
    onDestroy: (p: boolean) => {
      render(null, container);
    },
  };

  const vnode = createVNode(Message, props);
  const container = document.createElement("div");
  render(vnode, container);
  document.body.appendChild(container?.firstElementChild!);

  const vm = vnode.component!.proxy as any;
  const handler = {
    close: () => {
      vm.visible = false;
    },
  };

  const instance: MessageContext = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props,
  };

  return instance;
};

// DvMessage
const DvMessage = (options = {}) => {
  const instance = createMessage(options);

  instances.push(instance);
  return instance.handler;
};
DvMessage.$name = "$message";
DvMessage._context = null as any;

["success", "warning", "info", "error"].forEach((type) => {
  (DvMessage as any)[type] = (options: any = {}) => {
    if (typeof options === "string") {
      return DvMessage({
        message: options,
        type,
      });
    }

    return DvMessage({
      ...options,
      type,
    });
  };
});

export default DvMessage;

// createVNode
// 1.declare function _createVNode(
//   type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
//   props?: (Data & VNodeProps) | null,
//   children?: unknown,
//   patchFlag?: number,
//   dynamicProps?: string[] | null,
//   isBlockNode?: boolean
// ): VNode;

// render
// 1. export declare const render: RootRenderFunction<Element | ShadowRoot>;
// 2. export declare type RootRenderFunction<HostElement = RendererElement> = (
//   vnode: VNode | null,
//   container: HostElement,
//   isSVG?: boolean
// ) => void;
