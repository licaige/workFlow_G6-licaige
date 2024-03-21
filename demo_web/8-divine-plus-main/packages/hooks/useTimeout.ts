import { ref, onUnmounted } from "vue";

type TUseTimeout = (fn: (...args: any[]) => void, delay: number) => void;

export const useTimeout: TUseTimeout = (fn, delay) => {
  const timer = ref<number>();

  timer.value = window.setTimeout(() => {
    fn();
  }, delay);

  onUnmounted(() => {
    timer.value && clearTimeout(timer.value);
  });
};
