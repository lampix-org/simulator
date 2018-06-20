const { LOG_INFO } = require('../ipcEvents');

const log = (rendererLevel, message) => {
  window.ipcRenderer.send(LOG_INFO, { rendererLevel, message });
};

module.exports = {
  // Logger: {
  error: log.bind(null, 'error'),
  warn: log.bind(null, 'warn'),
  info: log.bind(null, 'info'),
  verbose: log.bind(null, 'verbose'),
  debug: log.bind(null, 'debug'),
  silly: log.bind(null, 'silly')
  // }
};
