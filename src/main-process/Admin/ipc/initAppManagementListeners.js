const { ipcMain } = require('electron');
const {
  LOAD_APP,
  CLOSE_SIMULATOR,
  FOCUS_SIMULATOR,
  OPEN_DEV_TOOLS
} = require('../../ipcEvents');

function initAppManagementListeners() {
  ipcMain.on(LOAD_APP, (event, data) => {
    const { url } = data;
    this.loadApp(url);
  });

  ipcMain.on(CLOSE_SIMULATOR, (event, data) => {
    const { url } = data;
    this.closeSimulator(url);
  });

  ipcMain.on(FOCUS_SIMULATOR, (event, data) => {
    const { url } = data;
    this.focusSimulator(url);
  });

  ipcMain.on(OPEN_DEV_TOOLS, (event, data) => {
    const { url } = data;
    this.openDevTools(url);
  });
}

exports.initAppManagementListeners = initAppManagementListeners;
