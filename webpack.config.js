const path = require('node:path');

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },

  target: 'node',
  devtool: 'inline-source-map',
};
