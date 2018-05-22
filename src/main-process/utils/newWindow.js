const electron = require('electron');
const noop = require('lodash.noop');
const path = require('path');
const mainDisplayCenterCoords = require('../utils/mainDisplayCenterCoords');
const {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH
} = require('../constants');
const { isDev } = require('./envCheck');

const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;

let lampixLogo = null;

if (isDev) {
  const { nativeImage } = electron;
  const pathToLogo = path.resolve(__dirname, '../../../', 'resources', 'icon.png');
  lampixLogo = nativeImage.createFromPath(pathToLogo);
}

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
    icon: isDev ? lampixLogo : undefined,
    useContentSize: true
  });
  const window = new BrowserWindow(windowOptions);

  // Emitted when the window is closed.
  window.once('closed', () => onClosed());

  return window;
};

exports.newWindow = newWindow;
