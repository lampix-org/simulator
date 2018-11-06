const { promisify } = require('util');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');

const { getPathFromFileUrl } = require('../../utils/getPathFromFileUrl');

const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);

const {
  WEBAPPS_DATA_PATH
} = require('../../constants');

const createWebappDataDir = async (logger, appName) => {
  const appDir = path.join(WEBAPPS_DATA_PATH, appName);

  try {
    // Check if directory exists
    logger.info(`Checking if ${appDir} exists`);
    await access(appDir, fs.constants.F_OK);
  } catch (e) {
    // No directory found, create it
    logger.info(`${appDir} not found, creating`);
    await mkdir(appDir);
  }
};

const write = async (dest, data) => {
  try {
    await writeFile(dest, data, 'utf8');
    return;
  } catch (e) {
    throw e;
  }
};

const handleWritingToFile = async (logger, appName, filename, data) => {
  try {
    await createWebappDataDir(logger, appName);
  } catch (e) {
    if (e.code !== 'EEXIST') {
      logger.error(e);
      throw e;
    } else {
      logger.info(`Data folder for ${appName} exists`);
    }
  }

  try {
    const dest = path.join(WEBAPPS_DATA_PATH, appName, filename);
    await write(dest, data);
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

const handleFileScheme = async (logger, url, filename, data) => {
  const appPath = getPathFromFileUrl(url);
  const dest = path.join(appPath, filename);

  await write(dest, data);
};

const handleSimulatorScheme = async (logger, url, filename, data) => {
  const { host: appName } = url;
  await handleWritingToFile(logger, appName, filename, data);
};

const handleHttpScheme = async (logger, url, filename, data) => {
  const appName = url.searchParams.get('simulated-app-name');

  if (!appName) {
    Promise.reject(new Error(`Search param simulated-app-name not specified in ${url}`));
  }

  await handleWritingToFile(logger, appName, filename, data);
};

const handlers = {
  'file:': handleFileScheme,
  'simulator:': handleSimulatorScheme,
  'http:': handleHttpScheme,
  'https:': handleHttpScheme
};

const writesFile = ({
  browser,
  url: inputUrl,
  logger
}) => ({
  async writeFile(filename, data) {
    try {
      // Check if JSON is valid
      JSON.parse(data);

      const url = new URL(inputUrl);
      const handler = handlers[url.protocol];
      const parsedFilename = filename.endsWith('.json') ? filename : `${filename}.json`;

      logger.info(`writeFile: Handling scheme ${url.protocol}`);

      await handler(logger, url, parsedFilename, data);
      browser.webContents
        .executeJavaScript(`onFileWritten(null, ${JSON.stringify(filename)})`);
    } catch (e) {
      logger.error(e);

      browser.webContents
        .executeJavaScript(`onFileWritten(${JSON.stringify(e.toString())}, ${JSON.stringify(filename)})`);
    }
  }
});

exports.writesFile = writesFile;
