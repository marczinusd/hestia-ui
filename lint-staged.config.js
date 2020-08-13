module.exports = {
  '*.json': ['eslint --fix', 'prettier --write'],
  '*.{ts,js}': ['eslint --fix', 'tslint --fix', 'prettier --write'],
  '*.{md,html,css,scss}': 'prettier --write'
};
