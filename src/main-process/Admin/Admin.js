const { Simulator } = require('../Simulator');
const { Logger } = require('../Logger');
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

const logSimulatorNotFound = (url) => Logger.info(`Simulator for ${url} not found. Doing nothing.`);

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
    Logger.info(`Admin.loadApp called with URL: ${url}`);

    if (this.simulators[url]) {
      return;
    }

    const { success, error } = await checkURL(url);

    if (!success) {
      Logger.error(`URL check failed with message: ${error}`);
      Logger.error('Aborting app loading...');
      this.browser.webContents.send(INVALID_URL, error);
      return;
    }

    Logger.info('Creating new simulator...');

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

    Logger.info(`Loading app at ${url}`);
    this.simulators[url].browser.loadURL(`${url}?url=${url}`, options);

    this.updateURLListOrder(url);
    this.sendSimulators();
    this.updateRendererURLs();
  }

  closeSimulator(url) {
    Logger.info(`Attempting to close simulator for ${url}...`);
    if (this.simulators[url]) {
      Logger.info('Simulator found. Closing... ');
      this.simulators[url].browser.close();
      return;
    }

    logSimulatorNotFound(url);
  }

  focusSimulator(url) {
    Logger.info(`Attempting to focus simulator for ${url}...`);
    if (this.simulators[url]) {
      Logger.info('Simulator found. Focusing... ');
      this.simulators[url].browser.focus();
      return;
    }

    logSimulatorNotFound(url);
  }

  openDevTools(url) {
    Logger.info(`Attempting to open dev tools for ${url}...`);
    if (this.simulators[url]) {
      Logger.info('Simulator found. Opening dev tools');
      this.simulators[url].browser.webContents.openDevTools();
      return;
    }

    logSimulatorNotFound(url);
  }

  sendSimulators() {
    // Check to see that the main admin window wasn't the one closed
    // If it was, then updating simulators is not necessary since the whole program closes
    if (this.browser) {
      Logger.info('Sending simulator list to renderer...');
      this.browser.webContents.send(UPDATE_SIMULATOR_LIST, this.simulators);
    } else {
      Logger.info('Application closing. Will not send simulator list.');
    }
  }

  updateRendererURLs() {
    this.browser.webContents.send(UPDATE_URL_LIST, [...this.storedURLs]);
  }

  updateURLListOrder(newFirstURL) {
    const newList = ([...this.storedURLs]).filter((url) => url !== newFirstURL);
    newList.unshift(newFirstURL);

    store.set('urls', newList);
    this.storedURLs = new Set(newList);
  }
}

exports.Admin = Admin;
