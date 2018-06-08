const path = require("path");
const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const createVariants = require("parallel-webpack").createVariants;

const entry = "./src/library/ReactSlideToggle";
const name = "ReactSlideToggle";

const plugins = [
  new CleanWebpackPlugin("dist", {})

  // new HtmlWebpackPlugin({
  //   template: './src/demo/index.html',
  //   filename: 'index.html',
  //   inject: 'body',
  // }),
  // new ExtractTextPlugin({ filename: '[name].bundle.css', allChunks: true }),
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
      app: [entry]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: `${name}.${options.target}.js`,
      library: name,
      libraryTarget: options.target,
      publicPath: "/"
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: false
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: false
              }
            }
          ],
          exclude: [/node_modules/]
        }
      ]
    },
    plugins,
    resolve: {
      extensions: [".js", ".jsx"]
    },
    externals: {
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
      // 'react-dom': 'ReactDOM',
      // 'prop-types': 'PropTypes',
    }
  };
}

module.exports = (env = {}, argv = { mode: "production" }) => {
  console.log("***", argv.mode, "***");
  console.log(env);

  return createVariants(
    {
      target: ["umd"]
      // target: ['var', 'commonjs2', 'umd']
    },
    createConfig
  );
};
