const { Simulator } = require('../Simulator');
const { createAdminBrowser } = require('./createAdminBrowser');
const { store } = require('../store');
const { configStore } = require('../config');
const { checkURL } = require('./checkURL');
const { Logger } = require('../Logger');
const {
  initSimulatorSettingsListeners,
  initAppManagementListeners,
  initSimulatorClientEventListeners,
  initSimulatorLampixListeners,
  handleAdminUIReady,
  sendSettingsBack
} = require('./ipc');
const {
  UPDATE_SIMULATOR_LIST,
  UPDATE_URL_LIST,
  ERROR,
  APP_CONFIG
} = require('../ipcEvents');

const logSimulatorNotFound = (url) => Logger.info(`Simulator for ${url} not found. Doing nothing.`);

class Admin {
  constructor() {
    this.storedURLs = new Set(store.get('urls') || []);
    this.config = configStore.store;
    this.simulators = {};
    this.browser = createAdminBrowser(() => {
      this.browser = null;
    });

    handleAdminUIReady.call(
      this,
      initSimulatorSettingsListeners,
      initAppManagementListeners,
      initSimulatorClientEventListeners,
      initSimulatorLampixListeners,
      this.updateRendererURLs
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
      this.browser.webContents.send(ERROR, error);
      return;
    }

    Logger.info('Creating new simulator...');

    const onClosed = () => {
      delete this.simulators[url];
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

    const options = process.env.NODE_ENV === 'development' ? { extraHeaders: 'pragma: no-cache\n' } : {};

    Logger.info(`Loading app at ${url}`);
    this.simulators[url].browser.loadURL(`${url}?url=${url}`, options);

    this.updateURLListOrder(url);
    this.sendSimulators();
    this.updateRendererURLs();
  }

  async closeSimulator(url) {
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

  sendConfig() {
    this.browser.webContents.send(APP_CONFIG, this.config);
  }

  switchToApp(toClose, toOpen) {
    this.closeSimulator(toClose);
    this.loadApp(toOpen);
  }

  updateNameURLAssociation({ name, url }) {
    configStore.set(`simulator.appSwitcher.nameToURLAssociations.${name}`, url);
    this.config.simulator.appSwitcher.nameToURLAssociations[name] = url;
  }

  removeNameURLAssociation(name) {
    configStore.delete(`simulator.appSwitcher.nameToURLAssociations.${name}`);
    delete this.config.simulator.appSwitcher.nameToURLAssociations[name];
  }
}

exports.Admin = Admin;
