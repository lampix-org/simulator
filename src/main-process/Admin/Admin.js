const { app } = require('electron');
const newWindow = require('../utils/newWindow');
const noop = require('lodash.noop');

class Admin {
  constructor(url) {
    this.appBrowser = null;

    this.browser = newWindow({
      onClose: () => app.quit()
    });
    this.browser.loadURL(url);
  }

  loadApp(url, cb = noop) {
    if (!this.appBrowser) {
      this.appBrowser = newWindow({
        options: {
          resizable: false
        }
      });

      this.appBrowser.on('closed', () => {
        this.appBrowser = null;
      });
    }

    this.appBrowser.loadURL(url);
    cb(null);
  }

  showDevTools(cb = noop) {
    this.browser.webContents.openDevTools();
    cb(null);
  }
}

module.exports = Admin;
