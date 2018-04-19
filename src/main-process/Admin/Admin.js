const { Simulator } = require('../Simulator');
const { initSimulatorSettingsListeners } = require('./ipc/initSimulatorSettingsListeners');
const { createAdminBrowser } = require('./createAdminBrowser');
const { UPDATE_SIMULATOR_LIST } = require('../ipcEvents');

class Admin {
  constructor() {
    this.simulators = {};
    this.browser = createAdminBrowser();

    initSimulatorSettingsListeners();
  }

  loadApp(url) {
    console.log(`Admin.loadApp called with URL: ${url}`);

    if (this.simulators[url]) {
      return this.simulators[url];
    }

    console.log('Creating new simulator...');

    this.simulators[url] = new Simulator(url);
    global[`simulator-${url}`] = this.simulators[url];

    const options = process.env.NODE_ENV === 'development' ? { extraHeaders: 'pragma: no-cache\n' } : {};

    console.log(`Loading app at ${url}`);
    this.simulators[url].browser.loadURL(url, options);

    this.sendSimulators();

    return this.simulators[url];
  }

  sendSimulators() {
    console.log('Sending simulator list to renderer...');
    this.browser.webContents.send(UPDATE_SIMULATOR_LIST, this.simulators);
  }
}

exports.Admin = Admin;
