const { ipcMain } = require('electron');
const {
  MINIMIZE_WINDOW,
  MAXIMIZE_WINDOW,
  CLOSE_WINDOW
} = require('../../ipcEvents');

function initWindowManagementListeners() {
  ipcMain.on(MINIMIZE_WINDOW, () => {
    this.minimize();
  });

  ipcMain.on(MAXIMIZE_WINDOW, () => {
    this.maximize();
  });

  ipcMain.on(CLOSE_WINDOW, () => {
    this.quit();
  });
}

exports.initWindowManagementListeners = initWindowManagementListeners;
