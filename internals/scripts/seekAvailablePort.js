const { isPortAvailable } = require('./isPortAvailable');

const seekAvailablePort = (port = 5100) => new Promise((resolve) => {
  let usablePort = false;
  let availablePort = port;

  const tick = (available) => {
    usablePort = available;

    if (!usablePort) {
      availablePort += 1;
      seek();
    } else {
      resolve(availablePort);
    }
  };

  function seek() {
    isPortAvailable(availablePort).then(tick);
  }

  seek();
});

exports.seekAvailablePort = seekAvailablePort;
