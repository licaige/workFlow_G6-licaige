/// <reference types="vite/client" />

// import { Object } from 'fabric/fabric-impl';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  declare module 'fabric/fabric-impl' {
    interface IObjectOptions {
      /**
       * 标识
       */
      id?: string | undefined;
    }
  }
}

export as namespace vfe;
declare module 'vfe' {
  export as namespace vfe;
  export interface ICanvas extends fabric.Canvas {
    c: fabric.Canvas;
    editor: Editor;
  }
}
