const { ipcMain } = require('electron');
const {
  SET_WATCHER_NAME,
  SET_RECOGNIZED_CLASS,
  SET_METADATA,
  CHANGE_CATEGORY_SETTINGS,
  ADD_APP_NAME_URL_ASSOCIATION,
  REMOVE_APP_NAME_URL_ASSOCIATION,
  SAVE_SCALE_FACTOR,
  SAVE_PIX,
  SAVE_USER_DEFINED_CLASSES
} = require('../../ipcEvents');
const { sendSettingsBack } = require('./sendSettingsBack');

function initSimulatorSettingsListeners() {
  ipcMain.on(SET_WATCHER_NAME, (event, data) => {
    const { settings, registeredData } = this.simulators[data.url];
    settings.watcherName = data.watcherName;

    sendSettingsBack(event.sender, data.url, {
      settings,
      registeredData
    });
  });

  ipcMain.on(SET_RECOGNIZED_CLASS, (event, data) => {
    const { settings, registeredData } = this.simulators[data.url];
    settings.recognizedClass = data.recognizedClass;

    sendSettingsBack(event.sender, data.url, {
      settings,
      registeredData
    });
  });

  ipcMain.on(SET_METADATA, (event, data) => {
    const { settings, registeredData } = this.simulators[data.url];
    settings.metadata = data.metadata;

    sendSettingsBack(event.sender, data.url, {
      settings,
      registeredData
    });
  });

  ipcMain.on(CHANGE_CATEGORY_SETTINGS, (event, data) => {
    const { url, watcherName } = data;
    const { settings } = this.simulators[url];

    settings.watcherName = watcherName;
    settings.recognizedClass = '1';

    sendSettingsBack(event.sender, url, {
      settings
    });
  });

  ipcMain.on(ADD_APP_NAME_URL_ASSOCIATION, (event, association) => {
    this.updateNameURLAssociation(association);
    this.sendConfig();
  });

  ipcMain.on(REMOVE_APP_NAME_URL_ASSOCIATION, (event, associationName) => {
    this.removeNameURLAssociation(associationName);
    this.sendConfig();
  });

  ipcMain.on(SAVE_SCALE_FACTOR, (event, value) => {
    this.updateScaleFactor(value);
    this.sendConfig();
  });

  ipcMain.on(SAVE_PIX, (event, pixObject) => {
    this.updatePix(pixObject);
    this.sendConfig();
  });

  ipcMain.on(SAVE_USER_DEFINED_CLASSES, (event, userDefinedClasses) => {
    this.updateUserDefinedClasses(userDefinedClasses);
    this.sendConfig();
  });
}

exports.initSimulatorSettingsListeners = initSimulatorSettingsListeners;
