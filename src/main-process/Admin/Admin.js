const { Simulator } = require('../Simulator');
const {
  initSimulatorSettingsListeners,
  initAppManagementListeners,
  initSimulatorClientEventListeners,
  initSimulatorLampixListeners,
  handleAdminUIReady,
  sendSettingsBack
} = require('./ipc');
const { createAdminBrowser } = require('./createAdminBrowser');
const {
  UPDATE_SIMULATOR_LIST,
  UPDATE_URL_LIST,
  INVALID_URL
} = require('../ipcEvents');
const { store } = require('../store');
const { checkURL } = require('./checkURL');

const logSimulatorNotFound = (url) => console.log(`Simulator for ${url} not found. Doing nothing.`);

class Admin {
  constructor() {
    this.storedURLs = new Set(store.get('urls') || []);
    this.simulators = {};
    this.browser = createAdminBrowser(() => {
      this.browser = null;
    });

    handleAdminUIReady(
      initSimulatorSettingsListeners.bind(null, this.simulators),
      initAppManagementListeners.bind(null, this),
      initSimulatorClientEventListeners.bind(null, this.simulators),
      initSimulatorLampixListeners.bind(null, this.simulators),
      this.updateRendererURLs.bind(this)
    );
  }

  async loadApp(url) {
    console.log(`Admin.loadApp called with URL: ${url}`);

    if (this.simulators[url]) {
      return;
    }

    const { success, error } = await checkURL(url);

    if (!success) {
      console.log(`URL check failed with message: ${error}`);
      console.log('Aborting app loading...');
      this.browser.webContents.send(INVALID_URL, error);
      return;
    }

    console.log('Creating new simulator...');

    const onClosed = () => {
      delete this.simulators[url];
      delete global[`simulator-${url}`];
      this.sendSimulators();
    };

    const updateAdminUI = sendSettingsBack.bind(
      null,
      this.browser.webContents,
      url
    );

    this.simulators[url] = new Simulator(url, {
      onClosed,
      updateAdminUI
    });

    global[`simulator-${url}`] = this.simulators[url];

    const options = process.env.NODE_ENV === 'development' ? { extraHeaders: 'pragma: no-cache\n' } : {};

    console.log(`Loading app at ${url}`);
    this.simulators[url].browser.loadURL(`${url}?url=${url}`, options);

    this.storedURLs.add(url);
    store.set('urls', [...this.storedURLs]);

    this.sendSimulators();
    this.updateRendererURLs();
  }

  closeSimulator(url) {
    console.log(`Attempting to close simulator for ${url}...`);

    if (this.simulators[url]) {
      console.log('Simulator found. Closing... ');
      this.simulators[url].browser.close();
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

  openDevTools(url) {
    console.log(`Attempting to open dev tools for ${url}...`);

    if (this.simulators[url]) {
      console.log('Simulator found. Opening dev tools');
      this.simulators[url].browser.webContents.openDevTools();
      return;
    }

    logSimulatorNotFound(url);
  }

  sendSimulators() {
    // Check to see that the main admin window wasn't the one closed
    // If it was, then updating simulators is not necessary since the whole program closes
    if (this.browser) {
      console.log('Sending simulator list to renderer...');
      this.browser.webContents.send(UPDATE_SIMULATOR_LIST, this.simulators);
    } else {
      console.log('Application closing. Will not send simulator list.');
    }
  }

  updateRendererURLs() {
    this.browser.webContents.send(UPDATE_URL_LIST, [...this.storedURLs]);
  }
}

exports.Admin = Admin;
