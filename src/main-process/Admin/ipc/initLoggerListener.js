const { ipcMain } = require('electron');
const { LOG_INFO } = require('../../ipcEvents');

function initLoggerListener(admin) {
  ipcMain.on(LOG_INFO, (event, data) => {
    const { logObj } = data;
    admin.logInfo(logObj);
  });
}

exports.initLoggerListener = initLoggerListener;
