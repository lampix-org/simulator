const { protocol } = require('electron');

const { Logger } = require('./Logger');

const urlToAppInit = (customScheme, redirectUrl) => (customSchemeUrl) => {
  const appName = customSchemeUrl.split('simulator://')[1];
  const pathToServedApp = `${redirectUrl}/${appName}`;

  Logger.verbose(`App name to load: ${appName}`);
  Logger.verbose(`Redirecting to ${pathToServedApp}`);

  return pathToServedApp;
};

const registerSimulatorProtocol = (schemePrefix, redirectUrl) => {
  const urlToApp = urlToAppInit(schemePrefix, redirectUrl);

  protocol.registerHttpProtocol(schemePrefix, (req, callback) => {
    Logger.info(`Handling custom scheme request: ${req.url}`);

    callback({
      method: req.method,
      referrer: req.referrer,
      url: urlToApp(req.url)
    });
  });

  protocol.interceptHttpProtocol(schemePrefix, (req, callback) => {
    Logger.info(`Intercepted custom scheme request ${req.url}`);

    if (req.referrer) {
      Logger.verbose(`Refferer: ${req.referrer}`);
    }

    callback({
      method: req.method,
      referrer: req.referrer,
      url: urlToApp(req.url)
    });
  });
};

exports.registerSimulatorProtocol = registerSimulatorProtocol;
