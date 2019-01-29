const got = require('got');
const { Logger } = require('../Logger');

const checkHTTPConnection = async (url) => {
  Logger.info(`Attempting to connect to ${url.href}`);
  try {
    const res = await got.get(url.href);

    if (res.statusCode >= 200 && res.statusCode <= 299) {
      Logger.info('Connection check passed, assuming valid URL');
      return;
    }

    throw new Error(`Server responded with status code ${res.statusCode}. Expected value between 200 and 299.`);
  } catch (error) {
    Logger.error(`Attempt to reach server at ${url} failed`);
    throw error;
  }
};

exports.checkHTTPConnection = checkHTTPConnection;
