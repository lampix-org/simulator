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
  entry: {
    main: path.join(cwd, 'src', 'main', 'main.js'),
    'preload-simulator': path.resolve(cwd, 'src/main/simulator/preload.js'),
    'preload-admin': path.resolve(cwd, 'src/main/Admin/preload.js')
  },
  output: {
    path: path.join(cwd, 'dist'),
    filename: '[name].js'
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
      NODE_ENV: 'production'
    })
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to the values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  }
};
