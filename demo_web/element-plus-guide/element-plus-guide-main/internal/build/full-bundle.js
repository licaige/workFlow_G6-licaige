import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = dirname(__filenameNew)
// 确定根目录，目前执行目录是在 ./internal/build，所以需要跳出两层
const projRoot = resolve(__dirnameNew, '..', '..')
// 拼接 ./packages 目录路径
const pkgRoot = resolve(projRoot, 'packages')
// 拼接 ./packages/cobyte-ui 目录路径
const epRoot = resolve(pkgRoot, 'cobyte-ui')

// 拼接打包根目录
const buildOutput = resolve(projRoot, 'dist')
// 拼接包目录
const epOutput = resolve(buildOutput, 'cobyte-ui')

// 全量打包任务函数
export const buildFullEntry = async () => {
  const bundle = await rollup({
    input: resolve(epRoot, 'index.ts'), // 配置入口文件
    plugins: [
      // 配置插件
      VueMacros({
        plugins: {
          vue: vue(),
        },
      }),
      //  @rollup/plugin-node-resolve 插件默认是不认识 .ts 这些文件的，
      // 我们需要通过 extensions 选项进行手动配置，让它能识别相关文件。
      nodeResolve({
        extensions: ['.ts'],
      }),
      replace({
        'process.env.NODE_ENV': '"production"',
        // 这个选项用于防止在字符串后面紧跟一个等号时进行替换。可以用于避免错误的赋值操作
        preventAssignment: true,
      }),
      esbuild(),
    ],
    // 排除不进行打包的 npm 包，例如 Vue，以便减少包的体积
    external: ['vue'],
  })
  // 配置输出文件格式
  bundle.write({
    format: 'umd',
    file: resolve(epOutput, 'dist', 'index.full.js'),
    name: 'CobyteUI', // 将整个组件库要设置一个变量名称：`CobyteUI`
    globals: {
      vue: 'Vue', // 组件库中需要使用到的全局变量 Vue
    },
  })
}
buildFullEntry()
