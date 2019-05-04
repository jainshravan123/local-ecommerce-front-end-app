let webpack = require('webpack')
let path = require('path')

let APP_DIR = path.resolve(__dirname, './src/client')
let BUILD_DIR = path.resolve(__dirname, './dist')

const config = {
  entry: APP_DIR + '/index.js',
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = config
