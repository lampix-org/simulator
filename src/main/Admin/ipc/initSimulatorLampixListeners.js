const { ipcMain } = require('electron');
const {
  GET_LAMPIX_INFO,
  TRANSFORM_COORDINATES,
  GET_APPS,
  GET_APP_CONFIG,
  SWITCH_TO_APP,
  ADD_WATCHERS,
  REMOVE_WATCHERS,
  PAUSE_WATCHERS,
  RESUME_WATCHERS,
  UPDATE_WATCHER_SHAPE
} = require('../../ipcEvents');
const { Logger } = require('../../Logger');

function initSimulatorLampixListeners() {
  ipcMain.on(GET_LAMPIX_INFO, (event, data) => {
    Logger.verbose(`Received event: ${GET_LAMPIX_INFO}`);
    const simulator = this.simulators[data.url];
    simulator.sendLampixInfo();
  });

  ipcMain.on(TRANSFORM_COORDINATES, (event, data) => {
    Logger.verbose(`Received event: ${TRANSFORM_COORDINATES}`);
    const simulator = this.simulators[data.url];
    simulator.transformCoordinates(data.rect);
  });

  ipcMain.on(GET_APPS, (event, data) => {
    Logger.verbose(`Received event: ${GET_APPS}`);
    const simulator = this.simulators[data.url];
    simulator.sendApps();
  });

  ipcMain.on(SWITCH_TO_APP, (event, data) => {
    Logger.verbose(`Received event: ${SWITCH_TO_APP}`);
    const { toClose, toOpen } = data;
    this.switchToApp(toClose, toOpen);
  });

  ipcMain.on(GET_APP_CONFIG, (event, data) => {
    Logger.verbose(`Received event: ${GET_APP_CONFIG}`);
    const simulator = this.simulators[data.url];
    simulator.sendAppConfig();
  });

  // Watcher Management
  ipcMain.on(ADD_WATCHERS, (event, data) => {
    Logger.verbose(`Received event: ${ADD_WATCHERS}`);
    const { watchers, url } = data;
    const simulator = this.simulators[url];
    simulator.addWatchers(watchers);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(REMOVE_WATCHERS, (event, data) => {
    Logger.verbose(`Received event: ${REMOVE_WATCHERS}`);
    const { watcherIds, url } = data;
    const simulator = this.simulators[url];
    simulator.removeWatchers(watcherIds);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(PAUSE_WATCHERS, (event, data) => {
    Logger.verbose(`Received event: ${PAUSE_WATCHERS}`);
    const { watcherIds, url } = data;
    const simulator = this.simulators[url];
    simulator.pauseWatchers(watcherIds);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(RESUME_WATCHERS, (event, data) => {
    Logger.verbose(`Received event: ${RESUME_WATCHERS}`);
    const { watcherIds, url } = data;
    const simulator = this.simulators[url];
    simulator.resumeWatchers(watcherIds);
    simulator.sendSettingsToAdmin();
  });

  ipcMain.on(UPDATE_WATCHER_SHAPE, (event, data) => {
    Logger.verbose(`Received event: ${UPDATE_WATCHER_SHAPE}`);
    const { watcherId, shape, url } = data;
    const simulator = this.simulators[url];
    simulator.updateWatcherShape(watcherId, shape);
    simulator.sendSettingsToAdmin();
  });
}

exports.initSimulatorLampixListeners = initSimulatorLampixListeners;

