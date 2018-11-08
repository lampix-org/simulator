const path = require('path');
const {
  WEBAPPS_DATA_PATH
} = require('../../../constants');

const { readJsonFromFile } = require('./readJsonFromFile');

const handleHttpScheme = async (logger, url, filename) => {
  const appName = url.searchParams.get('simulated-app-name');

  if (!appName) {
    throw new Error(`Search param simulated-app-name not specified in ${url}`);
  }

  const pathToFile = path.join(WEBAPPS_DATA_PATH, appName, filename);
  const data = await readJsonFromFile(pathToFile);
  return data;
};

exports.handleHttpScheme = handleHttpScheme;
