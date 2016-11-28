var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server',
    './app/client/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + './../dist'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style!css"
    }]
  },
  // resolve: {
  //   extensions: ['', '.js', '.jsx']
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: './app/client/'
  }
};
