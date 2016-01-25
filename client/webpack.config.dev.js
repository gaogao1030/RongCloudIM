var path = require('path');
var webpack = require('webpack');
var host = "http://localhost:3000"

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    homeApp:[
    `webpack-hot-middleware/client?path=${host}/__webpack_hmr`,
    './homeApp/'],
    chatApp: [
      `webpack-hot-middleware/client?path=${host}/__webpack_hmr`,
      './chatApp/'],
  },
  output:  {
    path: path.join(__dirname,'../app/assets/webpack'),
    filename: '[name].bundle.js',
    publicPath: `${host}/`
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.isDev': true
    })
  ],
  module: {
    perLoaders: [{
      test:/\.js$/,
      include: __dirname,
      loader: 'jshint-loader'
    }],
    loaders: [{
      test:/\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    },{
      test: /\.scss?$/,
      loaders: ['style','css','sass'],
      include: __dirname
    }]
  },
  jshint: { "esnext": true }
}
