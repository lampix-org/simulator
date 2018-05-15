const { ipcMain } = require('electron');
const {
  MOUSE_MOVE,
  CLICK,
  RIGHT_CLICK,
} = require('../../ipcEvents');

function initSimulatorClientEventListeners(simulators) {
  // Data should contain the simulator URL, mouseX and mouseY for client events
  ipcMain.on(MOUSE_MOVE, (event, data) => {
    simulators[data.url].handleMouseMove(data.mouseX, data.mouseY);
  });

  ipcMain.on(CLICK, (event, data) => {
    simulators[data.url].handleSimpleClassifier(data.mouseX, data.mouseY);
  });

  ipcMain.on(RIGHT_CLICK, (event, data) => {
    simulators[data.url].handlePositionClassifier(data.mouseX, data.mouseY);
  });
}

exports.initSimulatorClientEventListeners = initSimulatorClientEventListeners;
