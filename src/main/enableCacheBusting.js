const { session } = require('electron');

const enableCacheBusting = () => {
  const filter = {
    urls: [
      'http://*',
      'https://*',
      'file://*',
      'simulator://*'
    ]
  };

  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    details.requestHeaders['Pragma'] = 'no-cache'; // eslint-disable-line
    details.requestHeaders['Expires'] = '0'; // eslint-disable-line

    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
};

exports.enableCacheBusting = enableCacheBusting;
