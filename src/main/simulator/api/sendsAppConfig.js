const { URL } = require('url');
const { promisify } = require('util');
const fs = require('fs');
const request = require('request');

const readFile = promisify(fs.readFile);
const access = promisify(fs.access);

const handleFileScheme = async (url) => {
  const urlWithoutSearchParams = url.href.split('?')[0];
  let appPath = urlWithoutSearchParams.replace('file://', '');

  if (appPath.includes('index.html')) {
    const lastIndex = appPath.lastIndexOf('index.html');
    appPath = appPath.slice(0, lastIndex);
  }


  const configJsonPath = `${appPath}/config.json`;
  let config = null;

  // Check if the file exists in the specified directory.
  const doesNotExist = !!await access(configJsonPath, fs.constants.F_OK);
  if (doesNotExist) {
    return config;
  }

  config = await readFile(configJsonPath, { encoding: 'utf8' });

  try {
    config = JSON.parse(config);
  } catch (e) {
    config = null;
  }

  return config;
};

const requestConfigJson = (url) => new Promise((resolve) => {
  request(url, (err, res, body) => {
    let data = null;

    if (!err && res.statusCode === 200) {
      try {
        data = JSON.parse(body);
      } catch (e) {
        data = null;
      }
    }

    resolve(data);
  });
});

const handleSimulatorScheme = async (url, localServerOrigin) => {
  const { host: appName } = url;

  const configJsonUrl = `${localServerOrigin}/${appName}/config.json`;
  const config = await requestConfigJson(configJsonUrl);

  return config;
};

const handleHttpScheme = async (url) => {
  const { origin } = url;

  const configJsonUrl = `${origin}/config.json`;
  const config = await requestConfigJson(configJsonUrl);

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
  localServerOrigin
}) => ({
  sendAppConfig() {
    const url = new URL(inputUrl);
    const handler = handlers[url.protocol];

    handler(url, localServerOrigin)
      .then((config) => {
        browser.webContents
          .executeJavaScript(`onAppConfig(${JSON.stringify(config)})`);
      });
  }
});

exports.sendsAppConfig = sendsAppConfig;
