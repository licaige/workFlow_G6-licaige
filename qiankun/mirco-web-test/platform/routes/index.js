var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync
const root = path.join(__dirname, '../version')
const initVersion = '1.0.0.0'
/* GET home page. */
router.get('/start', function(req, res, next) {
  const name = req.query.name
  const changeUrl = path.join(root, name)
  const originPath = path.join(__dirname, '../../', name)
  const originDist = path.join(originPath, '/dist')

  let version
  let newVersion
  // 处理版本号
  function changeVersion () {
    try{
      version = fs.readFileSync(changeUrl).toString()
      version = +(version.replace(/\./g, '')) + 1
      newVersion = `${version}`.split('').join('.')
      fs.writeFileSync(changeUrl, newVersion)
    } catch (e) {
      fs.writeFileSync(changeUrl, initVersion)
      changeVersion()
    }
  }
  // 发布打包
  function startBuild() {
    const bagPath = path.join(__dirname, '../bag')

    // 清空当前项目下所有资源
    execSync(`rm -rf ${bagPath}/${name}`)

    // 首先创建项目目录
    execSync(`mkdir ${bagPath}/${name}`)

    try{
      // 进入项目并执行打包
      execSync(`cd ${originPath} && npm run build`)
    } catch (e) {}

    // 重新创建新的资源包
    execSync(`cd ${bagPath} && mkdir -p ./${name}/${newVersion}`)

    const lastDist = path.join(bagPath, `./${name}/${newVersion}`)

    try {
      execSync(`mv ${originDist} ${lastDist}`)
    } catch (e) {}
  }

  changeVersion()
  startBuild()

  res.send({
    version: newVersion,
  })
});

module.exports = router;
