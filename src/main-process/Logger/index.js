
const { Logger } = require('./main');

if (process.type && process.type === 'browser') {
  exports.Logger = new Logger();
} else {
  exports.Logger = require('./renderer');
}
