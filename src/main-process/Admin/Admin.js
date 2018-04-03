const noop = require('lodash.noop');
const newWindow = require('../utils/newWindow');

class Admin {
  constructor() {
    this.appBrowser = null;
  }

  loadApp(url) {
    return new Promise((resolve) => {
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
      resolve();
    });
  }

  showDevTools(cb = noop) {
    this.browser.webContents.openDevTools();
    cb(null);
  }
}

module.exports = new Admin();
