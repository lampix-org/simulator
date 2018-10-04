const { ipcMain } = require('electron');
const {
  LOAD_APP,
  CLOSE_SIMULATOR,
  FOCUS_SIMULATOR,
  OPEN_DEV_TOOLS,
  BEFORE_UNLOAD
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

  ipcMain.on(BEFORE_UNLOAD, (event, data) => {
    const { url } = data;
    this.simulators[url].resetData();
  });
}

exports.initAppManagementListeners = initAppManagementListeners;
