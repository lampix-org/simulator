const winston = require('winston');
const { configStore } = require('../config');

const { ipcMain } = require('electron');

console.log('ipcMain ', ipcMain);

const { LOG_INFO } = require('../ipcEvents');

// const Scarlet = require('scarlet');

// const scarlet = Scarlet();

// winston.log = scarlet.intercept(winston.log).using((invocation, proceed) => {
//   const { level, message, renderer } = invocation.args;
//   ipcRenderer.send(LOG_TO_CONSOLE, { level, message, renderer });
//   proceed();
// }).proxy();

const {
  combine,
  timestamp,
  printf
} = winston.format;

const { logger } = require('./config');

const {
  timestampFormat,
  maxsize,
  maxfiles,
  filename
} = logger;

const level = configStore.store.logLevel;

const logFormat = printf(info => `[${info.timestamp}] [${info.renderer ? 'R' : 'M'}] [${info.level}]: ${info.message}`);

winston.configure({
  format: combine(
    timestamp({
      format: timestampFormat
    }),
    logFormat
  ),
  transports: [new winston.transports.File({
    filename,
    maxsize,
    maxfiles,
    level
  })]
});

if (process.env.NODE_ENV === 'development') {
  winston.add(new winston.transports.Console({ level }));
}

const onRendererLog = (event, data) => {
  const { rendererLevel, message } = data;

  winston.log({ level: rendererLevel, message, renderer: true });
};

ipcMain.on(LOG_INFO, onRendererLog);

module.exports = {
  Logger: {
    error: winston.log.bind(null, 'error'),
    warn: winston.log.bind(null, 'warn'),
    info: winston.log.bind(null, 'info'),
    verbose: winston.log.bind(null, 'verbose'),
    debug: winston.log.bind(null, 'debug'),
    silly: winston.log.bind(null, 'silly')
  }
};
