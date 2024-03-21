import type { TDirective } from "./utils";

export const vDvLazy: TDirective = {
  name: "DvLazy",
  options: {
    mounted(el, binding) {
      // if (el.tagName !== "IMG") return;

      el.src = "";
      const imgSrc = binding.value;

      const observerInstance = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          el.src = imgSrc;
          observerInstance.unobserve(el);
        }
      });

      el.observerInstance = observerInstance;
      observerInstance.observe(el);
    },
    unmounted(el) {
      el?.observerInstance.disconnect();
    },
  },
};
