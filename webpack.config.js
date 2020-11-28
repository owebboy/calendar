const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");

const path = require("path");

module.exports = {
  entry: {
    main: "./src/app.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].main.js",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new HtmlMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
    },

  },
};
