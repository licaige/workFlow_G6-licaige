/// <reference types="vite/client" />

declare const __APP_ENV__

declare module 'path-browserify'

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, any>
  export default component
}
