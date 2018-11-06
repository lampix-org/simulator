const { URL, resolve: urlResolve } = require('url');
const { promisify } = require('util');
const fs = require('fs');
const got = require('got');

const { getPathFromFileUrl } = require('../../utils/getPathFromFileUrl');

const readFile = promisify(fs.readFile);

const requestConfigJson = async (logger, url) => {
  let data = null;
  try {
    const res = await got.get(url);
    data = JSON.parse(res.body);
  } catch (e) {
    data = null;
  }

  return data;
};

const handleFileScheme = async (logger, url) => {
  const appPath = getPathFromFileUrl(url);

  const configJsonPath = `${appPath}/config.json`;
  let config = null;

  try {
    config = await readFile(configJsonPath, { encoding: 'utf8' });
    config = JSON.parse(config);
  } catch (e) {
    logger.error(e);
    config = null;
  }

  return config;
};

const handleSimulatorScheme = async (logger, url, localServerOrigin) => {
  const { host: appName } = url;

  const configJsonUrl = urlResolve(localServerOrigin, appName, 'config.json');
  const config = await requestConfigJson(logger, configJsonUrl);

  return config;
};

const handleHttpScheme = async (logger, url) => {
  const { origin } = url;

  const configJsonUrl = `${origin}/config.json`;
  const config = await requestConfigJson(logger, configJsonUrl);

  return config;
};

const handlers = {
  'file:': handleFileScheme,
  'simulator:': handleSimulatorScheme,
  'http:': handleHttpScheme,
  'https:': handleHttpScheme
};

const sendsAppConfig = ({
  browser,
  url: inputUrl,
  localServerOrigin,
  logger
}) => ({
  sendAppConfig() {
    const url = new URL(inputUrl);
    const handler = handlers[url.protocol];

    logger.info(`sendAppConfig: Handling scheme ${url.protocol}`);

    handler(logger, url, localServerOrigin)
      .then((config) => {
        browser.webContents
          .executeJavaScript(`onAppConfig(${JSON.stringify(config)})`);
      });
  }
});

exports.sendsAppConfig = sendsAppConfig;
