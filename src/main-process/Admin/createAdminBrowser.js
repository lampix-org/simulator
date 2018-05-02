const { app } = require('electron');
const path = require('path');
const noop = require('lodash.noop');

exports.createAdminBrowser = (onClosed = noop) => {
  const { newWindow } = require('../utils/newWindow');
  const browser = newWindow({
    onClosed: () => {
      onClosed();
      app.quit();
    },
    options: {
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    }
  });

  return browser;
};
