const webpack = require("webpack");
const path = require('path');

module.exports = {
  entry: './example/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env']
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      { 
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    hot: true,
    port: 9000
  }
};
