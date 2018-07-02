const { checkHTTPConnection } = require('../utils/checkHTTPConnection');
const { checkHTMLFileExistence } = require('../utils/checkHTMLFileExistence');
const { URL } = require('url');

const respond = (success, error, url) => ({
  success,
  error,
  url: decodeURIComponent(url.href)
});

async function checkURL(inputURL) {
  try {
    const url = new URL(inputURL);

    if (url.protocol === 'file:') {
      const parsedURL = await checkHTMLFileExistence(url);
      return respond(true, null, parsedURL);
    }

    if (url.protocol === 'http:' || url.protocol === 'https:') {
      await checkHTTPConnection(url);
      return respond(true, null, url);
    }

    throw new Error('Expected file, http or https protocols');
  } catch (err) {
    return respond(false, err.message);
  }
}

exports.checkURL = checkURL;
