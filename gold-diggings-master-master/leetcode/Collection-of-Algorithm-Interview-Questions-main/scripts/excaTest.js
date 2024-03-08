const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer.prompt([{
  type: 'number',
  name: 'serial',
  message: '请选择测试题目序号',
  validate: function(answer) {
    // 判断是否是数字类型
    if (!/\d+/.test(answer)) {
      return '请输入数字！';
    }
    return true;
  }
}, {
  type: 'input',
  name: 'params',
  message: '请输入测试题目的参数',
  filter: function(input, answers) {
    console.log(input, answers);
  }
}])
.then(answers => {
  // console.log(answers);
})
.catch(err => {
  console.log(chalk.red('发生错误，请提交issue解决:', err))
});
