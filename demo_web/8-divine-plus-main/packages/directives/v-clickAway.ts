import { isRef } from "vue";
import type { Ref } from "vue";
import type { TDirective } from "./utils";

type TTarget = Ref<HTMLElement> | HTMLElement;
type TDocumentEventKey = keyof DocumentEventMap;

type TBindingValue = [
  onClickAway: (e: Event) => void,
  targets: TTarget | TTarget[],
  events: TDocumentEventKey | TDocumentEventKey[]
];

export const vDvClickAway: TDirective = {
  name: "DvClickAway",
  options: {
    mounted(el, binding) {
      const [onClickAway, targets, events]: TBindingValue = binding.value;

      const eventsList = Array.isArray(events) ? events : [events];
      const targetList: TTarget[] = Array.isArray(targets)
        ? [el, ...targets]
        : [el, targets];

      const getTarget = (target: any) => {
        if (isRef(target)) return target.value;

        return target;
      };

      const handler = (e: Event) => {
        const isChild = targetList.some((target) => {
          const targetDOM = getTarget(target);
          return !targetDOM || targetDOM.contains(e.target);
        });

        if (isChild) return;

        onClickAway(e);
      };

      el.eventsList = eventsList;
      el.handler = handler;
      eventsList.forEach((event) => {
        window.addEventListener(event, handler, false);
      });
    },
    unmounted(el) {
      el.eventsList.forEach((event: TDocumentEventKey) => {
        window.addEventListener(event, el.handler, false);
      });
    },
  },
};
