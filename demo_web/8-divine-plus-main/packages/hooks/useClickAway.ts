import { isRef, onUnmounted } from "vue";
import type { Ref } from "vue";

type TTarget = Ref<HTMLElement> | HTMLElement | Document | Window;
type TOptions = {
  events?: TDocumentEventKey | TDocumentEventKey[];
  root?: TTarget;
};
type TDocumentEventKey = keyof DocumentEventMap;

type TUseClickAway = (
  onClickAway: (e: MouseEvent) => void,
  targets: TTarget | TTarget[],
  options?: TOptions
) => void;

export const useClickAway: TUseClickAway = (
  onClickAway,
  targets,
  options = {
    events: "click",
    root: document,
  }
) => {
  const targetList = Array.isArray(targets) ? targets : [targets];
  const { events = "click", root = document } = options;
  const eventsList = Array.isArray(events) ? events : [events];

  const getTarget = (target: TTarget): HTMLElement | Document | Window => {
    if (isRef(target)) {
      return target.value;
    }
    return target;
  };

  const handler = (e: any) => {
    const isChild = targetList.some((targetItem) => {
      const target = getTarget(targetItem);
      return !target || (target as HTMLElement)?.contains(e.target);
    });

    if (isChild) return;

    onClickAway(e);
  };

  eventsList.forEach((eventType) => {
    getTarget(root).addEventListener(eventType, handler, false);
  });

  onUnmounted(() => {
    eventsList.forEach((eventType) => {
      getTarget(root).removeEventListener(eventType, handler, false);
    });
  });
};
