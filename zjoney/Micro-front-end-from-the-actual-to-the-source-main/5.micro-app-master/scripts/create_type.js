'use strict'
/* eslint-disable no-console */

const path = require('path')
const dts = require('dts-bundle')
const chalk = require('chalk')
const fse = require('fs-extra')
const fs = require('fs')

const cwd = process.cwd()

const pkg = require(path.join(cwd, 'package.json'))

const typingsDir = 'typings' // typings目录地址

const outPath = path.join(cwd, 'lib/index.d.ts') // 输出目录

// 判断是否是文件夹
function isDirectory (dir) {
  try {
    const stat = fs.statSync(dir)
    return stat.isDirectory()
  } catch (e) {
    return false
  }
}

// 添加Reference依赖
function addReference (target) {
  try {
    if (fs.statSync(target).isFile() && path.extname(target) === '.ts') {
      const preSource = fs.readFileSync(outPath)
      fs.writeFileSync(outPath, `/// <reference path="../${target}" />\n${preSource}`)
    } else if (isDirectory(target)) {
      const sources = fs.readdirSync(target) || []
      for (let i = 0; i < sources.length; i++) {
        addReference(path.join(target, sources[i]))
      }
    }
  } catch (e) {
    console.log(chalk.red('add references failed'), e)
  }
}

function createDts () {
  try {
    dts.bundle({
      main: path.join(cwd, 'lib', 'lib/index.d.ts'), // 入口地址
      name: pkg.name, // 声明模块
      removeSource: true, // 删除源文件
      out: outPath, // 合并后输出地址
    })
    fse.removeSync(path.join(cwd, 'lib', 'lib/'))
    if (isDirectory(typingsDir)) {
      addReference(typingsDir)
    }
  } catch (e) {
    console.log(
      chalk.red('生成*.d.ts文件失败'),
    )
    throw e
  }
}

createDts()
