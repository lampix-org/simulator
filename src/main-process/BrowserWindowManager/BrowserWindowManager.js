const electron = require('electron');
const noop = require('lodash.noop');
const mainDisplayCenterCoords = require('../utils/mainDisplayCenterCoords');
const {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH
} = require('../constants');

const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;

class BrowserWindowManager {
  constructor() {
    this.windows = {};
  }

  newWindow({
    name = Math.random().toString(36).slice(2),
    width = DEFAULT_WINDOW_WIDTH,
    height = DEFAULT_WINDOW_HEIGHT,
    options = {},
    onClosed = noop
  } = {}) {
    const { x, y } = mainDisplayCenterCoords(width, height);

    const windowOptions = Object.assign(options, {
      width,
      height,
      x,
      y,
      useContentSize: true
    });

    const window = new BrowserWindow(windowOptions);
    this.windows[name] = window;

    // Emitted when the window is closed.
    window.once('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      delete this.windows[name];
      onClosed();
    });

    return window;
  }
}

exports.BrowserWindowManager = BrowserWindowManager;
