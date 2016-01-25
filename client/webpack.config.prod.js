var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    homeApp: "./homeApp/",
    chatApp: "./chatApp/"
  },
  output: {
    path: path.join(__dirname,'../app/assets/webpack/'),
    filename: '[name].bundle.js',
  },
  plugins:[
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.isProd': true
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
      loaders: ['css','sass'],
      include: __dirname
    }]
  },
  jshint: { "esnext": true }
}
