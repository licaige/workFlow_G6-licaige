// 1
// webpack plugin
// 1. 每个插件都是一个 class
// 2. 每个插件都有一个 apply 方法
// 3. apply 方法的参数是 compiler 实例，这样插件就能使用 compiler 和 原型链 上的所有属性和方法

// 2
// emit
// - emit是compiler的一个生命周期: 表示 输出 asset 到 output 目录之前执行
// - 回调参数：compilation

// 3
// tapAsync
// - 插件一共有3种注册方式: tap tapAsync tapPromise
// - 插件一共有3种调用方式: call callAsync callPromise，调用时机就是在 对应的 compiler 的生命周期中

const fs = require("fs");
const path = require("path");

class MyCleanWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "MyCleanWebpackPlugin",
      (compilation, callback) => {
        console.log("MyCleanWebpackPlugin is running");

        const outputOption = compilation.options.output;
        removeDir(outputOption.path); // 删除 webpack配置文件中的 output.path 对应的文件夹的所有内容
        callback();
      }
    );
  }
}

function removeDir(outputAbsolutePath) {
  // 文件夹路径存在
  if (fs.existsSync(outputAbsolutePath)) {
    // 读文件夹内容
    fs.readdirSync(outputAbsolutePath).forEach((file) => {
      const curPath = path.join(outputAbsolutePath, file); // output.path对应的文件夹中的 每个文件路径

      // 是文件夹，递归删除，即递归执行AA和BB
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDir(curPath);
      }
      // 是文件，AA.直接删除文件
      else {
        fs.unlinkSync(curPath);
      }
    });

    // BB.删除文件夹
    fs.rmdirSync(outputAbsolutePath);
  }
}

module.exports = {
  MyCleanWebpackPlugin,
};
