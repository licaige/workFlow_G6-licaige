const fs = require("fs");
const filePath = require('./filePath')
const runShellSync = require('./util').runShellSync

const isForce = process.argv[2]

if (isForce) {
  cleanNodeModules()
}

Object.keys(filePath).forEach(item => {
  hasNodeModules(filePath[item])
})

function cleanNodeModules() {
  Object.keys(filePath).forEach(item => {
    runShellSync(`rm -rf ${filePath[item]}/node_modules`)
  })
}

function hasNodeModules(path) {
  const isExit = fs.readdirSync(path).includes('node_modules')
  if (!isExit) {
    runShellSync(`cd ${path} && npm install`)
  }
}

