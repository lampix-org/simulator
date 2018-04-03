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

  showDevTools() {
    return new Promise((resolve) => {
      this.appBrowser.webContents.openDevTools();
      resolve();
    });
  }
}

module.exports = new Admin();
