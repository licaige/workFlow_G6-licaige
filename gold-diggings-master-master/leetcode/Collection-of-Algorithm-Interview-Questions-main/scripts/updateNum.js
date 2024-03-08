const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

fs.readdir(path.resolve(__dirname, '../src/leetcode_100'), 'utf-8', (err, fileList) => {
  if (err) throw err;
  const doc = path.resolve(__dirname, '../README.md');
  fs.readFile(doc, 'utf-8', (err, content) => {
    if (err) throw err;
    const updateContent = content.replace(/目前更新题目数量`(\d+)`道/, (_, $1) => {
      return `目前更新题目数量\`${fileList.length}\`道`;
    });
    fs.writeFile(doc, updateContent, (err, _) => {
      if (err) throw err;
      console.log(chalk.bgGreen(chalk.black('[INFO]更新完毕')));
    });
  });
});
