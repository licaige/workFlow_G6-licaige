import * as path from 'path'
import fse from 'fs-extra'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
const version = require('./package.json').version
const cwd = process.cwd()
const isPro = process.env.NODE_ENV === 'production'

// 清空目标目录
fse.emptyDirSync(path.join(cwd, 'lib'))
fse.emptyDirSync(path.join(cwd, 'polyfill'))

// 通用插件
const commonPlugins = [
  resolve(),
  babel({
    babelHelpers: 'runtime',
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false
        }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-runtime'
    ]
  }),
  replace({
    preventAssignment: true,
    __MICRO_APP_VERSION__: version,
    __TEST__: 'false',
  })
]

// 通用配置
const baseConfig = {
  input: path.join(__dirname, 'src/index.ts'),
  external: [
    /@babel\/runtime/,
  ].filter(Boolean),
  plugins: commonPlugins.concat([
    typescript({
      tsconfig: path.join(__dirname, 'tsconfig.json'),
      // typescript: require('typescript'),
    }),
  ])
}

const esConfig = Object.assign({}, baseConfig, {
  output: [
    {
      file: path.join(__dirname, 'lib/index.esm.js'),
      format: 'es',
      sourcemap: true
    }
  ],
})

const cjsConfig = Object.assign({}, baseConfig, {
  output: [
    {
      file: path.join(__dirname, 'lib/index.min.js'),
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: path.join(__dirname, 'lib/index.umd.js'),
      format: 'umd',
      sourcemap: true,
      exports: 'named',
      name: 'microApp',
    }
  ],
  plugins: baseConfig.plugins.concat([
    terser({
      ecma: 5,
    }),
  ]),
})

// polyfill配置
const polyfillConfig = []
const polyfillFiles = fse.readdirSync('./src/polyfill')
polyfillFiles && polyfillFiles.forEach((file) => {
  if (/\.ts$/.test(file)) {
    const config = {
      input: path.join(__dirname, `src/polyfill/${file}`),
      output: {
        file: path.join(__dirname, `polyfill/${file.replace(/\.ts$/, '.js')}`),
        format: 'es',
        sourcemap: true,
      },
      plugins: commonPlugins.concat([
        typescript(),
      ])
    }
    if (/jsx-custom-event/.test(file)) {
      config.external = [/react/]
    }
    polyfillConfig.push(config)
  }
})

const baseConfigList = [esConfig]
if (isPro) {
  baseConfigList.push(cjsConfig)
}

export default baseConfigList.concat(polyfillConfig)
