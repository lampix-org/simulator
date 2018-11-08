const { URL } = require('url');

const { handleFileScheme } = require('./handleFileScheme');
const { handleSimulatorScheme } = require('./handleSimulatorScheme');
const { handleHttpScheme } = require('./handleHttpScheme');

const handlers = {
  'file:': handleFileScheme,
  'http:': handleHttpScheme,
  'https:': handleHttpScheme,
  'simulator:': handleSimulatorScheme
};

const readsFile = ({
  browser,
  url: inputUrl,
  logger
}) => ({
  async readFile(filename) {
    logger.info('readFile called');

    const url = new URL(inputUrl);
    const handler = handlers[url.protocol];
    const parsedFilename = filename.endsWith('.json') ? filename : `${filename}.json`;

    let data = null;

    try {
      data = await handler(logger, url, parsedFilename);
      browser.webContents
        .executeJavaScript(`onFileRead(null, ${JSON.stringify(filename)}, ${JSON.stringify(data)})`);
    } catch (e) {
      logger.error(e);
      browser.webContents
        .executeJavaScript(`onFileRead(${JSON.stringify(e.toString())}, ${JSON.stringify(filename)}, null)`);
    }
  }
});

exports.readsFile = readsFile;
