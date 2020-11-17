module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'pre-push': 'npm run ng lint && npm run test:coverage && npm run e2e:ci:quiet',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
};
