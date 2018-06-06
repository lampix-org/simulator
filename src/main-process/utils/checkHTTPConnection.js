const request = require('request');
const { Logger } = require('../Logger');
const {
  MAIN_PROCESS_ERROR_LOG_OBJ
} = require('../constants');

const checkHTTPConnection = (url) => new Promise((resolve, reject) => {
  const options = {
    method: 'HEAD',
  };

  request(url, options, (err, res) => {
    if (err) {
      // console.log(`Attempt to reach server at ${url} failed`);
      MAIN_PROCESS_ERROR_LOG_OBJ.message = `Attempt to reach server at ${url} failed`;
      Logger.log(MAIN_PROCESS_ERROR_LOG_OBJ);
      reject(err);
      return;
    }

    if (res.statusCode >= 200 && res.statusCode <= 299) {
      resolve();
    } else {
      reject(new Error(`Server responded with status code ${res.statusCode}. Expected value between 200 and 299.`));
    }
  });
});

exports.checkHTTPConnection = checkHTTPConnection;
