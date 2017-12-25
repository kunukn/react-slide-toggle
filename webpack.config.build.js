const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const createVariants = require('parallel-webpack').createVariants;

const entry = './src/library/ReactSlideToggle';
const name = 'ReactSlideToggle';

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/demo/index.html',
    filename: 'index.html',
    inject: 'body',
  }),
  new ExtractTextPlugin({ filename: '[name].bundle.css', allChunks: true }),
];

// plugins.push(
//   new webpack.LoaderOptionsPlugin({ minimize: true, debug: false })
// );
// plugins.push(
//   new webpack.optimize.UglifyJsPlugin({
//     minimize: true,
//     compress: {
//       warnings: false,
//       screw_ie8: true,
//       conditionals: true,
//       unused: true,
//       comparisons: true,
//       sequences: true,
//       dead_code: true,
//       evaluate: true,
//       if_return: true,
//       join_vars: true,
//     },
//     output: {
//       comments: false,
//     },
//   })
// );

function createConfig(options) {
  return {
    entry: {
      app: [entry],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: name + '.' + options.target + '.js',
      library: name,
      libraryTarget: options.target,
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
      extensions: ['.js', '.jsx'],
    },
    externals: {
      "react": "React",
      "react-dom": "ReactDOM",
      "prop-types": "PropTypes",
    }
  };
}

module.exports = createVariants(
  {
    target: ['var', 'commonjs2', 'umd']
  },
  createConfig
);
