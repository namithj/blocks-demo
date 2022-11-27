const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
  entry: [
    './source/chapter-7/main.js',
    './source/dynamic/main.js',
  ]
};
