const { checkHTTPConnection } = require('../utils/checkHTTPConnection');
const { URL } = require('url');
const { Logger } = require('../Logger');
const {
  MAIN_PROCESS_INFO_LOG_OBJ
} = require('../constants');

const respond = (success, error) => ({
  success,
  error
});

async function checkURL(inputURL) {
  try {
    const url = new URL(inputURL);

    // If the file is server locally, then assume everything's good
    if (url.protocol === 'file:') {
      MAIN_PROCESS_INFO_LOG_OBJ.message = 'File protocol, not doing extra checks, assuming valid URL';
      Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
      return respond(true);
    }
    MAIN_PROCESS_INFO_LOG_OBJ.message = `Attempting to connect to ${url.href}`;
    Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
    await checkHTTPConnection(url.href);
    MAIN_PROCESS_INFO_LOG_OBJ.message = 'Connection check passed, assuming valid URL';
    Logger.log(MAIN_PROCESS_INFO_LOG_OBJ);
    return respond(true);
  } catch (err) {
    return respond(false, err.message);
  }
}

exports.checkURL = checkURL;
