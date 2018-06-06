const { Simulator } = require('../Simulator');
const { Logger } = require('../Logger');
const {
  initSimulatorSettingsListeners,
  initAppManagementListeners,
  initSimulatorClientEventListeners,
  initSimulatorLampixListeners,
  handleAdminUIReady,
  sendSettingsBack,
  initLoggerListener
} = require('./ipc');
const { createAdminBrowser } = require('./createAdminBrowser');
const {
  UPDATE_SIMULATOR_LIST,
  UPDATE_URL_LIST,
  INVALID_URL
} = require('../ipcEvents');
const { store } = require('../store');
const { checkURL } = require('./checkURL');

const {
  MAIN_PROCESS_INFO_LOG_OBJ,
  MAIN_PROCESS_ERROR_LOG_OBJ
} = require('../constants');

const logSimulatorNotFound = (url) => {
  MAIN_PROCESS_INFO_LOG_OBJ.message = `Simulator for ${url} not found. Doing nothing.`;
  Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
};

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
      this.updateRendererURLs.bind(this),
      initLoggerListener.bind(null, this)
    );
  }

  async loadApp(url) {
    // console.log(`Admin.loadApp called with URL: ${url}`);
    MAIN_PROCESS_INFO_LOG_OBJ.message = `Admin.loadApp called with URL: ${url}`;
    Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);

    if (this.simulators[url]) {
      return;
    }

    const { success, error } = await checkURL(url);

    if (!success) {
      // console.log(`URL check failed with message: ${error}`);
      // console.log('Aborting app loading...');
      MAIN_PROCESS_ERROR_LOG_OBJ.message = `URL check failed with message: ${error}`;
      Logger.log(MAIN_PROCESS_ERROR_LOG_OBJ);
      MAIN_PROCESS_ERROR_LOG_OBJ.message = 'Aborting app loading...';
      Logger.log(MAIN_PROCESS_ERROR_LOG_OBJ);
      this.browser.webContents.send(INVALID_URL, error);
      return;
    }

    // console.log('Creating new simulator...');
    // Logger.log('info', 'Creating new simulator...');
    MAIN_PROCESS_INFO_LOG_OBJ.message = 'Creating new simulator...';
    Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);

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

    // console.log(`Loading app at ${url}`);
    MAIN_PROCESS_INFO_LOG_OBJ.message = `Loading app at ${url}`;
    Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
    this.simulators[url].browser.loadURL(`${url}?url=${url}`, options);

    this.updateURLListOrder(url);
    this.sendSimulators();
    this.updateRendererURLs();
  }

  closeSimulator(url) {
    // console.log(`Attempting to close simulator for ${url}...`);
    // Logger.log('info', `Attempting to close simulator for ${url}...`);
    MAIN_PROCESS_INFO_LOG_OBJ.message = `Attempting to close simulator for ${url}...`;
    Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
    if (this.simulators[url]) {
      // console.log('Simulator found. Closing... ');
      // Logger.log('info', 'Simulator found. Closing... ');
      MAIN_PROCESS_INFO_LOG_OBJ.message = 'Simulator found. Closing... ';
      Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
      this.simulators[url].browser.close();
      return;
    }

    logSimulatorNotFound(url);
  }

  focusSimulator(url) {
    // console.log(`Attempting to focus simulator for ${url}...`);
    // Logger.log('info', `Attempting to focus simulator for ${url}...`);
    MAIN_PROCESS_INFO_LOG_OBJ.message = `Attempting to focus simulator for ${url}...`;
    Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
    if (this.simulators[url]) {
      // console.log('Simulator found. Focusing... ');
      MAIN_PROCESS_INFO_LOG_OBJ.message = 'Simulator found. Focusing... ';
      Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
      this.simulators[url].browser.focus();
      return;
    }

    logSimulatorNotFound(url);
  }

  openDevTools(url) {
    // console.log(`Attempting to open dev tools for ${url}...`);
    MAIN_PROCESS_INFO_LOG_OBJ.message = `Attempting to open dev tools for ${url}...`;
    Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
    if (this.simulators[url]) {
      // console.log('Simulator found. Opening dev tools');
      MAIN_PROCESS_INFO_LOG_OBJ.message = 'Simulator found. Opening dev tools';
      Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
      this.simulators[url].browser.webContents.openDevTools();
      return;
    }

    logSimulatorNotFound(url);
  }

  sendSimulators() {
    // Check to see that the main admin window wasn't the one closed
    // If it was, then updating simulators is not necessary since the whole program closes
    if (this.browser) {
      // console.log('Sending simulator list to renderer...');
      MAIN_PROCESS_INFO_LOG_OBJ.message = 'Sending simulator list to renderer...';
      Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
      this.browser.webContents.send(UPDATE_SIMULATOR_LIST, this.simulators);
    } else {
      // console.log('Application closing. Will not send simulator list.');
      MAIN_PROCESS_INFO_LOG_OBJ.message = 'Application closing. Will not send simulator list.';
      Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
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

  logInfo(logObj) {
    Logger.log(logObj);
  }
}

exports.Admin = Admin;
