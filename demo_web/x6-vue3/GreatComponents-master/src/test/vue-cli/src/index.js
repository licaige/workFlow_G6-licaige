// 需要用到content.js里的函数，因此，index.html中引入的顺序不能改变
// doSomething()

// // 1. 工程化
// import doSomething from "./content"
// doSomething()

/**
 * 2. 解决无法识别import问题
 * 使用webpack包
 *  1) 生成package.json
 *     npm init -y
 *  2）下载webpack
 *     npm i webpack webpack-cli --save
 *  3）打包项目 生成dist文件夹，并在dist文件夹中生成main.js文件
 *     npx webpack ./index.js
 *  4）在dist目录中新建index.html，并将index.html中的内容复制过去
 *  5）配置webpack.config.js copy webpack管网，entry: './index.js'配置，运行时可以不用调npx webpack ./index.js
 *  6）使用npx webpack重新打包dist
 *  7）webpack.config.js配置mode: 'development'解决黄色提醒
 *  8）将开发文件放入src文件夹下，将webpack.config.js的entry改为./src/index.js
 *  9）在package.json中的scrips中添加"build": "webpack --mode production"，可以使用npm run build执行webpack
 *  10）使用file-loader来解决打包时不能识别png、jpg结尾文件的问题
 *  11）使用style-loader\css-loader解决不能识别css文件的问题
 *  11）使用vue-loader解决不能识别vue文件的问题
 *  11）使用babel处理高级js语法，如es6和解决不能识别vue文件的问题  
 *      npm i @babel/core babel-loader @babel/plugin-transform-runtime @babel/preset-env --save-dev
 *  12）安装vue
 *      npm i vue -S
 *  13）安装vue-loader
 *      npm i vue-loader vue-template-compiler -D
 *  14）在webpack.config.js中配置module-rules: babel-loader、vue-loader,plugin: vue-loader/lib/plugin
 *  15）在根目录建.babelrc文件，并配置
 *  16）写vue文件
*/

import imgSrc from './1.jpg'
import './index.css'
console.log(imgSrc)
let img = new Image()
img.src = imgSrc
img.classList.add('img')
document.body.appendChild(img)

import Vue from "vue";
import App from './components/app.vue'
var vm = new Vue({
  el: '#app',
  render: c => c(App)
})