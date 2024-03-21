import { ref, unref } from "vue";

const defaultNamespace = "dv";
const statePrefix = "is-";

// bem
const _bem = (
  ns: string,
  block: string,
  suffixBlock: string,
  element: string,
  modifier: string
) => {
  let cls = `${ns}-${block}`;
  if (suffixBlock) {
    cls += `-${suffixBlock}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

// prefix 前缀
// suffix 后缀

// unref
// - 是一个语法糖
// - 如果参数是 ref，则返回内部值，否则返回参数本身
// - 相当于：val = isRef(val) ? val.value : val

// useNamespace
export const useNamespace = (block: string) => {
  const namespace = ref(defaultNamespace);

  // b e m
  // _bem(namespace, block, suffixBlock, element, modifier)
  // 参数分别是: namespace block suffixBlock element modifier
  const b = (blockSuffix = "") =>
    _bem(unref(namespace), block, blockSuffix, "", "");

  const e = (element?: string) =>
    element ? _bem(unref(namespace), block, "", element, "") : "";

  const m = (modifier?: string) =>
    modifier ? _bem(unref(namespace), block, "", "", modifier) : "";

  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem(unref(namespace), block, blockSuffix, element, "")
      : "";
  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? _bem(unref(namespace), block, "", element, modifier)
      : "";
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem(unref(namespace), block, blockSuffix, "", modifier)
      : "";
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(unref(namespace), block, blockSuffix, element, modifier)
      : "";

  // is
  // - 只有一个参数:
  //    - 比如 ns.is(contentPosition)
  //    - ns.is('center') 时，结果就是 ( is-center )
  // - 有两个以上的参数:
  //    - 比如 ns.is('vertical', isVertical)
  //    - 第一个参数是 modifier ---> is-modifier
  //    - 第二个参数是 boolean ----> state的取值，表示是否存在 is-modifier 这个 class，如果是false则该class属性没有被声明
  const is: {
    (name: string, state: boolean | undefined): string;
    (name: string): string;
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true;
    return name && state ? `${statePrefix}${name}` : "";
  };

  const isM = (modifier: string, isShow: boolean) => {
    const cls = modifier ? _bem(unref(namespace), block, "", "", modifier) : "";
    return isShow ? `${cls}` : "";
  };

  // for css var
  // --dv-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {};
    for (const key in object) {
      styles[`--${namespace.value}-${key}`] = object[key];
    }
    return styles;
  };

  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {};
    for (const key in object) {
      styles[`--${namespace.value}-${block}-${key}`] = object[key];
    }
    return styles;
  };

  const cssVarName = (name: string) => `--${namespace.value}-${name}`;
  const cssVarBlockName = (name: string) =>
    `--${namespace.value}-${block}-${name}`;

  // useNamespace 的返回值
  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,

    is,
    isM,

    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  };
};
