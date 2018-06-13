const { ipcMain } = require('electron');
const { once } = require('../../utils/once');
const {
  ADMIN_UI_READY,
  APP_CONFIG
} = require('../../ipcEvents');

// Each uiRelatedCallback should be an asynchronous function
// Preferably one that sends information to the simulator's browser
function handleAdminUIReady(...uiRelatedCallbacks) {
  ipcMain.once(ADMIN_UI_READY, () => {
    uiRelatedCallbacks.forEach((uiRelatedCallback) => uiRelatedCallback.call(this));
    this.browser.webContents.send(APP_CONFIG, this.config);
  });
}

exports.handleAdminUIReady = once(handleAdminUIReady);
