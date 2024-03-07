/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  $RefreshReg$: () => void;
  $RefreshSig$: () => (type: any) => any;
  __vite_plugin_react_preamble_installed__: boolean;
  __POWERED_BY_QIANKUN__: boolean;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
  proxy: any;
  moudleQiankunAppLifeCycles: QiankunAppLifeCycles;
}
