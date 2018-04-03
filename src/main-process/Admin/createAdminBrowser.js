const { app } = require('electron');
const path = require('path');

module.exports = () => {
  const newWindow = require('../utils/newWindow'); // eslint-disable-line
  const browser = newWindow({
    onClose: () => app.quit(),
    options: {
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    }
  });

  return browser;
};
