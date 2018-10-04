const { ipcMain } = require('electron');
const {
  TOGGLE_MOVEMENT,
  SET_CLASSIFIER,
  SET_RECOGNIZED_CLASS,
  SET_METADATA,
  CHANGE_CATEGORY_SETTINGS,
  ADD_APP_NAME_URL_ASSOCIATION,
  REMOVE_APP_NAME_URL_ASSOCIATION,
  SAVE_SCALE_FACTOR,
  SAVE_PIX,
  SAVE_USER_SIMPLE_CLASSES,
  SAVE_USER_POSITION_CLASSES,
  CHANGE_CORE_VERSION
} = require('../../ipcEvents');
const {
  SIMPLE,
  MOVEMENT
} = require('../../../common/constants');
const { sendSettingsBack } = require('./sendSettingsBack');

function initSimulatorSettingsListeners() {
  // Data should contain the simulator URL
  // And whether the target is of type 'simple' or 'position'
  ipcMain.on(TOGGLE_MOVEMENT, (event, data) => {
    const { settings, registeredData } = this.simulators[data.url];
    settings.movementDetector = !settings.movementDetector;

    sendSettingsBack(event.sender, data.url, {
      settings,
      registeredData
    });
  });

  ipcMain.on(SET_CLASSIFIER, (event, data) => {
    const { settings, registeredData } = this.simulators[data.url];
    settings[data.type].classifier = data.classifier;

    sendSettingsBack(event.sender, data.url, {
      settings,
      registeredData
    });
  });

  ipcMain.on(SET_RECOGNIZED_CLASS, (event, data) => {
    const { settings, registeredData } = this.simulators[data.url];
    settings[data.type].recognizedClass = data.recognizedClass;

    sendSettingsBack(event.sender, data.url, {
      settings,
      registeredData
    });
  });

  ipcMain.on(SET_METADATA, (event, data) => {
    const { settings, registeredData } = this.simulators[data.url];
    settings[data.type].metadata = data.metadata;

    sendSettingsBack(event.sender, data.url, {
      settings,
      registeredData
    });
  });

  ipcMain.on(CHANGE_CATEGORY_SETTINGS, (event, data) => {
    const { url, category, classifier } = data;
    const { settings } = this.simulators[url];

    if (category === MOVEMENT) {
      settings.movementDetector = true;
    } else {
      settings[category].classifier = classifier;
      settings[category].recognizedClass = category === SIMPLE ?
        '1' : '0';
    }

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

  ipcMain.on(SAVE_USER_SIMPLE_CLASSES, (event, userSimpleClasses) => {
    this.updateUserSimpleClasses(userSimpleClasses);
    this.sendConfig();
  });

  ipcMain.on(SAVE_USER_POSITION_CLASSES, (event, userPositionClasses) => {
    this.updateUserPositionClasses(userPositionClasses);
    this.sendConfig();
  });

  ipcMain.on(CHANGE_CORE_VERSION, (event, version) => {
    this.updateCoreVersion(version);
    this.sendConfig();
  });
}

exports.initSimulatorSettingsListeners = initSimulatorSettingsListeners;
