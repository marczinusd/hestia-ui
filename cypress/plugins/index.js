/* eslint-disable @typescript-eslint/no-var-requires */
const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');
const cypressCodeCoverageTask = require('@cypress/code-coverage/task');

module.exports = (on, config) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);
  cypressCodeCoverageTask(on, config);

  return config;
};
