const args = require('minimist')(process.argv.slice(2)) // 解析命令行参数
const path = require('path')

const target = args._[0] || 'reactivity'
const format = args.f || 'global'
// 打包的入口路径
const entry = path.resolve(__dirname, `../packages/${target}/src/index.ts`)
// 打包成 iife 的名字
const packageName = require(path.resolve(__dirname, `../packages/${target}/package.json`)).buildOptions?.name

// iife 自执行
// cjs commonjs 规范
// esm es6Module

// 输出的格式
const outputFormat = format.startsWith('global') ? 'iife': format === 'cjs' ? 'cjs' : 'esm'
// 打包的路径
const outfile = path.resolve(__dirname,  `../packages/${target}/dist/${target}.${format}.js`)

const { build } = require('esbuild')
const { resolve } = require('path')

build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    sourcemap: true,
    format: outputFormat,
    globalName: packageName,
    platform: format === 'cjs' ? 'node' : 'browser',
    watch: {
        onRebuild(error) {
            if(!error) {
                console.log('rebuilt ~~~')
            }
        }
    }
}).then(() => {
    console.log('watching ~~~')
})