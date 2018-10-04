const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.base');
const vendors = require('./vendors.json');

require('dotenv').config();

const cwd = process.cwd();

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = baseConfig({
  target: 'electron-renderer',
  entry: {
    vendor: vendors
  },
  output: {
    filename: '[name].js',
    path: path.join(cwd, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: Object.assign({
                minimize: true
              }, process.env.CSS_MODULES_ENABLED ? {
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
                camelCase: true
              } : {}),
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css'
    }),
    // Extract vendor code to own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js',
      minChunks: Infinity
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    }),
    // Extract app code to own file
    new HtmlWebpackPlugin({
      template: path.join(cwd, 'src', 'renderer', 'index.html')
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: process.env.DEBUG_PROD || 'false'
    })
  ]
});
