const { UPDATE_SIMULATOR_SETTINGS } = require('../../ipcEvents');
const { Logger } = require('../../Logger');

function sendSettingsBack(sender, url, settings) {
  Logger.verbose('Sending following settings to Admin UI:');
  Logger.verbose(JSON.stringify(settings, null, 2));


  sender.send(UPDATE_SIMULATOR_SETTINGS, Object.assign({ url }, settings));
}

exports.sendSettingsBack = sendSettingsBack;
