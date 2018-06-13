const { ipcMain } = require('electron');
const {
  TOGGLE_MOVEMENT,
  SET_CLASSIFIER,
  SET_RECOGNIZED_CLASS,
  SET_METADATA,
  CHANGE_CATEGORY_SETTINGS,
  ADD_APP_NAME_URL_ASSOCIATION
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
}

exports.initSimulatorSettingsListeners = initSimulatorSettingsListeners;
