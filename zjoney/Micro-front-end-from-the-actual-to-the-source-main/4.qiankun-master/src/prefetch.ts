/**
 * @author Kuitos
 * @since 2019-02-26
 */

import type { Entry, ImportEntryOpts } from 'import-html-entry';
import { importEntry } from 'import-html-entry';
import { isFunction } from 'lodash';
import { getAppStatus, getMountedApps, NOT_LOADED } from 'single-spa';
import type { AppMetadata, PrefetchStrategy } from './interfaces';

declare global {
  interface NetworkInformation {
    saveData: boolean;
    effectiveType: string;
  }
}

// RIC and shim for browsers setTimeout() without it
const requestIdleCallback =
  window.requestIdleCallback ||
  function requestIdleCallback(cb: CallableFunction) {
    const start = Date.now();
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining() {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  };

declare global {
  interface Navigator {
    connection: {
      saveData: boolean;
      effectiveType: string;
      type: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';
    };
  }
}

const isSlowNetwork = navigator.connection
  ? navigator.connection.saveData ||
    (navigator.connection.type !== 'wifi' &&
      navigator.connection.type !== 'ethernet' &&
      /([23])g/.test(navigator.connection.effectiveType))
  : false;

/**
 * prefetch assets, do nothing while in mobile network
 * @param entry
 * @param opts
 */
function prefetch(entry: Entry, opts?: ImportEntryOpts): void {
  if (!navigator.onLine || isSlowNetwork) { // 如果慢网的情况或者无网的情况 结束
    // Don't prefetch if in a slow network or offline
    return;
  }

  requestIdleCallback(async () => {
    // 预加载入口文件  替代systemjs -> import-html-enttry  加载html注释掉 js和css文件
    const { getExternalScripts, getExternalStyleSheets } = await importEntry(entry, opts);
    requestIdleCallback(getExternalStyleSheets); // 获取额外的样式表和脚本的操作
    requestIdleCallback(getExternalScripts);
  });
}

function prefetchAfterFirstMounted(apps: AppMetadata[], opts?: ImportEntryOpts): void {
  // single-spa中 默认内部 dispatchEvent('single-spa:first-mount')
  window.addEventListener('single-spa:first-mount', function listener() {
    // 获取到所谓未加载的app
    const notLoadedApps = apps.filter((app) => getAppStatus(app.name) === NOT_LOADED);

    if (process.env.NODE_ENV === 'development') {
      const mountedApps = getMountedApps();
      console.log(`[qiankun] prefetch starting after ${mountedApps} mounted...`, notLoadedApps);
    }
    // 获取没有加载的应用依次去加载
    notLoadedApps.forEach(({ entry }) => prefetch(entry, opts));
    // 加载完毕后移除监听
    window.removeEventListener('single-spa:first-mount', listener);
  });
}

export function prefetchImmediately(apps: AppMetadata[], opts?: ImportEntryOpts): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[qiankun] prefetch starting for apps...', apps);
  }

  apps.forEach(({ entry }) => prefetch(entry, opts));
}
// 预先加载的策略
export function doPrefetchStrategy(
  apps: AppMetadata[],
  prefetchStrategy: PrefetchStrategy,
  importEntryOpts?: ImportEntryOpts,
) {
  const appsName2Apps = (names: string[]): AppMetadata[] => apps.filter((app) => names.includes(app.name));
  // prefetch:true
  if (Array.isArray(prefetchStrategy)) { // prefetch:[]
    prefetchAfterFirstMounted(appsName2Apps(prefetchStrategy as string[]), importEntryOpts);
  } else if (isFunction(prefetchStrategy)) { // pretch:function(){return []}
    (async () => {
      // critical rendering apps would be prefetch as earlier as possible
      const { criticalAppNames = [], minorAppsName = [] } = await prefetchStrategy(apps);
      prefetchImmediately(appsName2Apps(criticalAppNames), importEntryOpts);
      prefetchAfterFirstMounted(appsName2Apps(minorAppsName), importEntryOpts);
    })();
  } else {
    switch (prefetchStrategy) {
      case true:
        // 等待第一个应用加载完毕后 加载其他应用
        prefetchAfterFirstMounted(apps, importEntryOpts);
        break;

      case 'all':
        prefetchImmediately(apps, importEntryOpts);
        break;

      default:
        break;
    }
  }
}
