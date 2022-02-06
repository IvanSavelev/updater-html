const path = require('path');

module.exports = {
  entry: './src/script2.js',
  mode: "production",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    //library: 'myApp'
  },
};
