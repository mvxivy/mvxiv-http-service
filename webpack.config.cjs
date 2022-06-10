const path = require('path');

module.exports = {
  entry: './module.js',
  output: {
    filename: 'module.min.js',
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
