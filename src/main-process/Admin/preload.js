const { ipcRenderer } = require('electron');
const {
  TOGGLE_MOVEMENT,
  SET_CLASSIFIER,
  SET_RECOGNIZED_CLASS,
  SET_METADATA,
  CLOSE_SIMULATOR,
  FOCUS_SIMULATOR,
  LOAD_APP
} = require('../ipcEvents');

window.ipcRenderer = ipcRenderer;

window.lampix = {
  loadApp: (url) => ipcRenderer.send(LOAD_APP, { url }),
  toggleMovement: (url) => ipcRenderer.send(TOGGLE_MOVEMENT, { url }),
  setClassifier: (url, type, classifier) => ipcRenderer.send(SET_CLASSIFIER, {
    url,
    classifier,
    type
  }),
  setRecognizedClass: (url, type, recognizedClass) => ipcRenderer.send(SET_RECOGNIZED_CLASS, {
    url,
    recognizedClass,
    type
  }),
  setMetadata: (url, type, metadata) => ipcRenderer.send(SET_METADATA, {
    url,
    metadata,
    type
  }),
  closeSimulator: (url) => ipcRenderer.send(CLOSE_SIMULATOR, { url }),
  focusSimulator: (url) => ipcRenderer.send(FOCUS_SIMULATOR, { url })
};
