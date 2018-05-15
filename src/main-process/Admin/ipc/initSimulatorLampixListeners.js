const { ipcMain } = require('electron');
const {
  REGISTER_MOVEMENT,
  REGISTER_SIMPLE,
  REGISTER_POSITION
} = require('../../ipcEvents');

function initSimulatorLampixListeners(simulators) {
  // Data should contain the simulator URL and an array of rectangles
  ipcMain.on(REGISTER_MOVEMENT, (event, data) => {
    const simulator = simulators[data.url];
    simulator.setMovementRectangles(data.rectangles);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(REGISTER_SIMPLE, (event, data) => {
    const simulator = simulators[data.url];
    simulator.setSimpleRectangles(data.rectangles);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(REGISTER_POSITION, (event, data) => {
    const simulator = simulators[data.url];
    simulator.setPositionRectangles(data.rectangles);
    simulator.sendSettingsToAdmin();
  });
}

exports.initSimulatorLampixListeners = initSimulatorLampixListeners;

