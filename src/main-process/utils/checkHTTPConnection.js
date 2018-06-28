const request = require('request');

const checkHTTPConnection = (url) => new Promise((resolve, reject) => {
  const options = {
    method: 'HEAD',
  };

  console.log(`Attempting to connect to ${url.href}`);
  request(url.href, options, (err, res) => {
    if (err) {
      console.log(`Attempt to reach server at ${url} failed`);

      reject(err);
      return;
    }

    if (res.statusCode >= 200 && res.statusCode <= 299) {
      console.log('Connection check passed, assuming valid URL');
      resolve();
    } else {
      reject(new Error(`Server responded with status code ${res.statusCode}. Expected value between 200 and 299.`));
    }
  });
});

exports.checkHTTPConnection = checkHTTPConnection;
