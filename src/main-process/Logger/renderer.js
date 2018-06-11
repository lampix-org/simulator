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

const level = configStore.store.logLevel;

const myFormat = printf(info => `[${info.timestamp}] [R] [${info.level}]: ${info.message}`);

const Logger = winston.createLogger({
  format: combine(
    timestamp({
      format: timestampFormat
    }),
    myFormat
  ),
  level,
  transports: [new winston.transports.File({ filename, maxsize, maxfiles })]
});

if (process.env.NODE_ENV === 'development') {
  Logger.add(new winston.transports.Console());
}

exports.Logger = Logger;
