const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const entry = "./src/demo/index.js";
const name = "app";

const IsWebpackDevServer = /webpack-dev-server/.test(
  process.env.npm_lifecycle_script
);

module.exports = (env = {}, argv = { mode: "development" }) => {
  console.log("***", argv.mode, "***");
  console.log(env);

  const plugins = [
    new HtmlWebpackPlugin({
      template: "./src/demo/index.html",
      filename: "index.html",
      inject: "body"
    }),
  ];

  return {
    entry: {
      app: [entry]
    },
    devServer: {
      open: true,
      contentBase: "./",
      noInfo: true,
      port: 3399,
      compress: false,
      inline: true
      // hot: true,
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      chunkFilename: "[id].chunk.js",
      libraryTarget: "umd",
      library: "app"
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
          exclude: [/node_modules/],
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins,
    resolve: {
      extensions: [".js", ".jsx", "scss"],
      alias: {
        library: path.resolve(__dirname, "src/library"),
        "react-slide-toggle": path.resolve(__dirname, "src/library/index.js")
      }
    },
    externals: {}
  };
};
