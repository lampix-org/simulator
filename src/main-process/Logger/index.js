
if (process.type && process.type === 'browser') {
  module.exports = require('./main');
} else {
  module.exports = require('./renderer');
}
