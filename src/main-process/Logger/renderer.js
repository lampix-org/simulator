const { ipcRenderer } = require('electron');
const { LOG_INFO, LOG_TO_CONSOLE } = require('../ipcEvents');


const log = (rendererLevel, message) => {
  ipcRenderer.send(LOG_INFO, { rendererLevel, message });
};

ipcRenderer.on(LOG_TO_CONSOLE, (event, data) => {
  const { level, message, renderer } = data;
  // by logging from here to console it will log to simulator admin web console.
  console.log(formatMessage(level, message, renderer));
});

const formatMessage = (level, message, renderer) => {
  const date = new Date();
  const paddedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const paddedSeconds = date.getSeconds().toString().padStart(2, '0');
  return `[${date.getHours()}:${date.getMinutes()}:${paddedSeconds} ${date.getDate()}-${paddedMonth}-${date.getFullYear()}] [${renderer ? 'R' : 'M'}] [${level}]: ${message}`; // eslint-disable-line
};

module.exports = {
  error: log.bind(null, 'error'),
  warn: log.bind(null, 'warn'),
  info: log.bind(null, 'info'),
  verbose: log.bind(null, 'verbose'),
  debug: log.bind(null, 'debug'),
  silly: log.bind(null, 'silly')
};
