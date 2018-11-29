const { ipcMain } = require('electron');
const { once } = require('../../utils/once');
const {
  ADMIN_UI_READY,
  APP_CONFIG
} = require('../../ipcEvents');

const { initAppManagementListeners } = require('./initAppManagementListeners');
const { initWindowManagementListeners } = require('./initWindowManagementListeners');
const { initSimulationListeners } = require('./initSimulationListeners');
const { initSimulatorSettingsListeners } = require('./initSimulatorSettingsListeners');
const { initSimulatorClientEventListeners } = require('./initSimulatorClientEventListeners');
const { initSimulatorLampixListeners } = require('./initSimulatorLampixListeners');

// Each uiRelatedCallback should be an asynchronous function
// Preferably one that sends information to the simulator's browser
function handleAdminUIReady(updateURLs, sendSimulators, ...uiRelatedCallbacks) {
  const callbacks = [
    ...uiRelatedCallbacks,
    initAppManagementListeners,
    initWindowManagementListeners,
    initSimulationListeners,
    initSimulatorSettingsListeners,
    initSimulatorClientEventListeners,
    initSimulatorLampixListeners
  ];

  const enableUIEventsOnce = once(() => callbacks.forEach((c) => c.call(this)));

  ipcMain.on(ADMIN_UI_READY, () => {
    enableUIEventsOnce();
    this.browser.webContents.send(APP_CONFIG, this.config);
    updateURLs.call(this);
    sendSimulators.call(this);
  });
}

exports.handleAdminUIReady = once(handleAdminUIReady);
