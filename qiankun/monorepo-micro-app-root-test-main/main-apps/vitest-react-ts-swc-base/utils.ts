import fs from 'fs';
import path from 'path';
// import packageConfig from '../../package.json';

// process.cwd() 方法返回的是 Node.js 进程的当前工作目录(即，当前脚本的工作目录的路径)，通常是package.json 文件所在目录，因为包含 process.cwd() 的脚本是在 package.json 中读取执行的
const appDir = fs.realpathSync(process.cwd());

const resolve = (_path: string) => path.resolve(appDir, _path); // 获取绝对路径
/**__dirname 返回的是当前模块的目录名称，即：被执行的 JavaScript 文件所在目录路径
 * __dirname 是官方文档在 Globals 里的全局变量，但实际上 __dirname 是每个模块内部的，并不是真正意义上的全局变量
 **/
const join = (dir: any, tier: string = '..') => path.join(__dirname, tier, dir); // 连接路径
const pathRelative = (_dir: any, _path: string) => path.posix.join(_dir, _path); // 兼容性相对路径

const pathRewrite = (localUrl: string, remoteUrl: string) =>
	path.replace(new RegExp(localUrl.replace('/', '\\/'), 'g'), remoteUrl);
// {
//   const assetsSubDirectory = process.env.NODE_ENV === 'production'
//     ? envConfig.build.assetsSubDirectory
//     : envConfig.dev.assetsSubDirectory
//   console.log("pathRelative:", _path, envConfig.build.assetsSubDirectory)
//   return path.posix.join(assetsSubDirectory, _path)
// }

// rootDir: path.join(__dirname, '../../'),
const arrFilterEmpty = (arr: any[]) => arr.filter(x => !!x);
// sassResourceItems: [],

export { resolve, join, pathRelative, pathRewrite, arrFilterEmpty };
