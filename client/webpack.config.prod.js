var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    homeApp: "./homeApp/",
    chatApp: "./chatApp/"
  },
  output: {
    path: path.join(__dirname,'../app/assets/webpack/'),
    filename: '[name].bundle.js',
  },
  plugins:[
    //new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.isProd': true
    })
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
