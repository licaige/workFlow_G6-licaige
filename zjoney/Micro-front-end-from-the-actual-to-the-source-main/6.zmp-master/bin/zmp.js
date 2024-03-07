#!/usr/bin/env node
//引入commander用来处理命令行参数和选项  --help
const program = require('commander');
const pkg = require('../package.json');
const cli = require('../cli');
//设置当前的脚手架版本号
program.
version(pkg.version,'-v,--version')
.usage('<command> [options]');
program.command('init')
   .description('创建项目')
   .option('-t, --template [template]','JSON数据 HTTP的地址或者是文件的相对或绝对路径')
   .action((options)=>{
     cli.exec('init',options);
   })
program.command('dev')
   .description('启动开发服务器')
   .option('-t, --template [template]','JSON数据 HTTP的地址或者是文件的相对或绝对路径')
   .action((options)=>{
     cli.exec('dev',options);
   })
program.parse(process.argv);