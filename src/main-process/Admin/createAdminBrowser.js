const { app } = require('electron');
const path = require('path');

module.exports = () => {
  const { newWindow } = require('../utils/newWindow');
  const browser = newWindow({
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
