const { ipcRenderer } = require('electron');
const { LOG_INFO, LOG_TO_CONSOLE } = require('../ipcEvents');

const normalizeLevel = (level) => {
  if (level === 'verbose') {
    return 'log';
  } else if (level === 'silly') {
    return 'debug';
  }

  return level;
};

const createMessagePayload = (message, renderer) => [
  `%c[${renderer ? 'R' : 'M'}]`,
  'font-weight: bold',
  `: ${message}`
];

const log = (level, message) => {
  ipcRenderer.send(LOG_INFO, { level, message });
  console[normalizeLevel(level)](...createMessagePayload(message, true));
};

ipcRenderer.on(LOG_TO_CONSOLE, (event, data) => {
  const { level, message } = data;
  console[normalizeLevel(level)](...createMessagePayload(message, false));
});

module.exports = {
  error: log.bind(null, 'error'),
  warn: log.bind(null, 'warn'),
  info: log.bind(null, 'info'),
  verbose: log.bind(null, 'verbose'),
  debug: log.bind(null, 'debug'),
  silly: log.bind(null, 'silly')
};
