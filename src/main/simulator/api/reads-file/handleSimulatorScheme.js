const path = require('path');
const {
  WEBAPPS_DATA_PATH
} = require('../../../constants');

const { readJsonFromFile } = require('./readJsonFromFile');

const handleSimulatorScheme = async (logger, url, filename) => {
  const { host: appName } = url;

  const pathToFile = path.join(WEBAPPS_DATA_PATH, appName, filename);
  const data = await readJsonFromFile(pathToFile);
  return data;
};

exports.handleSimulatorScheme = handleSimulatorScheme;
