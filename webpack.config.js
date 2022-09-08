const path = require('path');

const scriptNormal = {
  entry: {
    vendor: './src/bundlePoint.js',
  },
  mode: "production",
  output: {
    filename: 'uploader-html.js',
    path: path.resolve(__dirname, 'public'),
  },
  optimization: {
    minimize: false,
  },
}

const scriptBabelAndOptimize = {
  entry: {
    vendor: './src/bundlePoint.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  mode: "production",
  output: {
    filename: 'uploader-html.min.js',
    path: path.resolve(__dirname, 'public'),
  },
  optimization: {
    minimize: true,
  },
}

module.exports = [scriptNormal,  scriptBabelAndOptimize];
