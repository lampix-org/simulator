const { newWindow } = require('../utils/newWindow');

const createOwnBrowser = ({
  configStore,
  preloadPath,
  onClosed
}) => {
  const {
    width: simulatorWindowWidth,
    height: simulatorWindowHeight
  } = configStore.get('simulator.viewport');

  return newWindow({
    onClosed: () => {
      onClosed();
    },
    options: {
      resizable: false,
      webPreferences: {
        preload: preloadPath
      }
    },
    width: simulatorWindowWidth,
    height: simulatorWindowHeight
  });
};

exports.createOwnBrowser = createOwnBrowser;
