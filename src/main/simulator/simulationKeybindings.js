const mousetrap = require('mousetrap');
const {
  OPEN_DEV_TOOLS,
  RELOAD_SIMULATION,
  CLOSE_WINDOW
} = require('../ipcEvents');

const simulationKeybindings = (ipcRenderer, payloadFn) => {
  mousetrap.bind(['command+shift+i', 'ctrl+shift+i'], () => {
    ipcRenderer.send(OPEN_DEV_TOOLS, payloadFn());
    return false;
  });

  mousetrap.bind(['ctrl+r'], () => {
    ipcRenderer.send(RELOAD_SIMULATION, payloadFn());
    return false;
  });

  mousetrap.bind(['command+q', 'ctrl+q'], () => {
    ipcRenderer.send(CLOSE_WINDOW, payloadFn());
  });
};

exports.simulationKeybindings = simulationKeybindings;
