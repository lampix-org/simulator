const path = require('path');

const { getPathFromFileUrl } = require('../../../utils/getPathFromFileUrl');
const { readJsonFromFile } = require('./readJsonFromFile');

const handleFileScheme = async (logger, url, filename) => {
  const appPath = getPathFromFileUrl(url);
  const pathToFile = path.join(appPath, filename);

  const data = await readJsonFromFile(pathToFile);
  return data;
};

exports.handleFileScheme = handleFileScheme;
