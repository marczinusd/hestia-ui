module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/src/test.ts', '<rootDir>/cypress/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/app/fakes/*.ts',
    '!<rootDir>/src/app/**/*.module.ts',
    '!<rootDir>/node_modules/',
    '!**/*.d.ts'
  ],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules'],
  coverageReporters: ['json', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      lines: 90
    }
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      diagnostics: {
        ignoreCodes: [151001]
      }
    }
  }
};
