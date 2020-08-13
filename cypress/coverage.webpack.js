/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['babel-plugin-istanbul']
          }
        },
        enforce: 'post',
        include: [path.join(__dirname, '..', 'src', 'app')],
        exclude: [/\.(e2e|spec)\.ts$/, /node_modules/, /(ngfactory|ngstyle)\.js/]
      }
    ]
  }
};
