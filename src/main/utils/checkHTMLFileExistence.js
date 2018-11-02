const path = require('path');
const fs = require('fs');
const { URL } = require('url');
const { Logger } = require('../Logger');

const errors = {
  invalidPath: 'Specified path does not exist',
  invalidFile: 'Not an HTML file or no index.html in specified directory'
};

const checkHTMLFileExistence = (url) => new Promise((resolve, reject) => {
  const lastPath = url.pathname.split('/').pop();
  const isHTML = path.extname(lastPath) === '.html';
  const pathExists = fs.existsSync(url);
  let fileOkay = pathExists && isHTML;
  let assumedURL = url;

  // Message ignored if fileOkay
  // Useful in case !fileOkay && !(pathExists && !isHTML)
  // Changed in case !pathExists to appropriate message
  let errorMessage = errors.invalidFile;

  if (pathExists && !isHTML) {
    Logger.info('Assuming path is a directory. Checking for index.html');

    // Assume directory was dropped instead of file, check for index.html existence
    assumedURL = new URL('index.html', url);
    fileOkay = fs.existsSync(assumedURL);
  }

  if (!pathExists) {
    Logger.error(errors.invalidPath);
    errorMessage = errors.invalidPath;
  }

  if (fileOkay) {
    Logger.info('Specified path okay. Attempting to load local HTML file...');
    resolve(assumedURL);
  } else {
    reject(new Error(errorMessage));
  }
});

exports.checkHTMLFileExistence = checkHTMLFileExistence;
