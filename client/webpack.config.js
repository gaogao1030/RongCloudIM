var path = require('path');
var webpack = require('webpack');
var host = "http://gaoyh.corp.cimu.com:4000"

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    home:[
    `webpack-hot-middleware/client?path=${host}/__webpack_hmr`,
    './app/startup/home.js']
  },
  output:  {
    path: path.join(__dirname,'../app/assets/webpack'),
    filename: '[name].bundle.js',
    publicPath: `${host}/`
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
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
  }
}
