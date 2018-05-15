const electron = require('electron');
const noop = require('lodash.noop');
const path = require('path');
const mainDisplayCenterCoords = require('../utils/mainDisplayCenterCoords');
const {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH
} = require('../constants');

const { app } = electron;

const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;

const { nativeImage } = electron;
const appPath = process.env.NODE_ENV === 'production' ? app.getAppPath() : __dirname;
const pathToLogo = path.join(appPath, '../', '../', '/img', 'logo.png');
const lampixLogo = nativeImage.createFromPath(pathToLogo);

const newWindow = ({
  width = DEFAULT_WINDOW_WIDTH,
  height = DEFAULT_WINDOW_HEIGHT,
  options = {},
  onClosed = noop,
  icon = lampixLogo
} = {}) => {
  const { x, y } = mainDisplayCenterCoords(width, height);

  const windowOptions = Object.assign(options, {
    width,
    height,
    x,
    y,
    icon,
    useContentSize: true
  });
  const window = new BrowserWindow(windowOptions);

  // Emitted when the window is closed.
  window.once('closed', () => onClosed());

  return window;
};

exports.newWindow = newWindow;
