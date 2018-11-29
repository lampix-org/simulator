const { BrowserView } = require('electron');
const { newWindow } = require('../utils/newWindow');

const createOwnBrowser = ({
  configStore,
  simulationPreload,
  windowPreload,
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
      webPreferences: {
        preload: windowPreload
      }
    },
    width: simulatorWindowWidth,
    height: simulatorWindowHeight + 25
  });

  let view = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      preload: simulationPreload
    }
  });

  win.setBrowserView(view);
  view.setBounds({
    x: 0,
    y: 25,
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
