
const axios = require('axios');
const {createSpinner} = require('nanospinner');
const git = require('git-promise');
const fs = require('fs-extra');
const path = require('path');
class Init{
  templates={}
  async checkTemplate(url){
    const {data} = await axios.get(url);
    return data;
  }  
  async setup(options){
    if(typeof options.template  === 'string'){
        const templates = await this.checkTemplate(options.template);
        if(templates){
            this.templates = templates;
        }
    }
    await this.selectTemplate(this.templates);
  }
  async selectTemplate(templates){
    const inquirer = (await import('inquirer')).default;
    const answers = await inquirer.prompt([
        {
            type:'input',
            name:'name',
            message:'请输入项目名',
            default:function(){
                return 'zmp-project';
            }
        },
        {
            type:'list',
            name:'template',
            message:'请选择模板',
            choices:Object.keys(templates)
        }
    ])
    const gitRepo = this.templates[answers.template];
    await this.downloadRepo(gitRepo,answers.name);
  }
  async downloadRepo(repoPath,localPath){
    const spinner = createSpinner();
    spinner.start({text:'downloading\n'});
    await git(`clone ${repoPath} ./${localPath}`);
    spinner.success({
        text:`cd ${localPath} & npm install & npm run dev`
    });
  }
}
module.exports = new Init();