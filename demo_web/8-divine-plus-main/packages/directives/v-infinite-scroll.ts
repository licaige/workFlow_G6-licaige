import { ComponentPublicInstance, nextTick } from "vue";
import { isClient } from "@vueuse/core";
import { useThrottle } from "../hooks";
import type { TDirective } from "./utils";

const INFINITE_SCROLL = "INFINITE_SCROLL";

const infiniteScrollOptions = {
  distance: {
    type: [Number, String],
    default: 0,
  },
  delay: {
    type: [Number, String],
    default: 200,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  immediate: {
    type: Boolean,
    default: false,
  },
};

type TAttrs = typeof infiniteScrollOptions;
type TScrollOptions = { [K in keyof TAttrs]: TAttrs[K]["default"] };
type TContainer = HTMLElement & {
  [INFINITE_SCROLL]: {
    cb: (...args: any) => any;
    instance: ComponentPublicInstance<any>;
    onScroll: (el: TContainer) => void;
    scroll: () => typeof onScroll;
    container: HTMLElement;
    delay: number;
    io: MutationObserver;
  };
};

const canScroll = (container: HTMLElement) => {
  const style = window.getComputedStyle(container);
  const { overflow, overflowY } = style;
  const flows = [overflow, overflowY];

  return flows.some((key) => ["scroll", "auto"].includes(key));
};

const getScrollContainer = (el: HTMLElement) => {
  if (!isClient) return;

  let container = el;

  while (container) {
    if ([window, document, document.documentElement].includes(container)) {
      return window;
    }

    if (canScroll(container)) {
      return container;
    }

    container = container.parentNode as HTMLElement;
  }

  return container;
};

const getScrollOptions = (el: HTMLElement) => {
  return Object.entries(infiniteScrollOptions).reduce(
    (options, [name, option]) => {
      const { default: defaultValue } = option;

      const attributeValue = el.getAttribute(name);

      let value = attributeValue ?? defaultValue;
      value = ["distance", "delay"].includes(name) ? Number(value) : value;
      value = value === "false" ? false : value;
      value = value === "true" ? true : value;

      options[name] = value;

      return options;
    },
    {} as TScrollOptions & any
  );
};

const getBorderBottom = (container: HTMLElement) => {
  const borderBottom = Number(
    window.getComputedStyle(container).borderBottom.match(/(\d+)/)?.[0] ?? 0
  );
  return borderBottom;
};

const onScroll = (el: TContainer) => {
  const { container } = el[INFINITE_SCROLL];

  const { disabled, distance } = getScrollOptions(el);

  if (disabled) return;

  let canTrigger = false;

  if (el === container) {
    canTrigger = el.scrollHeight - el.clientHeight - el.scrollTop <= distance;
  } else if (el !== container) {
    canTrigger =
      el.offsetHeight +
        el.getBoundingClientRect().top -
        container.getBoundingClientRect().top -
        container.offsetHeight -
        getBorderBottom(container) <=
      distance;
  }

  if (canTrigger) {
    el[INFINITE_SCROLL].cb();
  }
};

export const vDvInfiniteScroll: TDirective = {
  name: "DvInfiniteScroll",
  options: {
    async mounted(el, binding) {
      const { value: cb, instance } = binding;

      if (typeof cb !== "function") {
        throw new Error(
          "'v-dv-infinite-scroll' binding value must be a function"
        );
      }

      await nextTick();

      const container = getScrollContainer(el)!;
      const { immediate, delay } = getScrollOptions(el);
      const scrollThrottle = useThrottle(() => onScroll(el), {
        delay: 80,
        immediate: false,
      });

      el[INFINITE_SCROLL] = {
        cb,
        instance,
        onScroll,
        container,
        delay,
        scrollThrottle,
      };

      if (!container) return;

      if (immediate) {
        const io = new MutationObserver(scrollThrottle);
        io.observe(container as Node, { childList: true, subtree: true });
        el[INFINITE_SCROLL].io = io;
        scrollThrottle();
      }

      container.addEventListener("scroll", scrollThrottle, false);
    },
    unmounted(el) {
      const { container, scrollThrottle, io } = el[INFINITE_SCROLL];
      container.removeEventListener("scroll", scrollThrottle, false);

      io?.disconnect();
    },
  },
};
