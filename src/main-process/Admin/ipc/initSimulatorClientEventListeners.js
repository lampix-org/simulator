const { ipcMain } = require('electron');
const {
  MOUSE_MOVE,
  SIMPLE_CLICK,
  POSITION_CLICK,
} = require('../../ipcEvents');

function initSimulatorClientEventListeners() {
  // Data should contain the simulator URL, mouseX and mouseY for client events
  ipcMain.on(MOUSE_MOVE, (event, data) => {
    this.simulators[data.url].handleMouseMove(data.mouseX, data.mouseY);
  });

  ipcMain.on(SIMPLE_CLICK, (event, data) => {
    this.simulators[data.url].handleSimpleClassifier(data.mouseX, data.mouseY);
  });

  ipcMain.on(POSITION_CLICK, (event, data) => {
    this.simulators[data.url].handlePositionClassifier(data.mouseX, data.mouseY);
  });
}

exports.initSimulatorClientEventListeners = initSimulatorClientEventListeners;
