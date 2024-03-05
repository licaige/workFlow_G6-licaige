const path = require('path')
const filePath = require('./filePath')
const runShell = require('./util').runShell
// 启动项目
function runChild () {
  Object.keys(filePath).forEach(item => {
    const childPath = filePath[item]

    runShell(`cd ${childPath} && npm start`)
  });

  console.log('start success, open browser now');
  runShell(`node ${path.join(__dirname, './openBrowser.js')}`)
}

runChild()
