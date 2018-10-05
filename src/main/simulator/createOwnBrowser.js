const { BrowserView } = require('electron');
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

  let win = newWindow({
    onClosed: () => {
      onClosed();
    },
    options: {
      resizable: false,
    },
    width: simulatorWindowWidth,
    height: simulatorWindowHeight
  });

  let view = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      preload: preloadPath
    }
  });

  win.setBrowserView(view);
  view.setBounds({
    x: 0,
    y: 0,
    width: simulatorWindowWidth,
    height: simulatorWindowHeight
  });

  win.on('closed', () => {
    win = null;

    view.destroy();
    view = null;
  });

  return {
    window: win,
    appBrowser: view
  };
};

exports.createOwnBrowser = createOwnBrowser;
