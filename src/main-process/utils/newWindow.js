const electron = require('electron');
const noop = require('lodash.noop');
const mainDisplayCenterCoords = require('../utils/mainDisplayCenterCoords');
const {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH
} = require('../constants');

const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;

module.exports = ({
  width = DEFAULT_WINDOW_WIDTH,
  height = DEFAULT_WINDOW_HEIGHT,
  options = {},
  onClose = noop
} = {}) => {
  const { x, y } = mainDisplayCenterCoords(width, height);

  const windowOptions = Object.assign(options, {
    width,
    height,
    x,
    y
  });

  let window = new BrowserWindow(windowOptions);

  // Emitted when the window is closed.
  window.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null;
    onClose();
  });

  return window;
};
