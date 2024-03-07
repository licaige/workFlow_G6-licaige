module.exports = {
    verbose: true, // 响应过程
    testEnvironment: 'jest-environment-puppeteer',
    setupFiles: ['./tests/setup.js'],// 初始化的文件
    preset: 'jest-puppeteer',// 预设
    testMatch: ['**/e2e/**/*.(spec|test).(j|t)sx'],// 匹配文件规则
  };