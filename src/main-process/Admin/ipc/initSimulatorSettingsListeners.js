const { ipcMain } = require('electron');
const {
  TOGGLE_MOVEMENT,
  SET_CLASSIFIER,
  SET_RECOGNIZED_CLASS,
  SET_METADATA,
  UPDATE_RENDERER_SETTINGS
} = require('../../ipcEvents');

const sendSettingsBack = (sender, url, settings) => sender.send(UPDATE_RENDERER_SETTINGS, {
  url,
  settings
});

function initSimulatorSettingsListeners() {
  // Data should contain the simulator URL
  // And whether the target is of type 'simple' or 'position'
  ipcMain.on(TOGGLE_MOVEMENT, (event, data) => {
    const { settings } = this.simulators[data.url];
    settings.movementDetector = !settings.movementDetector;

    sendSettingsBack(event.sender, data.url, settings);
  });

  ipcMain.on(SET_CLASSIFIER, (event, data) => {
    const settings = this.simulators[data.url].settings[data.type];
    settings.classifier = data.classifier;

    sendSettingsBack(event.sender, data.url, settings);
  });

  ipcMain.on(SET_RECOGNIZED_CLASS, (event, data) => {
    const settings = this.simulators[data.url].settings[data.type];
    settings.recognizedClass = data.recognizedClass;

    sendSettingsBack(event.sender, data.url, settings);
  });

  ipcMain.on(SET_METADATA, (event, data) => {
    const settings = this.simulators[data.url].settings[data.type];
    settings.metadata = data.metadata;

    sendSettingsBack(event.sender, data.url, settings);
  });
}

exports.initSimulatorSettingsListeners = initSimulatorSettingsListeners;
