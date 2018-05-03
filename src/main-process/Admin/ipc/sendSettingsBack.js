const { UPDATE_SIMULATOR_SETTINGS } = require('../../ipcEvents');

function sendSettingsBack(sender, url, settings) {
  console.log('Sending following settings to Admin UI:');
  console.log(JSON.stringify(settings, null, 2));

  sender.send(UPDATE_SIMULATOR_SETTINGS, Object.assign({ url }, settings));
}

exports.sendSettingsBack = sendSettingsBack;
