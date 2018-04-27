const { Simulator } = require('../Simulator');
const { initSimulatorSettingsListeners } = require('./ipc/initSimulatorSettingsListeners');
const { createAdminBrowser } = require('./createAdminBrowser');
const { UPDATE_SIMULATOR_LIST } = require('../ipcEvents');

const logSimulatorNotFound = (url) => console.log(`Simulator for ${url} not found. Doing nothing.`);

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

    this.simulators[url] = new Simulator(url, () => {
      delete this.simulators[url];
      delete global[`simulator-${url}`];
    });

    global[`simulator-${url}`] = this.simulators[url];

    const options = process.env.NODE_ENV === 'development' ? { extraHeaders: 'pragma: no-cache\n' } : {};

    console.log(`Loading app at ${url}`);
    this.simulators[url].browser.loadURL(url, options);

    this.sendSimulators();

    return this.simulators[url];
  }

  closeSimulator(url) {
    console.log(`Attempting to close simulator for ${url}...`);

    if (this.simulators[url]) {
      console.log('Simulator found. Closing... ');
      this.simulators[url].browser.close();
      delete this.simulators[url];
      return;
    }

    logSimulatorNotFound(url);
  }

  focusSimulator(url) {
    console.log(`Attempting to focus simulator for ${url}...`);

    if (this.simulators[url]) {
      console.log('Simulator found. Focusing... ');
      this.simulators[url].browser.focus();
      return;
    }

    logSimulatorNotFound(url);
  }

  sendSimulators() {
    console.log('Sending simulator list to renderer...');
    this.browser.webContents.send(UPDATE_SIMULATOR_LIST, this.simulators);
  }
}

exports.Admin = Admin;
