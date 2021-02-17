const webpack = require("webpack");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const DEFAULT_WEBPACK_INCLUDE_PATH = path.resolve(__dirname, "src");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.jsx?$/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]" }],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{ loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]" }],
      },
    ],
  },
  target: "electron-renderer",
  plugins: [
    new HTMLWebpackPlugin({ title: "Filecoin Wallet", template: "src/index.html" }),
    new MiniCSSExtractPlugin({
      filename: "bundle.css",
      chunkFilename: "[id].css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false,
  },
};
