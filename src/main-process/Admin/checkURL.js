const { checkHTTPConnection } = require('../utils/checkHTTPConnection');
const { URL } = require('url');
const { Logger } = require('../Logger');

const respond = (success, error) => ({
  success,
  error
});

async function checkURL(inputURL) {
  try {
    const url = new URL(inputURL);

    // If the file is server locally, then assume everything's good
    if (url.protocol === 'file:') {
      Logger.debug('File protocol, not doing extra checks, assuming valid URL');
      return respond(true);
    }
    Logger.debug(`Attempting to connect to ${url.href}`);
    await checkHTTPConnection(url.href);
    Logger.debug('Connection check passed, assuming valid URL');
    return respond(true);
  } catch (err) {
    return respond(false, err.message);
  }
}

exports.checkURL = checkURL;
