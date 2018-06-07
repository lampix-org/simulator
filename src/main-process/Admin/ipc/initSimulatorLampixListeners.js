const { ipcMain } = require('electron');
const {
  REGISTER_MOVEMENT,
  REGISTER_SIMPLE,
  REGISTER_POSITION,
  GET_LAMPIX_INFO,
  TRANSFORM_COORDINATES,
  GET_APPS
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

  ipcMain.on(GET_LAMPIX_INFO, (event, data) => {
    const simulator = simulators[data.url];
    simulator.sendLampixInfo();
  });

  ipcMain.on(TRANSFORM_COORDINATES, (event, data) => {
    const simulator = simulators[data.url];
    simulator.transformCoordinates(data.rect);
  });

  ipcMain.on(GET_APPS, (event, data) => {
    const simulator = simulators[data.url];
    simulator.sendApps();
  });
}

exports.initSimulatorLampixListeners = initSimulatorLampixListeners;

