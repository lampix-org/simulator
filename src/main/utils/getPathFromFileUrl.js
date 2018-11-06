const { URL } = require('url');

const getPathFromFileUrl = (fileUrl) => {
  const url = fileUrl instanceof URL ? fileUrl : new URL(fileUrl);
  const urlWithoutSearchParams = url.href.split('?')[0];
  let appPath = urlWithoutSearchParams.replace('file://', '');

  if (appPath.includes('index.html')) {
    const lastIndex = appPath.lastIndexOf('index.html');
    appPath = appPath.slice(0, lastIndex);
  }

  if (appPath[appPath.length - 1] === '/') {
    appPath = appPath.slice(0, -1);
  }

  return appPath;
};

exports.getPathFromFileUrl = getPathFromFileUrl;
