//尝试手动修复修复类型引用
// {
//     "compilerOptions": {
//       "paths": {
//         "mobx-react": ["../typings/modules/mobx-react"]
//       }
//     }
//   }

//如果您只需要添加一个接口或向现有接口添加缺少的成员，则无需复制整个输入程序包。
// my-typings.ts
// MyComponent.tsx
// import { PlotlyHTMLElement } from 'plotly.js';

// declare module 'plotly.js' {
//   interface PlotlyHTMLElement {
//     removeAllListeners(): void;
//   }
// }

// const f = (e: PlotlyHTMLElement) => {
//   e.removeAllListeners();
// };
