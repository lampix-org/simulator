const mousetrap = require('mousetrap');
const {
  CLOSE_WINDOW
} = require('../ipcEvents');

const simulatorKeybindings = (ipcRenderer, payloadFn) => {
  mousetrap.bind(['command+q', 'ctrl+q'], () => {
    ipcRenderer.send(CLOSE_WINDOW, payloadFn());
  });
};

exports.simulatorKeybindings = simulatorKeybindings;
