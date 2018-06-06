const { UPDATE_SIMULATOR_SETTINGS } = require('../../ipcEvents');
const { Logger } = require('../../Logger');
const {
  MAIN_PROCESS_INFO_LOG_OBJ
} = require('../../constants');

function sendSettingsBack(sender, url, settings) {
  MAIN_PROCESS_INFO_LOG_OBJ.message = 'Sending following settings to Admin UI:';
  Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
  MAIN_PROCESS_INFO_LOG_OBJ.message = JSON.stringify(settings, null, 2);
  Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);


  sender.send(UPDATE_SIMULATOR_SETTINGS, Object.assign({ url }, settings));
}

exports.sendSettingsBack = sendSettingsBack;
