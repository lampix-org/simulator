const path = require('path');
const { browserWindowManager } = require('../BrowserWindowManager');
const { Simulator } = require('../Simulator');

class Admin {
  constructor() {
    this.simulators = {};
  }

  loadApp(url) {
    console.log(`Admin.loadApp called with URL: ${url}`);

    const { windows } = browserWindowManager;

    let window = windows[url];

    if (!window) {
      console.log('Creating new window and simulator.');
      window = browserWindowManager.newWindow({
        name: url,
        options: {
          resizable: false,
          webPreferences: {
            preload: path.resolve(__dirname, '..', 'Simulator', 'preload.js'),
            nodeIntegration: false
          }
        }
      });

      this.simulators[url] = new Simulator(window, url);
      global[`simulator-${url}`] = this.simulators[url];
    }

    const options = process.env.NODE_ENV === 'development' ? { extraHeaders: 'pragma: no-cache\n' } : {};

    console.log(`Loading app at ${url}`);
    window.loadURL(url, options);

    return this.simulators[url];
  }
}

exports.Admin = Admin;
