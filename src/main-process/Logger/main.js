const winston = require('winston');
const { ipcMain } = require('electron');
const { app } = require('electron');

const path = require('path');

const {
  combine,
  timestamp,
} = winston.format;

const { configStore } = require('../config');
const { LOG_R_TO_M, LOG_M_TO_R } = require('../ipcEvents');

const {
  logger,
  format: logFormat
} = require('./config');

const {
  timestampFormat,
  maxsize,
  maxfiles,
} = logger;

const logLevel = configStore.get('logLevel');

// const fileLocation = app.getPath('userData') + '/' + app.getName() + '/lampix-simulator.log';
// console.log('fileLocation ', fileLocation);

class Logger {
  constructor() {
    this._ = winston.createLogger({
      level: logLevel,
      format: combine(
        timestamp({
          format: timestampFormat
        }),
        logFormat
      ),
      transports: [
        new winston.transports.File({
          filename: path.join(app.getPath('appData'), app.getName(), './lampix-simulator.log'),
          maxsize,
          maxfiles
        })
      ]
    });

    ipcMain.on(LOG_R_TO_M, (event, data) => {
      const { level, message } = data;
      this._.log({ level, message, renderer: true });
    });

    if (process.env.NODE_ENV === 'development') {
      this._.add(new winston.transports.Console({ level: logLevel }));
    }
  }

  setAdminBrowser(adminBrowser) {
    this.adminBrowser = adminBrowser;
  }

  _logLevelHighEnough(level) {
    return this._.levels[this._.level] >= this._.levels[level];
  }

  _log(level, message, renderer) {
    if (!this._logLevelHighEnough(level)) {
      return;
    }

    if (this.adminBrowser) {
      try {
        this.adminBrowser.webContents.send(LOG_M_TO_R, { level, message, renderer });
      } catch (err) {
        this.adminBrowser = null;
      }
    }

    this._.log({ level, message, renderer });
  }

  error(message) {
    this._log.call(this, 'error', message, false);
  }

  warn(message) {
    this._log.call(this, 'warn', message, false);
  }

  info(message) {
    this._log.call(this, 'info', message, false);
  }

  verbose(message) {
    this._log.call(this, 'verbose', message, false);
  }

  debug(message) {
    this._log.call(this, 'debug', message, false);
  }

  silly(message) {
    this._log.call(this, 'silly', message, false);
  }
}

module.exports.Logger = Logger;
