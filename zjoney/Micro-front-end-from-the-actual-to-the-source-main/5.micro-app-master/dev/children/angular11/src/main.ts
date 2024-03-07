import { enableProdMode, NgModuleRef  } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

declare global {
  interface Window {
    microApp: any
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: string
  }
}

// ----------分割线---默认模式------两种模式任选其一-----放开注释即可运行------- //
// let app = null;
// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .then((res: NgModuleRef<AppModule>) => {
//     app = res
//   })
//   .catch(err => console.error(err))

// console.log('微应用child-angular11渲染了');

// // 监听卸载操作
// window.addEventListener("unmount", function () {
//   app.destroy();
//   app = null;
//   console.log('微应用child-angular11卸载了');
// })

// ----------分割线---umd模式------两种模式任选其一-------------- //
let app = null;
// 将渲染操作放入 mount 函数
async function mount () {
  app = await platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err))

  console.log('微应用child-angular11渲染了');
}

// 将卸载操作放入 unmount 函数
function unmount () {
  app.destroy();
  app = null;
  console.log('微应用child-angular11卸载了');
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount();
}
