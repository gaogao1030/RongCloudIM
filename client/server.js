(function() {
  var app, compiler, config, express, port, webpack, webpackDevMiddleware, webpackHotMiddleware;
  webpack = require('webpack');
  webpackDevMiddleware = require('webpack-dev-middleware');
  webpackHotMiddleware = require('webpack-hot-middleware');
  config = require('./webpack.config.dev');
  express = new require('express');
  app = new express;
  port = 4000;
  compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
  //app.get("/", function(req, res) {
  //  return res.sendFile(__dirname + '/index.html');
  //});
  app.listen(port, "0.0.0.0", function(error) {
    if (error) {
      return console.error(error);
    } else {
      console.info("host: %s.", this.address().address);
      return console.info("listening on port %s.", port);
    }
  });
}).call(this);
