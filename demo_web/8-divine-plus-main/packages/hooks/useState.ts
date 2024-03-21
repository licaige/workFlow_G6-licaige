import { ref } from "vue";
import type { Ref } from "vue";

type TUseStateReturn<T extends any> = [
  Ref<T>,
  (value: T | ((preState: T) => T)) => void
];

export const useState = <T>(initValue: T): TUseStateReturn<T> => {
  const state = ref(initValue) as Ref<T>;

  const setState = (value: T | ((preState: T) => T)) => {
    if (typeof value === "function") {
      const newState = (value as (preState: T) => T)(state.value);
      state.value = newState;
    } else {
      state.value = value;
    }
  };

  return [state, setState];
};
