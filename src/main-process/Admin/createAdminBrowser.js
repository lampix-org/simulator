const { app } = require('electron');
const path = require('path');

exports.createAdminBrowser = () => {
  const { newWindow } = require('../utils/newWindow');
  const browser = newWindow({
    onClosed: () => app.quit(),
    options: {
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    }
  });

  return browser;
};
