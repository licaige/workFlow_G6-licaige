/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="vite-plugin-svgr/client" />

/**
 * @filename global.d.ts
 * @description 全局ts声明
 */
declare global {
  // const process: { 与 @types/node重复
  //   env: {
  //     NODE_ENV: string
  //   }
  // }
  namespace JSX {
    interface IntrinsicAttributes {
      class?: any
      style?: any
    }
  }
  // 全局变量设置
  // const _: typeof lodash;

  interface Window {
    eventCenterForAppViteReact: any
    microApp: any
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: string
    __MICRO_APP_BASE_APPLICATION__: string
    __MICRO_APP_PUBLIC_PATH__: string
    __MICRO_APP_BASE_ROUTE__: string

    ActiveXObject: boolean
    webkitIndexedDB: boolean
    mozIndexedDB: boolean
    scrollHeight: number
    scrollTop: number
    clientHeight: number
  }
}

//  declare const REACT_APP_ENV: 'test' | 'dev' | 'uat' | 'prod' | false;
declare module 'mockjs';
declare module '*.ts';
declare module '*.tsx';

declare module 'slash2';
declare module '*.bmp';
declare module '*.tiff';

//client.d.ts 内置了声明模块 '*.svg'、'*.css'、'*.scss'、'*.sass'、'*.less'、'*.styl'等;
// declare module '*.svg' {
//   const content: React.FC<React.SVGProps<SVGElement>>
//   export default content
// }
  
export {};

// import 'react';

// declare module 'react' {
//   interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
//     jsx?: boolean;
//     global?: boolean;
//   }
// }