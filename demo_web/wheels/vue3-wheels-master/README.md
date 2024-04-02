# Vue3 UI 

## 运行步骤

1. 运行 npm
2. 运行 npm run dev
3. 打开 http://127.0.0.1:3000

## 官网打包步骤
1. 运行 npm
2. 运行 npm run build
3. 得到的 dist 目录就是官网源代码
4. 编辑并运行 sh deploy.sh 就可以上传到 Github 或码云等支持 Pages 功能的平台

## 库文件打包步骤

1. 运行 rollup -c
2. 得到的 dist/lib 目录就是编译后的库文件所在目录