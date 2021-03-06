module.exports = {
  '*.json': ['eslint --fix', 'prettier --write'],
  '*.{ts,js}': ['eslint --fix', 'prettier --write'],
  '*.html': ['eslint --fix', 'prettier --write'],
  '*.{md,css,scss}': 'prettier --write'
};
