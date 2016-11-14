var path = require("path");

module.exports = {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "[name].js",
    chunkFilename: '[name].js'
};