const {
  printf
} = require('winston').format;
const { format } = require('./format');

module.exports = {
  logger: {
    timestampFormat: 'HH:mm:ss DD-MM-YYYY',
    filename: 'winston.log',
    maxsize: 5000000,
    maxfiles: 2
  },
  format: printf(format)
};
