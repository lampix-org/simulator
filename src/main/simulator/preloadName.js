const preloadName = (isDev) => {
  if (isDev) {
    return 'preload.js';
  }

  return 'preload-simulator.js';
};

exports.preloadName = preloadName;
