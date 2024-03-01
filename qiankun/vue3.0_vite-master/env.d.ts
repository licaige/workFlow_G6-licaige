/// <reference types="vite/client" />
declare module "*.vue"{
  import { DefineComponent } from "vue";
  const component: DefineComponent<{},{},any>
  export default component
}
declare module 'vue-grid-layout'{
  import VueGridLayout from 'vue-grid-layout';
  export default VueGridLayout
}