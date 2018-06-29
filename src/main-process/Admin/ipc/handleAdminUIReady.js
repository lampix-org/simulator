const { ipcMain } = require('electron');
const { once } = require('../../utils/once');
const {
  ADMIN_UI_READY,
  APP_CONFIG
} = require('../../ipcEvents');

// Each uiRelatedCallback should be an asynchronous function
// Preferably one that sends information to the simulator's browser
function handleAdminUIReady(updateURLs, ...uiRelatedCallbacks) {
  const enableUIEventsOnce = once(() => uiRelatedCallbacks.forEach((c) => c.call(this)));

  ipcMain.on(ADMIN_UI_READY, () => {
    enableUIEventsOnce();
    this.browser.webContents.send(APP_CONFIG, this.config);
    updateURLs.call(this);
  });
}

exports.handleAdminUIReady = once(handleAdminUIReady);
