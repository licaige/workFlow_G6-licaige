module.exports = {
    presets: [
        '@babel/preset-react',//把React编译 成ES5
        [
          '@babel/preset-env',//把ES6编译 成ES5
          {
            modules: 'auto',
            targets: {//编译 兼容的目标
              browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
            },
          },
        ],
      ],
      plugins: [
        [//支持typescript 
          '@babel/plugin-transform-typescript',
          {
            isTSX: true,
          },
        ],
        //提取一些编译运行时帮助方法
        ['@babel/plugin-transform-runtime'],
      ],
}