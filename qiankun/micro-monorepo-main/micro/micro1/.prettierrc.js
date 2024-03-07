module.exports = {
  // 一行最多 120 字符
  printWidth: 120,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 行尾不要有分号
  semi: false,
  //  使用单引号而不是双引号
  singleQuote: true,
  // jsx文件内容使用单引号
  jsxSingleQuote: true,
  // 设置在 Markdown 文件中，Prettier 不应该折行
  proseWrap: 'never',
  plugins: [
    // 自动整理和优化 import 语句
    require.resolve('prettier-plugin-organize-imports'),
    // 格式化 package.json 文件
    require.resolve('prettier-plugin-packagejson'),
  ],
  // 允许为特定文件指定不同的配置
  overrides: [
    {
      files: '*.md',
      options: {
        // 不会更改 Markdown 文件中的折行行为
        proseWrap: 'preserve',
      },
    },
  ],
}
