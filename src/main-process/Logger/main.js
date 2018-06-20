const winston = require('winston');
const { configStore } = require('../config');

const { ipcMain } = require('electron');

const { LOG_INFO } = require('../ipcEvents');

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

const mainFormat = printf(info => `[${info.timestamp}] [R] [${info.level}]: ${info.message}`);
const rendererFormat = printf(info => `[${info.timestamp}] [M] [${info.level}]: ${info.message}`);

winston.configure({
  format: combine(
    timestamp({
      format: timestampFormat
    }),
    mainFormat
  ),
  transports: [new winston.transports.File({
    filename,
    maxsize,
    maxfiles,
    level
  })]
});


const onRendererLog = (event, data) => {
  const { rendererLevel, message } = data;

  winston.configure(customConfig(rendererFormat));
  if (process.env.NODE_ENV === 'development') {
    winston.add(new winston.transports.Console({ level }));
  }
  winston.log({ level: rendererLevel, message });

  winston.configure(customConfig(mainFormat));
  if (process.env.NODE_ENV === 'development') {
    winston.add(new winston.transports.Console({ level }));
  }
};

const customConfig = (customFormat) => { // eslint-disable-line
  return {
    format: combineFormat(customFormat),
    transports: [new winston.transports.File({
      filename,
      maxsize,
      maxfiles,
      level
    })]
  };
};

ipcMain.on(LOG_INFO, onRendererLog);

const combineFormat = (customFormat) => combine(
  timestamp({
    format: timestampFormat
  }),
  customFormat
);

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
