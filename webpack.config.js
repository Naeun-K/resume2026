const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",

  entry: "./scripts/main.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    // Webpack이 출력하는 이미지 등의 asset 경로
    assetModuleFilename: "images/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
