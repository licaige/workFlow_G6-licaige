import type { ILoadingEl } from "../directive";

export const processPosition = (el: ILoadingEl) => {
  const styleBox = document.defaultView?.getComputedStyle(el);

  const position = styleBox?.getPropertyValue("position");

  if (position === "static") {
    el.setAttribute("style", "position:relative");
  }

  return styleBox;
};

export const getAttribute = (el: ILoadingEl, attribute: string) => {
  return el.getAttribute(attribute);
};
