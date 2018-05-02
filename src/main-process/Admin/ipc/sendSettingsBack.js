const { UPDATE_SIMULATOR_SETTINGS } = require('../../ipcEvents');

const sendSettingsBack = (sender, url, settings) => sender.send(UPDATE_SIMULATOR_SETTINGS, {
  url,
  settings
});

exports.sendSettingsBack = sendSettingsBack;
