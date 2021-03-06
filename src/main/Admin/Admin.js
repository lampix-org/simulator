const { URL } = require('url');
const { app } = require('electron');
const { BrowserWindow } = require('electron');

const { simulator } = require('../simulator');
const { createAdminBrowser } = require('./createAdminBrowser');
const { store } = require('../store');
const { configStore } = require('../config');
const { handleURLScheme } = require('./handleURLScheme');
const { Logger } = require('../Logger');
const { isDev } = require('../utils/envCheck');
const { safeJsonParse } = require('../utils/safeJsonParse');
const {
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
    this.localServerOrigin = null;
    this.simulators = {};
    this.localServerOrigin = null;
    this.browser = createAdminBrowser(() => {
      this.browser = null;
    });

    this.browser.on('close', () => {
      this.browser.destroy();
    });

    handleAdminUIReady.call(
      this,
      this.updateRendererURLs,
      this.sendSimulators
    );
  }

  async loadApp(urlOrName, queryParams = {}) {
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
    } = await handleURLScheme(url, this.localServerOrigin);

    if (!success) {
      Logger.error(`URL check failed with message: ${error}`);
      Logger.error('Aborting app loading...');
      this.browser.webContents.send(ERROR, error);
      return;
    }

    Logger.info('Creating new simulator...');

    // inputURL refers to the string the user entered in the address bar
    const inputURL = checkedURL.href;

    const onClosed = () => {
      delete this.simulators[inputURL];
      this.sendSimulators();
      simulatorPosition -= simulatorPositionStep;
    };
    const updateAdminUI = sendSettingsBack.bind(
      null,
      this.browser.webContents,
      inputURL
    );

    this.simulators[inputURL] = simulator(url, {
      store,
      configStore,
      isDev: isDev(),
      onClosed,
      updateAdminUI,
      localServerOrigin: this.localServerOrigin
    });

    const options = isDev() ? { extraHeaders: 'pragma: no-cache\n' } : {};

    Logger.info(`Loading app at ${inputURL}`);
    simulatorPosition += simulatorPositionStep;
    this.simulators[inputURL].window.setPosition(simulatorPosition, simulatorPosition, true);

    const simulationUrl = new URL(checkedURL);
    simulationUrl.searchParams.append('url', simulationUrl.href);
    simulationUrl.searchParams.append('windowId', this.simulators[inputURL].window.id);

    const simulationCtrlUrl = new URL(`${this.browser.webContents.getURL()}`);
    simulationCtrlUrl.hash = 'simulation';
    simulationCtrlUrl.searchParams.append('windowId', this.simulators[inputURL].window.id);

    const extraParams = safeJsonParse(queryParams) || {};

    Object.keys(extraParams).forEach((param) => {
      simulationUrl.searchParams.append(param, extraParams[param]);
    });

    this.simulators[inputURL]
      .window.webContents
      .loadURL(simulationCtrlUrl.href);

    this.simulators[inputURL]
      .appBrowser.webContents
      .loadURL(simulationUrl.href, options);

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

  switchToApp(toClose, toOpen, queryParams) {
    this.closeSimulator(toClose);
    this.loadApp(toOpen, queryParams);
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

  quit(winId) {
    const windowId = winId || this.browser.id;
    const win = BrowserWindow.fromId(windowId);

    if (!win) {
      return;
    }

    if (this.browser.id === win.id) {
      app.quit();
    } else {
      win.close();
    }
  }

  minimize(winId) {
    const windowId = winId || this.browser.id;
    const win = BrowserWindow.fromId(windowId);

    if (!win) {
      return;
    }

    win.minimize();
  }

  maximize(winId) {
    const windowId = winId || this.browser.id;
    const win = BrowserWindow.fromId(windowId);

    if (!win) {
      return;
    }

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
}

exports.Admin = Admin;
