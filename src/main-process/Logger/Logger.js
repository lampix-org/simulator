const { createLogger, format, transports } = require('winston');

const {
  combine,
  timestamp,
  printf
} = format;

const { logger, logLevel } = require('./config');

// TODO: think if it's really necessary to have defaults since this stuff
// is configured and will have values in the config.js file
const timestampFormat = logger.timestampFormat ? logger.timestampFormat : 'HH:MM:SS DD-MM-YYYY';
const filename = logger.filename ? logger.fileName : 'winston.log';
const maxsize = logger.maxSize ? logger.maxSize : 500;
const maxFiles = logger.maxFiles ? logger.maxFiles : 5;
const level = logLevel;

const myFormat = printf(info => `[${info.timestamp}] [${info.sentFrom}] [${info.level}]: ${info.message}`);

const Logger = createLogger({
  format: combine(
    timestamp({
      format: timestampFormat
    }),
    myFormat
  ),
  level,
  transports: [new transports.File({ filename, maxsize, maxFiles })]
});

if (process.env.NODE_ENV === 'development') {
  Logger.add(new transports.Console());
}

exports.Logger = Logger;
