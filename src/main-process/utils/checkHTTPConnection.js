const request = require('request');
const { Logger } = require('../Logger');

const checkHTTPConnection = (url) => new Promise((resolve, reject) => {
  const options = {
    method: 'HEAD',
  };

  request(url, options, (err, res) => {
    if (err) {
      Logger.error(`Attempt to reach server at ${url} failed`);
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
