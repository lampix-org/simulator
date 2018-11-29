/**
 * Webpack config for production electron main process
 */

const webpack = require('webpack');
const path = require('path');
const pkg = require('../package.json');

const cwd = process.cwd();

module.exports = {
  mode: 'production',
  target: 'electron-main',
  entry: {
    main: path.join(cwd, 'src', 'main', 'main.js'),
    'preload-simulation': path.resolve(cwd, 'src/main/simulator/preload-simulation.js'),
    'preload-simulation-window': path.resolve(cwd, 'src/main/simulator/preload-simulation-window.js'),
    'preload-admin': path.resolve(cwd, 'src/main/Admin/preload.js')
  },
  output: {
    path: path.join(cwd, 'dist'),
    filename: '[name].js'
  },
  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to the values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      VERSION: pkg.version,
      NODE_ENV: 'production',
      DEBUG_PROD: process.env.DEBUG_PROD || 'false'
    })
  ]
};
