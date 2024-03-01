var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')

const versionDir = path.join(__dirname, '../version');
const initVersion = '1.0.0.0';
/* GET home page. */
router.get('/', function(req, res, next) {
  const name = req.query.name;
  // 确认要更新的版本号 每一个应用独立一个文件管理版本
  // 创建一个文件， 默认的版本号

  // 创建一个当前应用的路径
  const currentUrl = path.join(versionDir, name);
  let newVersion = '';
  try {
    const originVersion = fs.readFileSync(currentUrl).toString().replace(/\n/g, '')
    newVersion = originVersion.replace(/\.(\d+)$/, (a, b) => `.${+b + 1}`)
    fs.writeFileSync(currentUrl, newVersion);
  } catch (e) {
    fs.writeFileSync(currentUrl, initVersion);
  }

  // 构建 打包 发布
  const originPath = path.join(__dirname, '../../../', name);
  const originDist = path.join(originPath, 'dist');
  const bagPath = path.join(__dirname, '../bag')
  // 通过运行打包命令来创建对应的打包产物
  // 最大包的数量 > 10 删除最先生成的那个包
  try{
    childProcess.execSync(`cd ${originPath} && npm i && npm run build`);

    childProcess.execSync(`cd ${bagPath} && mkdir -p ./${name}/${newVersion}`);

    const lastDist = path.join(bagPath, `./${name}/${newVersion}`);
    childProcess.execSync(`mv ${originDist}/* ${lastDist}`)
  } catch (e) {
    console.log(e);
  }
  console.log(originPath)

  res.send({
    version: newVersion
  });
});

module.exports = router;
