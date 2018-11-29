const { ipcRenderer } = require('electron');
const {
  CLOSE_WINDOW,
  MINIMIZE_WINDOW
} = require('../ipcEvents');

window.ipcRenderer = ipcRenderer;

const urlQueryParams = new URLSearchParams(global.location.search);
const windowId = Number(urlQueryParams.get('windowId'));

const payload = (data = {}) => Object.assign(data, {
  windowId
});

window.admin = {
  quit: () => ipcRenderer.send(CLOSE_WINDOW, payload()),
  minimize: () => ipcRenderer.send(MINIMIZE_WINDOW, payload())
};
