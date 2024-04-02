declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string | number | symbol, unknown>, Record<string | number | symbol, unknown>, unknown>
  export default component
}

declare module 'custom-ui-plus';