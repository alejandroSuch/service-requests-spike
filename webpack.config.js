var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");

var filter = process.argv.filter(function(it) { return /^\-\-env/.test(it); })[0];
var environment = 'prod';

if(!!filter) {
  environment = filter.split('=')[1];
}

var environmentPlugins = require('./plugins.' + environment + '.js');
var outputConfig = require('./output.' + environment + '.js');

module.exports = {
  entry: {
    app: ["./src/main.js"],
    vendor: [
      'angular', 'angular-formly', 'angular-messages', 'angular-ui-bootstrap', 'angular-ui-router', 
      'oclazyload', 'angular-formly-templates-bootstrap', 'redux', 'ng-redux', 'immutable'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['ng-annotate', 'babel?presets[]=es2015']
      },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract("css") 
      },
      {
        test: /\.html$/,
        loader: "html"
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=102400' 
      }
    ]
  },
  plugins: environmentPlugins,
  output: outputConfig
};