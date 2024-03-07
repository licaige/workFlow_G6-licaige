import cheerio, { CheerioAPI, Element } from 'cheerio'
import { PluginOption } from 'vite'

const appendBase =
  "(window.proxy ? (window.proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + '..') : '') + ";

const createImport = (src: string, callback?: string) =>
  `import(${appendBase}'${src}').then(${callback})`;

const createEntry = (entryScript: string | null) => `
let RefreshRuntime;
${createImport(
  "/@react-refresh",
  `(module) => {
  RefreshRuntime=module.default
  RefreshRuntime.injectIntoGlobalHook(window)
  ${entryScript}
}`
)}`;

const createQiankunHelper = (qiankunName: string) => `
  const createDeffer = (hookName) => {
    const d = new Promise((resolve, reject) => {
      window.proxy && (window.proxy[\`vite\${hookName}\`] = resolve)
    })
    return props => d.then(fn => fn(props));
  }
  const bootstrap = createDeffer('bootstrap');
  const mount = createDeffer('mount');
  const unmount = createDeffer('unmount');
  const update = createDeffer('update');

  ;(global => {
    global.qiankunName = '${qiankunName}';
    global['${qiankunName}'] = {
      bootstrap,
      mount,
      unmount,
      update
    };
  })(window);
`

// eslint-disable-next-line no-unused-vars
// const replaceSomeScript = ($: CheerioAPI, findStr: string, replaceStr: string = '') => {
//   $('script').each((i, el) => {
//     if ($(el).html()?.includes(findStr)) {
//       $(el).html(replaceStr)
//     }
//   })
// }

const createImportFinallyResolve = (qiankunName: string) => {
  return `
    const qiankunLifeCycle = window.moudleQiankunAppLifeCycles && window.moudleQiankunAppLifeCycles['${qiankunName}'];
    if (qiankunLifeCycle) {
      window.proxy.vitemount((props) => qiankunLifeCycle.mount(props));
      window.proxy.viteunmount((props) => qiankunLifeCycle.unmount(props));
      window.proxy.vitebootstrap(() => qiankunLifeCycle.bootstrap());
      window.proxy.viteupdate((props) => qiankunLifeCycle.update(props));
    }
  `
}

export type MicroOption = {
  useDevMode?: boolean
}
type PluginFn = (qiankunName: string, microOption?: MicroOption) => PluginOption;

const htmlPlugin: PluginFn = (qiankunName, microOption = {}) => {
  let isProduction: boolean
  let base = ''

  const module2DynamicImport = ($: CheerioAPI, scriptTag: Element) => {
    if (!scriptTag) {
      return
    }
    const script$ = $(scriptTag)
    const moduleSrc = script$.attr('src') || '/@react-refresh'
    let appendBase = ''
    if (microOption.useDevMode && !isProduction) {
      appendBase = '(window.proxy ? (window.proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + \'..\') : \'\') + '
    }
    script$.removeAttr('src')
    script$.removeAttr('type')
    script$.html(`import(${appendBase}'${moduleSrc}')`)
    return script$
  }

  return {
    name: 'qiankun-html-transform',
    configResolved (config) {
      isProduction = config.command === 'build' || config.isProduction
      base = config.base
    },

    configureServer (server) {
      return () => {
        server.middlewares.use((_req, res, next) => {
          if (isProduction || !microOption.useDevMode) {
            next()
            return
          }
          const end = res.end.bind(res)
          res.end = (...args: any[]): any => {
            // eslint-disable-next-line prefer-const
            let [htmlStr, ...rest] = args
            if (typeof htmlStr === 'string') {
              const $ = cheerio.load(htmlStr)
              module2DynamicImport($, $(`script[src=${base}@vite/client]`).get(0))
              // 由于 vite 的热更新机制，会在入口文件中注入一段代码，用于热更新
              const entryScript = $("#entry");
              entryScript.html(createEntry(entryScript.html()));
              htmlStr = $.html()
            }
            end(htmlStr, ...rest)
          }
          next()
        })
      }
    },
    transformIndexHtml (html: string) {
      const $ = cheerio.load(html)
      const moduleTags = $("script[type=module]");
      if (!moduleTags || !moduleTags.length) {
        return
      }
      const len = moduleTags.length
      moduleTags.each((i, moduleTag) => {
        const script$ = module2DynamicImport($, moduleTag)
        if (len - 1 === i) {
          // 入口文件中导入生命周期勾子
          script$?.attr("id", "entry").html(`${script$.html()}.finally(() => {
            ${createImportFinallyResolve(qiankunName)}
          })`)
        }
      })

      $('body').append(`<script>${createQiankunHelper(qiankunName)}</script>`)
      const output = $.html()
      return output
    }
  }
}

export default htmlPlugin