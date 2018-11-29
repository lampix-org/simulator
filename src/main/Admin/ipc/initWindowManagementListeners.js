const { ipcMain } = require('electron');
const {
  MINIMIZE_WINDOW,
  MAXIMIZE_WINDOW,
  CLOSE_WINDOW,
} = require('../../ipcEvents');

function initWindowManagementListeners() {
  ipcMain.on(MINIMIZE_WINDOW, (event, data = {}) => {
    const { windowId } = data;
    this.minimize(windowId);
  });

  ipcMain.on(MAXIMIZE_WINDOW, (event, data = {}) => {
    const { windowId } = data;
    this.maximize(windowId);
  });

  ipcMain.on(CLOSE_WINDOW, (event, data = {}) => {
    const { windowId } = data;
    this.quit(windowId);
  });
}

exports.initWindowManagementListeners = initWindowManagementListeners;
