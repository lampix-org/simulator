const { remote, ipcRenderer } = require('electron');
const {
  TOGGLE_MOVEMENT,
  SET_CLASSIFIER,
  SET_RECOGNIZED_CLASS,
  SET_METADATA
} = require('../ipcEvents');

const { admin } = remote.require('./Admin');

window.lampix = {
  loadApp: (url) => admin.loadApp(url),
  toggleMovement: (url) => ipcRenderer.send(TOGGLE_MOVEMENT, { url }),
  setClassifier: (url, classifier) => ipcRenderer.send(SET_CLASSIFIER, {
    url,
    classifier
  }),
  setRecognizedClass: (url, recognizedClass) => ipcRenderer.send(SET_RECOGNIZED_CLASS, {
    url,
    recognizedClass
  }),
  setMetadata: (url, metadata) => ipcRenderer.send(SET_METADATA, {
    url,
    metadata
  }),
  closeSimulator: (url) => {
    admin.closeSimulator(url);
    admin.sendSimulators();
  },
  focusSimulator: (url) => admin.focusSimulator(url)
};
