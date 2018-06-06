const { autoUpdater } = require('electron-updater');
const { once } = require('./utils/once');

const enableUpdates = once(() => {
  // Using built in functionality for now
  // enableUpdates will have custom logic after confirming updates work
  autoUpdater.checkForUpdatesAndNotify();
});

exports.enableUpdates = enableUpdates;
