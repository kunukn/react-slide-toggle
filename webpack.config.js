const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entry = './src/demo/index.js';
const name = 'app';

module.exports = (env = {}) => {

  console.log(env);

  const plugins = [
    new HtmlWebpackPlugin({
      template: './src/demo/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin({ filename: '[name].bundle.css', allChunks: true }),
  ];

  return {
    entry: {
      app: [entry],
    },
    devServer: {
      open: true,
      contentBase: './',
      noInfo: true,
      port: 3399,
      compress: false,
      inline: true,
      //hot: true,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
      libraryTarget: 'umd',
      library: 'app'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
          exclude: [/node_modules/],
        },
        {
          test: /\.(sass|scss)$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          exclude: [/node_modules/],
        },
      ],
    },
    plugins: plugins,
    resolve: {
      extensions: ['.js','.jsx'],
      alias: {
        'library': path.resolve(__dirname, 'src/library'),
        'react-slide-toggle': path.resolve(__dirname, 'src/library/index.js'),
      }
    },
    externals: {}
  };
};
