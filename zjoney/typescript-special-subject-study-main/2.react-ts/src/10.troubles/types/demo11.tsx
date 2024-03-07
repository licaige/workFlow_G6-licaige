//统一模块
declare module 'use-untyped-hook' {
  export interface InputProps {} // type declaration for prop
  export interface ReturnProps {} // type declaration for return props
  export default function useUntypedHook(
    prop: InputProps
    // ...
  ): ReturnProps;
}

//粒子如下
// inside src/index.js
const useDarkMode = (
  initialValue = false, // -> input props / config props to be exported
  {
    // -> input props / config props to be exported
    element,
    classNameDark,
    classNameLight,
    onChange,
    storageKey = 'darkMode',
    storageProvider,
    global,
  } = {}
) => {
  // ...
  return {
    // -> return props to be exported
    value: state,
    enable: useCallback(() => setState(true), [setState]),
    disable: useCallback(() => setState(false), [setState]),
    toggle: useCallback(() => setState((current) => !current), [setState]),
  };
};
export default useDarkMode;

declare module 'use-dark-mode' {
  /**
   * A config object allowing you to specify certain aspects of `useDarkMode`
   */
  export interface DarkModeConfig {
    classNameDark?: string; // A className to set "dark mode". Default = "dark-mode".
    classNameLight?: string; // A className to set "light mode". Default = "light-mode".
    element?: HTMLElement; // The element to apply the className. Default = `document.body`
    onChange?: (val?: boolean) => void; // Overide the default className handler with a custom callback.
    storageKey?: string; // Specify the `localStorage` key. Default = "darkMode". Set to `null` to disable persistent storage.
    storageProvider?: WindowLocalStorage; // A storage provider. Default = `localStorage`.
    global?: Window; // The global object. Default = `window`.
  }
  /**
   * An object returned from a call to `useDarkMode`.
   */
  export interface DarkMode {
    readonly value: boolean;
    enable: () => void;
    disable: () => void;
    toggle: () => void;
  }
  /**
   * A custom React Hook to help you implement a "dark mode" component for your application.
   */
  export default function useDarkMode(
    initialState?: boolean,
    config?: DarkModeConfig
  ): DarkMode;
}
