const childProcess = require('child_process')
const path = require('path')

const filePath = {
  vue2: path.join(__dirname, '../vue2'),
  vue3: path.join(__dirname, '../vue3'),
  react15: path.join(__dirname, '../react15'),
  react16: path.join(__dirname, '../react16'),
  main: path.join(__dirname, '../main')
}
// cd 子应用的目录 npm start 启动项目
function runChild () {
  Object.values(filePath).forEach(item => {
    childProcess.spawn(`cd ${item} && npm start`, { stdio: "inherit", shell: true })
  })
}
runChild()
