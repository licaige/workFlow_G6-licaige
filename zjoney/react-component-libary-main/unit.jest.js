module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',//运行测试的环境
    setupFiles: ['./tests/setup.js'],
    testMatch: ['**/unit/**/*.(spec|test).(js|ts|jsx|tsx)'],
    collectCoverage: true,// 收集覆盖率
    collectCoverageFrom: [
      'components/**/*.(js|ts|jsx|tsx)',
      '!components/**/*.stories.(js|ts|jsx|tsx)',
      '!components/**/*.(spec|test).(js|ts|jsx|tsx)',
    ],
  };