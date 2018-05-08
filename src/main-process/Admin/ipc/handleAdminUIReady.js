const { ipcMain } = require('electron');
const { once } = require('../../utils/once');
const {
  ADMIN_UI_READY
} = require('../../ipcEvents');

// Each uiRelatedCallback should be an asynchronous function
// Preferably one that sends information to the simulator's browser
function handleAdminUIReady(...uiRelatedCallbacks) {
  ipcMain.on(ADMIN_UI_READY, () => {
    uiRelatedCallbacks.forEach((uiRelatedCallback) => uiRelatedCallback());
  });
}

exports.handleAdminUIReady = once(handleAdminUIReady);
