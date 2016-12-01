var path = require("path");

module.exports = {
  path: path.resolve(__dirname, "../build"),
  publicPath: "/",
  filename: "[name].[chunkhash].js",
  chunkFilename: '[name].[chunkhash].js'
};