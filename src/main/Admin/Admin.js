const { simulator } = require('../simulator');

const { createAdminBrowser } = require('./createAdminBrowser');
const { store } = require('../store');
const { configStore } = require('../config');
const { checkURL } = require('./checkURL');
const { Logger } = require('../Logger');
const { isDev } = require('../utils/envCheck');
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

const errors = {
  appNotFound: 'Your app is no longer available... '
};

let simulatorPosition = 30;
const simulatorPositionStep = 15;

class Admin {
  constructor() {
    this.storedURLs = new Set(store.get('urls') || []);
    this.config = configStore.store;
    this.simulators = {};
    this.browser = createAdminBrowser(() => {
      this.browser = null;
    });

    this.browser.on('close', () => {
      this.browser.destroy();
    });

    handleAdminUIReady.call(
      this,
      this.updateRendererURLs,
      this.sendSimulators,
      initSimulatorSettingsListeners,
      initAppManagementListeners,
      initSimulatorClientEventListeners,
      initSimulatorLampixListeners
    );
  }

  async loadApp(urlOrName) {
    Logger.info(`Admin.loadApp called with URL / App Name: ${urlOrName}`);
    const associations = this.config.simulator.appSwitcher.nameToURLAssociations;
    const alias = (urlOrName in associations) ? urlOrName : null;
    const url = associations[alias] || urlOrName;

    if (this.simulators[url]) {
      return;
    }

    const {
      success,
      error,
      url: checkedURL
    } = await checkURL(url);

    if (!success) {
      Logger.error(`URL check failed with message: ${error}`);
      Logger.error('Aborting app loading...');
      this.browser.webContents.send(ERROR, error);
      return;
    }

    Logger.info('Creating new simulator...');

    const onClosed = () => {
      delete this.simulators[checkedURL];
      this.sendSimulators();
      simulatorPosition -= simulatorPositionStep;
    };
    const updateAdminUI = sendSettingsBack.bind(
      null,
      this.browser.webContents,
      checkedURL
    );

    this.simulators[checkedURL] = simulator(url, {
      store,
      configStore,
      isDev,
      onClosed,
      updateAdminUI
    });

    const options = isDev ? { extraHeaders: 'pragma: no-cache\n' } : {};

    Logger.info(`Loading app at ${checkedURL}`);
    simulatorPosition += simulatorPositionStep;
    this.simulators[checkedURL].window.setPosition(simulatorPosition, simulatorPosition, true);
    this.simulators[checkedURL].appBrowser.webContents.loadURL(`${checkedURL}?url=${checkedURL}`, options);
    this.updateURLListOrder(alias || url);
    this.sendSimulators();
    this.updateRendererURLs();
  }

  async closeSimulator(url) {
    Logger.info(`Attempting to close simulator for ${url}...`);
    if (this.simulators[url]) {
      Logger.info('Simulator found. Closing... ');
      this.simulators[url].window.close();
      return;
    }

    logSimulatorNotFound(url);
  }

  focusSimulator(url) {
    Logger.info(`Attempting to focus simulator for ${url}...`);
    if (this.simulators[url]) {
      Logger.info('Simulator found. Focusing... ');
      this.simulators[url].window.focus();
      return;
    }

    logSimulatorNotFound(url);
  }

  simulatorError(message) {
    Logger.info(errors[message]);
    this.browser.webContents.send(ERROR, errors[message]);
    this.browser.focus();
  }

  openDevTools(url) {
    Logger.info(`Attempting to open dev tools for ${url}...`);
    if (this.simulators[url]) {
      Logger.info('Simulator found. Opening dev tools');
      this.simulators[url].appBrowser.webContents.openDevTools();
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

  updateScaleFactor(value) {
    const parsedValue = parseFloat(value);
    configStore.set('simulator.coordinateConversion.scaleFactor', parsedValue);
    this.config.simulator.coordinateConversion.scaleFactor = parsedValue;
  }

  updatePix(pixObject) {
    configStore.set('pix', pixObject);
    this.config.pix = pixObject;
  }

  updateUserDefinedClasses(userDefinedClasses) {
    configStore.set('userDefinedClasses', userDefinedClasses);
    this.config.userDefinedClasses = userDefinedClasses;
  }
}

exports.Admin = Admin;
