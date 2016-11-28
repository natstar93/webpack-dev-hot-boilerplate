var express = require('express');
var webpack = require('webpack');
var app = express();
var path = require('path');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var historyApiFallback = require('connect-history-api-fallback');
var config = require('../../webpack/webpack.config.js');

var isDev = true;

app.use(historyApiFallback({
  verbose: false
}));

if (isDev) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    // publicPath: config.output.publicPath,
    contentBase: '../../client/',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/', function response(req, res, err) {
    if (err) {
      console.log(err);
    }
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../../index.html')));
    res.end();
  });
};

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

app.use(express.static(path.join(__dirname, '../..'))); // Path to root dir otherwise it won't find bundle

app.listen(3000, function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Example app listening on port 3000!')
});
