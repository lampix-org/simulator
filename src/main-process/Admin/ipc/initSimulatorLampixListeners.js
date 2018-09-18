const { ipcMain } = require('electron');
const {
  REGISTER_MOVEMENT,
  REGISTER_SIMPLE,
  REGISTER_POSITION,
  GET_LAMPIX_INFO,
  TRANSFORM_COORDINATES,
  GET_APPS,
  SWITCH_TO_APP,
  REMOVE_WATCHERS
} = require('../../ipcEvents');

function initSimulatorLampixListeners() {
  // Data should contain the simulator URL and an array of rectangles
  ipcMain.on(REGISTER_MOVEMENT, (event, data) => {
    const simulator = this.simulators[data.url];
    simulator.setMovementWatchers(data.rectangles);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(REGISTER_SIMPLE, (event, data) => {
    const simulator = this.simulators[data.url];
    simulator.setClassifierWatchers(data.rectangles);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(REGISTER_POSITION, (event, data) => {
    const simulator = this.simulators[data.url];
    simulator.setSegmenterWatchers(data.rectangles);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(GET_LAMPIX_INFO, (event, data) => {
    const simulator = this.simulators[data.url];
    simulator.sendLampixInfo();
  });

  ipcMain.on(TRANSFORM_COORDINATES, (event, data) => {
    const simulator = this.simulators[data.url];
    simulator.transformCoordinates(data.rect);
  });

  ipcMain.on(GET_APPS, (event, data) => {
    const simulator = this.simulators[data.url];
    simulator.sendApps();
  });

  ipcMain.on(SWITCH_TO_APP, (event, data) => {
    const { toClose, toOpen } = data;
    this.switchToApp(toClose, toOpen);
  });

  // lampixjs v1
  ipcMain.on(REMOVE_WATCHERS, (event, data) => {
    const { watcherIds, url } = data;
    const simulator = this.simulators[url];
    simulator.removeWatchers(watcherIds);
    simulator.sendSettingsToAdmin();
  });
}

exports.initSimulatorLampixListeners = initSimulatorLampixListeners;

