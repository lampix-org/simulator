const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const readJsonFromFile = async (pathToFile) => {
  let data = null;

  const body = await readFile(pathToFile, { encoding: 'utf8' });
  data = JSON.parse(body);

  return data;
};

exports.readJsonFromFile = readJsonFromFile;
