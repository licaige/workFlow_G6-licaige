import { shallowReactive } from "vue";
import type { VNode } from "vue";

export type MessageContext = {
  id: string;
  vnode: VNode;
  handler: any;
  vm: any;
  props: any;
};

// shallowReactive
// - reactive() 的浅层作用形式
// - 和 reactive() 不同，这里没有深层级的转换：一个浅层响应式对象里只有根级别的属性是响应式的
// - https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive
export const instances: MessageContext[] = shallowReactive([]);

export const getInstance = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  const current = instances[idx];
  let prev: MessageContext | undefined;
  if (idx > 0) {
    prev = instances[idx - 1];
  }
  return { current, prev };
};

export const getLastOffset = (id: string): number => {
  const { prev } = getInstance(id);
  if (!prev) return 0;

  return prev.vm.bottom;
};
