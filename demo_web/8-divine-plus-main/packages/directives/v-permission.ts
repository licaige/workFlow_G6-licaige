import type { DirectiveBinding } from "vue";
import type { TDirective } from "./utils/index";

type TMiddleware = (...args: any[]) => any;

type TValues = {
  target: any[];
  current: any[];
};

function compose(...fns: TMiddleware[]) {
  if (fns.length === 0) return (arg: any) => arg;
  if (fns.length === 1) return fns[0];
  return fns.reduce(
    (a, b) =>
      (...args: any[]) =>
        a(b(...args))
  );
}

function hasPermission(value: TValues) {
  const { target, current } = value;
  return target.some((value: any) => current.includes(value));
}

function validate(el: HTMLElement, binding: DirectiveBinding) {
  const values = binding.value;
  function isRemove(hasPermission: boolean) {
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
  compose(isRemove, hasPermission)(values);
}

export const vDvPermission: TDirective = {
  name: "DvPermission",
  options: {
    mounted(el, binding) {
      validate(el, binding);
    },
    updated(el, binding) {
      validate(el, binding);
    },
  },
};
