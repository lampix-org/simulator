
const { Logger } = require('./main');

if (process.type && process.type === 'browser') {
  module.exports.Logger = new Logger();
} else {
  module.exports = require('./renderer');
}
