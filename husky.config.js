module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'pre-push': 'npm run ng lint && npm run test:coverage',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
};
