/**
 * Webpack config for production electron main process
 */

const path = require('path');

const cwd = process.cwd();

module.exports = {
  mode: 'production',
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
