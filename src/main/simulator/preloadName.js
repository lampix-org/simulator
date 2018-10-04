const preloadName = (isDev, version) => {
  if (isDev) {
    return 'preload.js';
  }

  return `preload-simulator-${version}.js`;
};

exports.preloadName = preloadName;
