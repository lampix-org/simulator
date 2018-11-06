const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');
const path = require('path');
const { app } = require('electron');

const { Logger } = require('./Logger');

const enableFileServing = (port) => {
  const userDataPath = app.getPath('userData');
  const pathToWebapps = path.join(userDataPath, 'webapps');

  const serve = serveStatic(pathToWebapps, { index: ['index.html'] });

  // Create server
  const server = http.createServer((req, res) => {
    serve(req, res, finalhandler(req, res));
  });

  // Listen
  Logger.info(`Simple HTTP server listening on ${port}`);
  server.listen(port);
};

exports.enableFileServing = enableFileServing;
