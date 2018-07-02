
const { Logger } = require('./main');

if (process.type && process.type === 'browser') {
  const log = new Logger();
  module.exports.Logger = log;
  // module.exports = require('./main');
} else {
  module.exports = require('./renderer');
}
