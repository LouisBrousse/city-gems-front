module.exports = {
    preset: '@nuxt/test-utils',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'vue', 'json'],
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
    collectCoverage: true,
    coverageReporters: ['html', 'text-summary'],
  }
  