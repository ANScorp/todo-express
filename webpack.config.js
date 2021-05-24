const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  entry: resolve(__dirname, 'src', 'index.js'),
  output: {
    publicPath: '/',
    path: resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],

  devtool: 'source-map',

  mode: ENV,

  optimization: {
    minimize: ENV === 'production',
  },

  devServer: {
    historyApiFallback: true,
    contentBase: resolve(__dirname, 'dist'),
    compress: false,
    port: 9000,
  },
};
