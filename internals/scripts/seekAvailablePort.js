const { isPortAvailable } = require('./isPortAvailable');

const seekAvailablePort = (port = 5100) => new Promise((resolve) => {
  let availablePort = port;

  const tick = (available) => {
    if (!available) {
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
