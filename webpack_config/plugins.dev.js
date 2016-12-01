var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var environmentConstants = require('./env.dev.js');

module.exports = [
  new ExtractTextPlugin("styles.css"),
  new webpack.DefinePlugin({ 'process.env': environmentConstants }),
  new webpack.optimize.CommonsChunkPlugin({ name: "vendor", minChunks: Infinity }),
  new ManifestPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new HtmlWebpackPlugin({
    template: './index.ejs',
    filename: 'index.html',
    basePath: '/'
  })
]