const { UPDATE_SIMULATOR_SETTINGS } = require('../../ipcEvents');
const { Logger } = require('../../Logger');
const {
  MAIN_PROCESS_INFO_LOG_OBJ
} = require('../../constants');

function sendSettingsBack(sender, url, settings) {
  // console.log('Sending following settings to Admin UI:');
  MAIN_PROCESS_INFO_LOG_OBJ.message = 'Sending following settings to Admin UI:';
  Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
  // console.log(JSON.stringify(settings, null, 2));
  MAIN_PROCESS_INFO_LOG_OBJ.message = JSON.stringify(settings, null, 2);
  Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);


  sender.send(UPDATE_SIMULATOR_SETTINGS, Object.assign({ url }, settings));
}

exports.sendSettingsBack = sendSettingsBack;
