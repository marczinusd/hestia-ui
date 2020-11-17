module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/src/test.ts', '<rootDir>/cypress/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/app/fakes/*.ts',
    '!<rootDir>/src/app/**/*.module.ts',
    '!<rootDir>/src/app/**/*chart.component.ts',
    '!<rootDir>/src/app/**/*mock.ts',
    '!<rootDir>/src/app/**/*interceptor.ts',
    '!<rootDir>/src/app/**/*cell-renderer.component.ts',
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
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      diagnostics: {
        ignoreCodes: [151001]
      }
    }
  },
  moduleNameMapper: {
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
    '@modules/(.*)': '<rootDir>/src/app/modules/$1'
  }
};
