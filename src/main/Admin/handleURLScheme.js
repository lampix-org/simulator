const { checkHTTPConnection } = require('../utils/checkHTTPConnection');
const { checkHTMLFileExistence } = require('../utils/checkHTMLFileExistence');
const { URL } = require('url');

const respond = (success, error, url) => ({
  success,
  error,
  url: url || null
});

const acceptedProtocols = [
  'file:',
  'http:',
  'https:',
  'simulator:'
];

async function handleURLScheme(inputURL, localServerOrigin) {
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

    if (url.protocol === 'simulator:') {
      await checkHTTPConnection(new URL(`${localServerOrigin}/${url.host}`));
      return respond(true, null, url);
    }

    throw new Error(`Expected ${acceptedProtocols.join(', ')} protocols, but got ${url.protocol}`);
  } catch (err) {
    return respond(false, err.message);
  }
}

exports.handleURLScheme = handleURLScheme;
