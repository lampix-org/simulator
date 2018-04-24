const electron = require('electron');
const noop = require('lodash.noop');
const mainDisplayCenterCoords = require('../utils/mainDisplayCenterCoords');
const {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH
} = require('../constants');

const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;

const newWindow = ({
  width = DEFAULT_WINDOW_WIDTH,
  height = DEFAULT_WINDOW_HEIGHT,
  options = {},
  onClosed = noop
} = {}) => {
  const { x, y } = mainDisplayCenterCoords(width, height);

  const windowOptions = Object.assign(options, {
    width,
    height,
    x,
    y,
    useContentSize: true
  });

  const window = new BrowserWindow(windowOptions);

  // Emitted when the window is closed.
  window.once('closed', () => onClosed());

  return window;
};

exports.newWindow = newWindow;
