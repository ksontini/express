// jest.config.js
const { defaults } = require('jest-config')
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  testEnvironment: 'node',
  testTimeout: 1000,
  reporters: [
    'default',
    'jest-junit'
  ]
}
