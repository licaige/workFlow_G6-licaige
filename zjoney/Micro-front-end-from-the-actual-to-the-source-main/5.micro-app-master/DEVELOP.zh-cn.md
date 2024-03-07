# 开发指南

### 下载并运行
```bash
git clone https://github.com/micro-zoe/micro-app.git

cd micro-app

// 安装项目以及demo的依赖
yarn bootstrap 

// 运行
yarn start
```

默认基座应用是`main-react16`，启动的子应用为：react16、react17、vue2、vue3、angular11、vite。

如果要切换到基座应用`main-vue2`，运行命令：

```bash
yarn start:main-vue2
```

### 单独运行
`yarn start`默认会同时启动8个应用，这可能会导致系统卡顿，建议单独运行某些应用，以获取更好的开发体验。

1、启动主程序
```
yarn build:watch
```

2、进入基座应用并启动
```
cd dev/main-react16/

yarn start
```

3、进入某个子应用并启动
```
cd dev/children/react16

yarn start
```

如果要启动更多的子应用，可以继续进入它们的目录并启动。
