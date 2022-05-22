const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'module',
    },
  },
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  experiments: {
    outputModule: true,
  },
};
