const { ipcMain } = require('electron');
const {
  GET_LAMPIX_INFO,
  TRANSFORM_COORDINATES,
  GET_APPS,
  SWITCH_TO_APP,
  ADD_WATCHERS,
  REMOVE_WATCHERS,
  PAUSE_WATCHERS,
  RESUME_WATCHERS,
  UPDATE_WATCHER_SHAPE
} = require('../../ipcEvents');

function initSimulatorLampixListeners() {
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

  // Watcher Management
  ipcMain.on(ADD_WATCHERS, (event, data) => {
    const { watchers, url } = data;
    const simulator = this.simulators[url];
    simulator.addWatchers(watchers);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(REMOVE_WATCHERS, (event, data) => {
    const { watcherIds, url } = data;
    const simulator = this.simulators[url];
    simulator.removeWatchers(watcherIds);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(PAUSE_WATCHERS, (event, data) => {
    const { watcherIds, url } = data;
    const simulator = this.simulators[url];
    simulator.pauseWatchers(watcherIds);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(RESUME_WATCHERS, (event, data) => {
    const { watcherIds, url } = data;
    const simulator = this.simulators[url];
    simulator.resumeWatchers(watcherIds);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(UPDATE_WATCHER_SHAPE, (event, data) => {
    const { watcherId, shape, url } = data;
    const simulator = this.simulators[url];
    simulator.updateWatcherShape(watcherId, shape);
    simulator.sendSettingsToAdmin();
  });
}

exports.initSimulatorLampixListeners = initSimulatorLampixListeners;

