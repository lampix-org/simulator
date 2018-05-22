/**
 * Webpack config for production electron main process
 */

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const cwd = process.cwd();

module.exports = {
  devtool: 'source-map',
  target: 'electron-main',
  entry: path.join(cwd, 'src', 'main-process', 'main.js'),
  output: {
    path: cwd,
    filename: './dist/main.prod.js'
  },
  plugins: [
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: process.env.DEBUG_PROD || 'false'
    })
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  }
};
