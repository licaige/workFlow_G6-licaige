import { onMounted, onUnmounted, ref } from "vue";
import type { Ref } from "vue";

type TOptions = {
  restoreOnUnmounted: boolean;
};
type TUseTitle = (
  title: string,
  options?: TOptions
) => [currentTitle: Ref<string>, changeTitle: (title: string) => void];

export const useTitle: TUseTitle = (title, options) => {
  const { restoreOnUnmounted = false } = options || {};

  const preTitle = document.title;

  const currentTitle = ref(title);

  const setTitle = (title: string) => {
    document.title = title;
  };

  const changeTitle = (title: string) => {
    currentTitle.value = title;
    setTitle(title);
  };

  onMounted(() => {
    setTitle(currentTitle.value);
  });

  onUnmounted(() => {
    restoreOnUnmounted && setTitle(preTitle);
  });

  return [currentTitle, changeTitle];
};
