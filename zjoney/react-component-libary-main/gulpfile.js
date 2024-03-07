const gulp = require('gulp');//定义执行任务
const path = require('path');//处理路径
const rimraf = require('rimraf');//删除跑路的 rm -rf
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const merge2 = require('merge2');//Promise.all
const {compilerOptions} = require('./tsconfig.json');

const tsConfig = {
    noUnusedParameters: true,//不能有未使用的参数
    noUnusedLocals: true,//不能有未使用的本地变量
    strictNullChecks: true,//严格的Null检查 
    target: 'es6',//编译 的目标
    jsx: 'react',//jsx如何处理preserve 保留不处理  react变成React.createElement()
    moduleResolution: 'node',//模块的查找规则 node
    declaration: true,//生成声明文件 d.ts
    allowSyntheticDefaultImports: true,//允许 默认导入
    ...compilerOptions,
}
const babelConfig = require('./babel.config');
//准备好要编译 的文件
//glob 文件匹配模板，类似于正则
const source = [
    'components/**/*.{js,ts,jsx,tsx}',
    '!components/**/*.stories.{js,ts,jsx,tsx}',
    '!components/**/e2e/*',
    '!components/**/unit/*',
];
//C:\aproject\antd\components
const base = path.join(process.cwd(), 'components');
function getProjectPath(filePath) {
  return path.join(process.cwd(), filePath);
}
//C:\aproject\antd\lib
const libDir = getProjectPath('lib');
//C:\aproject\antd\es
const esDir = getProjectPath('es');
/**
 * 执行编译 
 * @param {*} modules 是否要转换模块
 */
function compile(modules) {
    const targeDir = modules===false?esDir:libDir;
    rimraf.sync(targeDir);//删除老的内容 rm -rf 
    //把文件匹配模式传给gulp,gulp会按这个模式把文件匹配了出来
    //ts转译后会生成二个流，一个流是JS一个流是类型声明d.ts
    const {js,dts} = gulp.src(source,{base}).pipe(ts(tsConfig));
    const dtsStream = dts.pipe(gulp.dest(targeDir));
    let jsStream = js;
    if(modules){//如果要转成ES5，就用babel进行转义
        jsStream=js.pipe(babel(babelConfig));
    }
    jsStream=jsStream.pipe(gulp.dest(targeDir));
    return merge2([jsStream,dtsStream]);
}
gulp.task('compile-with-es',(done)=>{
    console.log('compile to es');
    compile(false).on('finish',done);
});
gulp.task('compile-with-lib',(done)=>{
    console.log('compile to js');
    compile().on('finish',done);
});
// 最后把它们合起来 compile-with-es是编译es6、compile-with-lib是编译es5
gulp.task('compile',gulp.parallel('compile-with-es','compile-with-lib'));