const { ipcMain } = require('electron');
const {
  MOUSE_MOVE,
  SIMPLE_CLICK,
  POSITION_CLICK,
} = require('../../ipcEvents');
const debounce = require('lodash.debounce');

const error = 'appNotFound';

function initSimulatorClientEventListeners() {
  const debounceSimulatorError = debounce(() => {
    this.simulatorError(error);
  }, 5000, { leading: true });

  // Data should contain the simulator URL, mouseX and mouseY for client events
  ipcMain.on(MOUSE_MOVE, (event, data) => {
    if (this.simulators[data.url]) {
      this.simulators[data.url].handleMovement(data.mouseX, data.mouseY);
    } else {
      debounceSimulatorError();
    }
  });

  ipcMain.on(SIMPLE_CLICK, (event, data) => {
    if (this.simulators[data.url]) {
      this.simulators[data.url].handleClassifierWatchers(data.mouseX, data.mouseY);
    } else {
      debounceSimulatorError();
    }
  });

  ipcMain.on(POSITION_CLICK, (event, data) => {
    if (this.simulators[data.url]) {
      this.simulators[data.url].handleSegmenterWatchers(data.mouseX, data.mouseY);
    } else {
      debounceSimulatorError();
    }
  });
}

exports.initSimulatorClientEventListeners = initSimulatorClientEventListeners;
