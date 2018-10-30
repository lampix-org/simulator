const { protocol } = require('electron');

const { Logger } = require('./Logger');

const registerSimulatorProtocol = (schemePrefix, redirectUrl) => {
  protocol.registerHttpProtocol(schemePrefix, (req, callback) => {
    Logger.info(`Handling custom ${schemePrefix}: scheme`);

    const appName = req.url.split('simulator://')[1];
    const pathToServedApp = `${redirectUrl}/${appName}`;

    Logger.info(`App name to load: ${appName}`);
    Logger.info(`Redirecting to ${pathToServedApp}`);

    callback({
      method: req.method,
      referrer: req.referrer,
      url: pathToServedApp
    });
  });
};

exports.registerSimulatorProtocol = registerSimulatorProtocol;
