const path = require("path");
const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const createVariants = require("parallel-webpack").createVariants;

const entry = "./src/library/ReactSlideToggle";
const name = "ReactSlideToggle";

const plugins = [
  new CleanWebpackPlugin("dist", {})
];

function createConfig(options) {
  return {
    optimization: {
      minimize: false
    },
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
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            }
          ]
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
          exclude: [/node_modules/],
        }
      ]
    },
    plugins,
    resolve: {
      extensions: [".js", ".jsx", "scss"],
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

  return createVariants(
    {
      target: ["umd"]
      // target: ['var', 'commonjs2', 'umd']
    },
    createConfig
  );
};
