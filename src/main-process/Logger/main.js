const winston = require('winston');
const { configStore } = require('../config');

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

console.log('configStore.store.logLevel ', configStore.store.logLevel);
const level = configStore.store.logLevel;

const myFormat = printf(info => `[${info.timestamp}] [M] [${info.level}]: ${info.message}`);

const Logger = winston.createLogger({
  format: combine(
    timestamp({
      format: timestampFormat
    }),
    myFormat
  ),
  transports: [new winston.transports.File({
    filename,
    maxsize,
    maxfiles,
    level
  })]
});

if (process.env.NODE_ENV === 'development') {
  Logger.add(new winston.transports.Console({ level }));
}

exports.Logger = Logger;
