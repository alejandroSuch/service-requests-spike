var path = require("path");

module.exports = {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: '[name].js'
};