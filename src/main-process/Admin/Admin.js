const { Simulator } = require('../Simulator');
const { createAdminBrowser } = require('./createAdminBrowser');
const { store } = require('../store');
const { configStore } = require('../config');
const { checkURL } = require('./checkURL');
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

const logSimulatorNotFound = (url) => console.log(`Simulator for ${url} not found. Doing nothing.`);

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

    handleAdminUIReady.call(
      this,
      initSimulatorSettingsListeners,
      initAppManagementListeners,
      initSimulatorClientEventListeners,
      initSimulatorLampixListeners,
      this.updateRendererURLs
    );
  }

  async loadApp(urlOrName) {
    console.log(`Admin.loadApp called with URL / App Name: ${urlOrName}`);
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
      console.log(`URL check failed with message: ${error}`);
      console.log('Aborting app loading...');
      this.browser.webContents.send(ERROR, error);
      return;
    }

    console.log('Creating new simulator...');

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

    this.simulators[checkedURL] = new Simulator(checkedURL, {
      onClosed,
      updateAdminUI
    });

    const options = process.env.NODE_ENV === 'development' ? { extraHeaders: 'pragma: no-cache\n' } : {};

    console.log(`Loading app at ${checkedURL}`);
    simulatorPosition += simulatorPositionStep;
    this.simulators[checkedURL].browser.setPosition(simulatorPosition, simulatorPosition, true);
    this.simulators[checkedURL].browser.loadURL(`${checkedURL}?url=${checkedURL}`, options);
    this.updateURLListOrder(alias || url);
    this.sendSimulators();
    this.updateRendererURLs();
  }

  async closeSimulator(url) {
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
}

exports.Admin = Admin;
