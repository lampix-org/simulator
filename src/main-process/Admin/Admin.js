const { browserWindowManager } = require('../BrowserWindowManager');

class Admin {
  constructor() {
    // TODO Network API: Generate unique names to handle multiple apps loaded at once
    // Return app name instead of window, or an object with both for convenience
    // That would allow one app to send a message to another via its ID
    this.appBrowserName = 'simulated-app';
  }

  loadApp(url) {
    const { windows } = browserWindowManager;
    if (!windows[this.appBrowserName]) {
      browserWindowManager.newWindow({
        name: this.appBrowserName,
        options: {
          resizable: false
        }
      });
    }

    windows[this.appBrowserName].loadURL(url);
  }

  showDevTools() {
    browserWindowManager.windows[this.appBrowserName].webContents.openDevTools();
  }
}

exports.Admin = Admin;
