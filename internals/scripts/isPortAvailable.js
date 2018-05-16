const net = require('net');

const isPortAvailable = (port) => new Promise((resolve) => {
  const server = net.createServer();

  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      resolve(false);
    }
  });

  server.once('listening', () => {
    server.close();
    resolve(true);
  });

  server.listen(port);
});

exports.isPortAvailable = isPortAvailable;
