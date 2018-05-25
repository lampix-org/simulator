const { app } = require('electron');
const path = require('path');
const noop = require('lodash.noop');
const { isDev, isDebuggingProd } = require('../utils/envCheck');

const devToolsEnabled = isDev || isDebuggingProd;
const preloadName = isDev ? 'preload.js' : 'preload-admin.js';

exports.createAdminBrowser = (onClosed = noop) => {
  const { newWindow } = require('../utils/newWindow');
  const browser = newWindow({
    onClosed: () => {
      onClosed();
      app.quit();
    },
    options: {
      webPreferences: {
        preload: path.join(__dirname, preloadName),
        devTools: devToolsEnabled
      }
    }
  });

  return browser;
};
