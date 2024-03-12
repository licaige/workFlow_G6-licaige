
import { defineConfig } from 'vite'
import {getDependencieNames,getBaseNameOfHumpFormat} from "package-tls";
import pkg from "./package.json" assert {type: "json"};
import {dirname,relative,parse} from "node:path";
import {build} from "vite";
import {generate_d_ts,removePath} from "build-tls";
import {builtinModules} from "node:module"

// 手动配置
const entry = 'src/index.ts';   // 输入（入口）文件
//所需构建的模块格式
const formats_ExcludeDep = ['es', 'umd'];  //要排除依赖包的模块格式
const formats_IncludeDep = ['iife'];  //要包含依赖包的模块格式
const generateDts = true;  // 是否生成 TypeScript 的类型声明文件
const singleDts = false;   // 是否要将声明汇总成一个单独的文件

/**
 * 将声明汇总成一个文件的选项
 * @type {import("build-tls").DtsBundle|boolean}
 */
 const dtsBundle = {
    entry:entry,
    umdModuleName:pkgName,
    // inlineDeclareGlobal:true,
    // inlineDeclareExternals:true,
};
/**
 * 是否要拷贝项目中已存在的类型声明文件.d.ts 到输出目录中
 * 可通过指定为 false 来禁止拷贝
 */
 const copyDTS = {
    exclude:["vite-env.d.ts"], //需要排除的文件或目录
};


/**
 * 可通过在 ssh 环境中设置 `debug=true` 来在调试模式下构建代码；如：`debug=true npm run build`
 * 在调试模式下：
 * - 会开启 sourcemap
 * - 会关闭最小化混淆代码
 */



// 自动配置
const pkgName = getBaseNameOfHumpFormat(pkg.name);  //驼峰格式的 pkg.name
const srcDir = dirname(entry);   //源代码根目录
const outDir = pkg.main ? dirname(pkg.main || pkg.module) : "dist";    //输出目录
const dtsFile =  pkg.types || pkg.typings;  //类型声明文件的路径
const dtsDir = dtsFile ?  dirname(dtsFile) : outDir;  //类型声明文件的输出目录

const excludedDepTyps_Exclude = ["dependencies","optionalDependencies","peerDependencies"];  // 排除依赖包模块格式所需要排除的依赖的类型
const excludedDepTypes_Include = ["peerDependencies"];  // 包含依赖包模块格式所需要排除的依赖的类型

const nodeBuiltinModules = [/^node:/,...builtinModules];   //node 的内置模块，一般需要排除；
const excludedDep_Exclude = [...nodeBuiltinModules,...getDependencieNames(pkg,excludedDepTyps_Exclude)];   // 排除依赖包模块格式所需要排除的依赖
const excludedDep_Include = [...nodeBuiltinModules,...getDependencieNames(pkg,excludedDepTypes_Include)];   // 包含依赖包模块格式所需要排除的依赖



// 需要单独构建的 Worker 文件的配置选项
const workerFileBuildOptions = {
    entrys:[],  // worker 的入口文件
    outDir:srcDir, // worker 的输出目录
    emptyOutDir:false, // 每次执行时是否清空输出目录
    fileName:"[dir]/[name]", // 构建产物的文件名字，详见 buildFiles() 函数的 fileName 选项
    formats:["iife"],  // 构建产物的模块格式
    buildOrder:"before",  // 相对于主构建程序，是在其之前构建，还是在其之后构建，可用的值是 ： "before" 或 "前","after" 或 "后"
};



/**
 * @type {import("vite").UserConfig}
 */
const config = {
    build:{
        lib: {
            name:pkgName, 
            /**
             * https://rollupjs.org/guide/en/#input
             * @type `string | string [] | { [entryName: string]: string }`
             * 当指定多个入口文件时，最终的构建产物包含两类文件块：
             *  + 这些入口之间所共享的 代码块，称为 共享块
             *  + 每个入口文件对应一个单独的 文件块，称为入口块，入口块 中会引入 共享块。当 `input` 是数组 `string []` 类型时，入口块的名字 与入口文字的名字一个，当 `input` 是对象类型 `{ [entryName: string]: string }` 时，入口块的名字 是对应的 `entryName`。
             */
            entry: entry,
            formats:formats_ExcludeDep,
        },
        outDir:outDir,
        rollupOptions:{
            external:excludedDep_Exclude,
            /**
             * String 使用什么导出模式。默认为auto，它根据entry模块导出的内容猜测你的意图：
             * default – 如果你使用 export default ... 仅仅导出一个东西，那适合用这个
             * named – 如果你导出多个东西，适合用这个
             * none – 如果你不导出任何内容 (例如，你正在构建应用程序，而不是库)，则适合用这个
             */
            // exports:"auto", 
        }
    }
};






/**
 * 导出最终的配置
 */
 export default defineConfig(async (options)=>{
    const {mode,command} = options;
    if (process.env.debug === "true"){  // 是否在调试模式下构建代码
        config.build.minify = false;
        config.build.sourcemap = true;
    }
    if (command !== "build") return config;
    const isBunch = mode === "bunch";
    
    config.build.emptyOutDir = false;  // 防止把先生成的文件（比如：类型声明文件）给清除了
    await removePath(outDir);  // 手动清除输出目录

    if ( ["after","后"].includes(workerFileBuildOptions.buildOrder)){
        buildFiles(workerFileBuildOptions);
    }else{
        await buildFiles(workerFileBuildOptions);
    }

    if (generateDts){
        const excludedDepTypes =  isBunch ? excludedDepTypes_Include : excludedDepTyps_Exclude;
        const allDepTyps = ["dependencies","optionalDependencies","peerDependencies"];
        const inlinedDepTypes = allDepTyps.filter(dType=>!excludedDepTypes.includes(dType));
        generate_d_ts(srcDir,dtsDir,{
            onExit:false,
            copyDTS:copyDTS,
            outFile: singleDts||isBunch ? dtsFile : null,
            dtsBundle:{
                externalInlines:[...getDependencieNames(pkg,inlinedDepTypes)],
                ...dtsBundle,
            }
        }).catch((err)=>{console.error(`${pkg.name}：generate_d_ts 生成.d.ts文件时出错!`)});
    }
    



    
    

    switch (mode) {
        case "bunch":{
            config.build.lib.formats = [...formats_ExcludeDep,...formats_IncludeDep];
            config.build.rollupOptions.external = excludedDep_Include;
            break;
        }
        default: {
            if (formats_IncludeDep.length>0){
                const inlineConfig = JSON.parse(JSON.stringify(config));
                inlineConfig.configFile = false; // 防止死循环：循环调用此函数
                inlineConfig.build.emptyOutDir = false; // 不清空输出目录
                inlineConfig.build.lib.formats = formats_IncludeDep;
                inlineConfig.build.rollupOptions.external = excludedDep_Include;
                build(inlineConfig); //单独进行构建
            }
        }
    }

    return config;
});






// ---------------- 工具 --------------------

/**
 * 构建文件
 * @param {{entrys:string[],outDir?:string,fileName?:string,formats?:string[],emptyOutDir?:boolean}} options 
 *    entrys:string[] - 入口文件列表，每个文件都会单独构建
 *    outDir?:string  - 构建的输出目录
 *    fileName?:string - 构建产物的文件名字（可以指定路径），
 *          [dir] 表示入口文件的路径；
 *          [format]：输出选项中定义的渲染格式。
 *          [name]：文件的文件名（不带扩展名）。
 *          [ext]: 文件的扩展名。
 *          [extname]：文件的扩展名，.如果它不为空，则为前缀。
 *          [assetExtname]: 文件的扩展名，.如果它不为空且不是 、 或 之一，则为js前缀。jsxtstsx
 *      formats?:string[] - 构建产物的模块格式
 *      emptyOutDir?:boolean - 是否要清空输出目录；当 outDir === srcDir 时，会强制设置为 false
 * @returns 构建完成的 Promise
 * 
 * 
 */
function buildFiles(options){
    const {entrys,outDir,formats} = options;
    if (!entrys?.length) return;
    
    let {fileName,emptyOutDir} = options;
    fileName = fileName || "[dir]/[name]";
    emptyOutDir = emptyOutDir ?? false;
    if (outDir === srcDir){
        emptyOutDir = false;
    }

   const buildProArr = entrys.map((entryFile,index)=>{
       const  relPath = relative(srcDir,entryFile);
       const fileInfo = parse(relPath);
       const dir = fileInfo.dir;
       const dirReg = dir ? /\[\s*dir\s*\]/g  : /\[\s*dir\s*\]\s*\//g;
       const finalFileName = fileName.replace(dirReg,dir);
       
       return  build({
           configFile:false,
           build:{
               emptyOutDir:index > 0 ? false : emptyOutDir,
               lib: {
                   name:getBaseNameOfHumpFormat(fileInfo.name),
                   formats:formats,
                   entry: entryFile,
                   fileName:finalFileName,
               },
               outDir:outDir,
           }
       });
   });
   
   return Promise.all(buildProArr);
}
