
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  devtool: 'source-map',
  output: { path: path.resolve(__dirname, 'build'), filename: 'bundle.js' },
  resolve: {
        extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          loaders: ['babel']
      }
    ]
  },
  devServer: {
    contentBase: "./build",
    noInfo: true, //  --no-info option
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
