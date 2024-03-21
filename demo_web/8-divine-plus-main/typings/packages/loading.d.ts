import { DivinePlusComponent } from "../component";
import type { App } from "vue";

export interface LoadingServiceOptions {
  target?: HTMLElement | string;
  body?: boolean;
  fullscreen?: boolean;
  lock?: boolean;
  text?: string;
  spinner?: string;
  background?: string;
  customClass?: string;
}

export declare class DvLoadingComponent extends DivinePlusComponent {
  close(): void;
}

/** Loading directive definition */
export interface DvLoadingDirective extends DivinePlusComponent {
  name: "loading";
  value: boolean;
  modifiers: {
    body: boolean;
    fullscreen: boolean;
  };
}

export interface DvLoading {
  install(vue: App): void;
  service(options: LoadingServiceOptions): any;
  directive: any;
}

declare module "vue/types/vue" {
  interface Vue {
    $loading(options: LoadingServiceOptions): DvLoadingComponent;
  }
}
