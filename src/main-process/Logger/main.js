const winston = require('winston');
const { configStore } = require('../config');

const { ipcMain } = require('electron');

const { LOG_INFO, LOG_TO_CONSOLE } = require('../ipcEvents');

const Scarlet = require('scarlet');

const scarlet = Scarlet();

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
const { logLevel } = configStore.store;

class Logger {
  constructor() {
    winston.log = scarlet.intercept(winston.log).using((invocation, proceed) => {
      let level;
      let message;
      let renderer;
      if (invocation.args.length > 1) {
        [level, message] = invocation.args;
        renderer = false;
      } else {
        [{ level, message, renderer }] = invocation.args;
        if (level === 'verbose') {
          level = 'log';
        } else if (level === 'silly') {
          level = 'debug';
        }
      }
      if (this.adminBrowser) {
        this.adminBrowser.webContents.send(LOG_TO_CONSOLE, { level, message, renderer });
      }
      proceed();
    }).proxy();
    const logFormat = printf(info => `[${info.timestamp}] [${info.renderer ? 'R' : 'M'}] [${info.level}]: ${info.message}`); // eslint-disable-line
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
        logLevel
      })]
    });
    if (process.env.NODE_ENV === 'development') {
      winston.add(new winston.transports.Console({ logLevel }));
    }
    const onRendererLog = (event, data) => {
      const { rendererLevel, message } = data;
      winston.log({ level: rendererLevel, message, renderer: true });
    };
    ipcMain.on(LOG_INFO, onRendererLog);
  }

  setAdminBrowser(adminBrowser) {
    this.adminBrowser = adminBrowser;
  }

  error(message) {
    winston.log.call(null, 'error', message);
  }
  warn(message) {
    winston.log.call(null, 'warn', message);
  }
  info(message) {
    winston.log.call(null, 'info', message);
  }
  verbose(message) {
    winston.log.call(null, 'verbose', message);
  }
  debug(message) {
    winston.log.call(null, 'debug', message);
  }
  silly(message) {
    winston.log.call(null, 'silly', message);
  }
}

// module.exports = {
//   Logger: {
//     error: winston.log.bind(null, 'error'),
//     warn: winston.log.bind(null, 'warn'),
//     info: winston.log.bind(null, 'info'),
//     verbose: winston.log.bind(null, 'verbose'),
//     debug: winston.log.bind(null, 'debug'),
//     silly: winston.log.bind(null, 'silly')
//   }
// };

module.exports.Logger = Logger;
