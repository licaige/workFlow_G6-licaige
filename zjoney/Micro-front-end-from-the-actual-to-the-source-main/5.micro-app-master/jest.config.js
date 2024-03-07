// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover',
    'html'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'ts',
    'tsx'
  ],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  testPathIgnorePatterns: [
    '/dev/',
    '/scripts/',
  ],
  coveragePathIgnorePatterns: [
    '/scripts/',
    '/__tests__/',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  rootDir: __dirname,
  testMatch: [
    '<rootDir>/src/__tests__/**/*.test.[jt]s?(x)'
  ],
  globals: {
    __DEV__: true,
    __TEST__: true,
    'ts-jest': {
      tsconfig: {
        target: 'es5',
        noUnusedLocals: true,
        strictNullChecks: true,
        noUnusedParameters: true,
        experimentalDecorators: true,
        allowSyntheticDefaultImports: true,
      }
    }
  }
}
