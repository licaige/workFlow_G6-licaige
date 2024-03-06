#! /usr/bin/env node
import { Command } from 'commander' // 命令行自定义指令
const program = new Command()
import ora from 'ora' // 控制台 loading 样式
import inquirer from 'inquirer' // 命令行询问用户问题，记录回答结果
import chalk from 'chalk' // 控制台输出内容样式美化
import figlet from 'figlet' // 控制台打印 logo
import gitPullOrClone from 'git-pull-or-clone'
import path from 'path'
import fs from 'fs-extra' // 引入fs-extra
import { templates } from './templates.js'
// git命令函数
import { executeGitCommand } from './gitUtil.js'
const fontOptions = {
  horizontalLayout: 'full', // 'default', 'full', 'fitted', 'controlled smushing', 'universal smushing'.
  verticalLayout: 'full', // 'default', 'full', 'fitted', 'controlled smushing', 'universal smushing'.
  width: 80,
  whitespaceBreak: true
}
// check version
const logo = chalk.cyan(figlet.textSync('Amazing CLI', fontOptions))
import packageInfo from '../package.json' assert { type: 'json' }
program.version(`${logo}\n${packageInfo.version}`,  '-V, --version', 'output the current version')
// create project
program
  .command('create [projectName]')
  .description('Create & init project')
  .option('-t, --template <template>', '模版名称')
  .action(async (projectName, options) => {
    // 1. 从模版列表中找到对应的模版
    let project = templates.find(template => template.name === options.template)
    // 2. 如果匹配到模版就赋值，没有匹配到就是undefined
    let projectTemplate = project ? project.value : undefined
    if (!projectName) { // 用户没有传入名称就交互式输入
      const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Project name:',
        default: 'vue-project'
      })
      projectName = name // 赋值输入的项目名称
    }
    if (!projectTemplate) { // 用户没有传入模版就交互式输入
      const { template } = await inquirer.prompt({
        type: 'list',
        name: 'template',
        message: 'Template name:',
        choices: templates // 模版列表
      })
      projectTemplate = template // 赋值选择的项目对应的地址
    }
    const dest = path.join(process.cwd(), projectName)
    // 判断文件夹是否存在，存在就交互询问用户是否覆盖
    if (fs.existsSync(dest)) {
      const { force } = await inquirer.prompt({
        type: 'confirm',
        name: 'force',
        message: `Target directory "${projectName}" is not empty. Remove existing files and continue?`
      })
      // 如果覆盖就删除文件夹继续往下执行，否的话就退出进程
      force ? fs.removeSync(dest) : process.exit(1)
    }
    // 下载loading
    const downloading = ora(`Downloading Template: ${projectTemplate}... 🚗🚗🚗`)
    downloading.start()
    // 下载模版
    gitPullOrClone(projectTemplate, dest, (err) => {
      if (err) {
        downloading.fail(`Download template ${chalk.red.bold('fail')} 😫😫😫`) // 失败
        console.log()
        console.error(err) // 打印错误信息
      } else {
        downloading.succeed(`Download template ${chalk.green.bold('success')} 😝😝😝`) // 成功
        console.log(`\nDone. Now run:\n`)
        console.log(chalk.green.bold(`   cd ${projectName}`))
        console.log(chalk.green.bold('   pnpm i'))
        console.log(chalk.green.bold('   pnpm dev'))
        console.log()
      }
    })
  })
// clear directory
program
  .command('delete [projectNameDir]')
  .description('Clear the target directory')
  .action(async (projectName, options) => {
    const dest = path.join(process.cwd(), projectName)
    // 判断文件夹是否存在，存在就交互询问用户是否覆盖
    if (fs.existsSync(dest)) {
      const { force } = await inquirer.prompt({
        type: 'confirm',
        name: 'force',
        message: `Are you sure you want to delete the "${chalk.green.bold(projectName)}" directory？`
      })
      // 如果覆盖就删除文件夹继续往下执行，否的话就退出进程
      force ? fs.removeSync(dest) : process.exit(1)
      console.log(`The "${chalk.green.bold(projectName)}" directory has been deleted successfully 😎😎😎`)
    } else {
      console.log(`The "${chalk.green.bold(projectName)}" directory does not exist 😢😢😢`)
    }
  })
// git pull
const template = 'template'
program
  .command('pull')
  .option('-cb, --currentBranch <currentBranch>', '当前项目分支')
  .option('-tb, --templateBranch <templateBranch>', '模版项目分支')
  .helpOption('-h, --help', 'display help for command')
  .description('拉取远程模版指定分支 (例如: master) 到当前项目指定分支 (例如: template)')
  .action(async ({ currentBranch, templateBranch }) => {
    // 交互式选择模板，获取对应链接
    const { templateLink } = await inquirer.prompt({
      type: 'list',
      name: 'templateLink',
      message: 'Template name:',
      choices: templates // 模版列表
    })
    if (!currentBranch) { // 交互式获取当前项目分支
      const { cb } = await inquirer.prompt({
        type: 'input',
        name: 'cb',
        message: '请输入当前项目分支(current branch):',
        default: 'master'
      })
      currentBranch = cb
    }
    if (!templateBranch) { // 交互式获取模版项目分支
      const { tb } = await inquirer.prompt({
        type: 'input',
        name: 'tb',
        message: '请输入模版项目分支(template branch):',
        default: 'main'
      })
      templateBranch = tb
    }
    console.log(`${chalk.magenta.bold('❄︎')} Current project's branch: ${chalk.green.bold(currentBranch)}`)
    console.log(`${chalk.magenta.bold('❄︎')} Template project's branch: ${chalk.green.bold(templateBranch)}`)
    const fetchLoading = ora('Fetching remote template... 🚗🚗🚗')
    fetchLoading.start()
    // 拉取远程模板指定分支内容到本地
    executeGitCommand('git fetch').then(() => {
      fetchLoading.succeed(`Fetch template ${chalk.green.bold('success')} 😝😝😝`)
      const gitLoading = ora('Let it be...')
      gitLoading.start()
      executeGitCommand(`git checkout ${currentBranch}`).then(() => {
        gitLoading.succeed(`成功切换到分支: ${chalk.green.bold(currentBranch)}`)
        deleteTemplateBranch(templateLink, currentBranch, templateBranch, gitLoading)
      }).catch(err => {
        pullLoading.fail(`Fetch template ${chalk.green.bold('fail')} 😫😫😫`)
        console.log()
        console.error(err) // 打印错误信息
      })
    })
  })
const deleteTemplateBranch = (templateLink, currentBranch, templateBranch, gitLoading) => {
  // 查看本地是否存在 template 分支
  executeGitCommand(`git branch --list ${template}`).then(res => {
    if (res) { // template 分支已存在
      gitLoading.warn(`local branch ${chalk.green.bold(template)} already exist 😢😢😢`)
      // 强制删除 template 分支
      executeGitCommand(`git branch -D ${template}`).then(() => {
        gitLoading.succeed(`成功删除本地分支: ${chalk.green.bold(template)} 😝😝😝`)
      }).catch(err => {
        gitLoading.fail(`删除本地分支失败: ${chalk.green.bold(template)} 😫😫😫`)
        console.log()
        console.error(err) // 打印错误信息
      })
      // 查看远程是否存在 template 分支
      executeGitCommand(`git branch -r --list ${template}`).then(res => {
        if (res) { // template 分支已存在
          // 强制删除远程分支
          executeGitCommand(`git push origin -D ${template}`).then(() => {
            gitLoading.succeed(`成功删除远程分支: ${chalk.green.bold(template)} 😝😝😝`)
          }).catch(err => {
            gitLoading.fail(`删除远程分支失败: ${chalk.green.bold(template)} 😫😫😫`)
            console.log()
            console.error(err) // 打印错误信息
          }).finally(() => {
            // 创建并切换分支
            createPullFunc({ template, templateLink, templateBranch }, gitLoading)
          })
        } else {
          gitLoading.warn(`remote branch ${chalk.green.bold(template)} does not exist 😎😎😎`)
          // 创建并切换分支
          createPullFunc({ template, templateLink, templateBranch }, gitLoading)
        }
      })
    } else {
      gitLoading.warn(`local branch ${chalk.green.bold(template)} does not exist 😎😎😎`)
      // 创建并切换分支
      createPullFunc({ template, templateLink, templateBranch }, gitLoading)
    }
  })
}
const createPullFunc = (params, gitLoading) => {
  const { template, templateLink, templateBranch } = params
  // 创建并切换到分支
  executeGitCommand(`git checkout -b ${template}`).then(() => {
    gitLoading.succeed(`成功创建分支: ${chalk.green.bold(template)} 😝😝😝`)
  })
  .catch(() => {
    gitLoading.fail(`创建分支失败: ${chalk.green.bold(template)} 😫😫😫`)
  })
  // 拉取模版分支
  executeGitCommand(`git pull ${templateLink} ${templateBranch}`).then((res) => {
    console.log('res', res)
    gitLoading.succeed(`成功拉取远程模版: ${chalk.green.bold(templateLink)} 分支: ${chalk.green.bold(templateBranch)} 😝😝😝`)
    // 合并
    executeGitCommand(`git merge ${templateLink}/${templateBranch}`)
      .then(() => {
        gitLoading.succeed(`远程模版合并${template}分支成功！🚀🚀`)
      })
      .catch(() => {
      //   gitLoading.fail(`远程模版合并${template}分支失败！😭😭
      //   git merge ${templateLink}/master
      //   `)
        // console.log(`合并代码可能有冲突，请手动处理冲突，并提交到${template} 分支`)
      })
      .finally(() => {
        // executeGitCommand(`git merge --abort`)
        executeGitCommand(`git add .`).then(() => {
          // executeGitCommand(`git commit -am 'feat(function): add template'`)
          executeGitCommand(`git push --force origin ${template}`)
          gitLoading.fail(
            `如果合并不成功，可能因为代码冲突导致，请手动合并代码，提交到${template} 分支`
          )
          gitLoading.fail(` 代码示例如下：
          git add .
          git commit -am 'feat(function): add template'
          git push --set-upstream origin ${template}
          `)
        })
      })
  })
  .catch((err) => {
    gitLoading.fail(`拉取远程模版失败: ${chalk.green.bold(templateLink)} 分支: ${chalk.green.bold(templateBranch)} 😫😫😫`)
    console.log()
    console.error(err) // 打印错误信息
  })
  gitLoading.stop()
}
program.on('--help', () => {}) // 添加--help
program.parse(process.argv)
