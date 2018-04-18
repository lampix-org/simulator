const { app } = require('electron');
const path = require('path');

module.exports = () => {
  const { browserWindowManager } = require('../BrowserWindowManager');
  const browser = browserWindowManager.newWindow({
    id: 'admin',
    onClosed: () => app.quit(),
    options: {
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    }
  });

  return browser;
};
