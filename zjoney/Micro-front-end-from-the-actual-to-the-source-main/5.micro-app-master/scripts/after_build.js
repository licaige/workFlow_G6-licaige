/* eslint-disable no-console */
const path = require('path')
const fs = require('fs')
const gzipSize = require('gzip-size')
const prettyBytes = require('pretty-bytes')
const chalk = require('chalk')

const minifile = path.join(__dirname, '../lib/index.min.js')

console.log(chalk.bold('lib/index.min.js:'))
console.log(
  chalk.bold(
    '文件体积: ' + prettyBytes(fs.statSync(minifile).size)
  )
)

console.log(
  chalk.bold(
    'gzip体积: ' + prettyBytes(gzipSize.fileSync(minifile))
  )
)
