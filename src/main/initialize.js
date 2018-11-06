const { app } = require('electron');
const fs = require('fs');
const path = require('path');

const userDataPath = app.getPath('userData');
const pathToWebapps = path.join(userDataPath, 'webapps');
const pathToWebappsData = path.join(userDataPath, 'webapps-data');

const initialize = () => {
  // Create webapps folder if it doesn't exist
  if (!fs.existsSync(pathToWebapps)) {
    fs.mkdirSync(pathToWebapps);
  }

  // Create webapps-data folder if it doesn't exist
  if (!fs.existsSync(pathToWebappsData)) {
    fs.mkdirSync(pathToWebappsData);
  }
};

exports.initialize = initialize;
