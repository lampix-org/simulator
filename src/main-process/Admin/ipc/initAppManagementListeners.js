const { ipcMain } = require('electron');
const {
  LOAD_APP,
  CLOSE_SIMULATOR,
  FOCUS_SIMULATOR
} = require('../../ipcEvents');

function initAppManagementListeners(admin) {
  ipcMain.on(LOAD_APP, (event, data) => {
    const { url } = data;
    admin.loadApp(url);
  });

  ipcMain.on(CLOSE_SIMULATOR, (event, data) => {
    const { url } = data;
    admin.closeSimulator(url);
  });

  ipcMain.on(FOCUS_SIMULATOR, (event, data) => {
    const { url } = data;
    admin.focusSimulator(url);
  });
}

exports.initAppManagementListeners = initAppManagementListeners;
