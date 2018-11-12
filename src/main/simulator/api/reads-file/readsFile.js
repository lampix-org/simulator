const { URL } = require('url');

const { handleFileScheme } = require('./handleFileScheme');
const { handleSimulatorScheme } = require('./handleSimulatorScheme');
const { handleHttpScheme } = require('./handleHttpScheme');
const { response } = require('../response');
const { respond } = require('../respond');

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
  async readFile(requestJson) {
    logger.info('readFile called');

    const req = JSON.parse(requestJson);
    const { filename } = req.data;
    const url = new URL(inputUrl);
    const handler = handlers[url.protocol];
    const parsedFilename = filename.endsWith('.json') ? filename : `${filename}.json`;

    let data = null;
    let error = null;

    try {
      data = await handler(logger, url, parsedFilename);
    } catch (e) {
      logger.error(e);
      error = e.toString();
    }

    const res = response(req.requestId, error, {
      data
    });

    respond(browser, req, res);
  }
});

exports.readsFile = readsFile;
