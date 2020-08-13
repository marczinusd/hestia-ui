/* eslint-disable @typescript-eslint/no-var-requires */
const isWindows = require('is-windows')();

module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
  'report-dir': './e2e-coverage',
  include: ['src/**/*.ts'],
  exclude: ['coverage/**', 'cypress/**', '**/*.spec.ts', 'src/app/fakes/*.ts'],
  all: !isWindows
};
