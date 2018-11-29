const { ipcMain } = require('electron');
const {
  RELOAD_SIMULATION
} = require('../../ipcEvents');

function initSimulationListeners() {
  ipcMain.on(RELOAD_SIMULATION, (event, data = {}) => {
    const { url } = data;
    this.simulators[url].appBrowser.webContents.reload();
  });
}

exports.initSimulationListeners = initSimulationListeners;
