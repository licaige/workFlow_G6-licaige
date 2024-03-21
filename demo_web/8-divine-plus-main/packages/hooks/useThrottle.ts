import { ref, unref } from "vue";

type TOptions = {
  delay: number;
  responsive?: boolean;
  immediate?: boolean;
};
type TUseThrottle = (fn: (...args: any[]) => any, options: TOptions) => any;

export const useThrottle: TUseThrottle = (fn, options) => {
  let { delay, responsive = false, immediate = false } = options;

  const getTimer = () => (responsive ? ref(+new Date()) : +new Date());

  let startTimer = getTimer();

  const callback = (...args: any[]) => {
    if (immediate) {
      fn(...args);
      immediate = false;
      return;
    }

    let currentTimer = getTimer();

    if (unref(currentTimer) - unref(startTimer) >= delay) {
      fn(...args);
      startTimer = currentTimer;
    }
  };

  return callback;
};
