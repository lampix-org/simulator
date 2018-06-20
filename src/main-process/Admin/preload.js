const { ipcRenderer } = require('electron');
const {
  TOGGLE_MOVEMENT,
  SET_CLASSIFIER,
  SET_RECOGNIZED_CLASS,
  SET_METADATA,
  CLOSE_SIMULATOR,
  FOCUS_SIMULATOR,
  LOAD_APP,
  OPEN_DEV_TOOLS,
  CHANGE_CATEGORY_SETTINGS,
  ADD_APP_NAME_URL_ASSOCIATION,
  REMOVE_APP_NAME_URL_ASSOCIATION
} = require('../ipcEvents');

window.Logger = require('../Logger');

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
  focusSimulator: (url) => ipcRenderer.send(FOCUS_SIMULATOR, { url }),
  openDevTools: (url) => ipcRenderer.send(OPEN_DEV_TOOLS, { url }),
  changeCategoryClassifier: (url, category, classifier) => ipcRenderer.send(CHANGE_CATEGORY_SETTINGS, {
    url,
    category,
    classifier
  }),
  addAssociation: (name, url) => ipcRenderer.send(ADD_APP_NAME_URL_ASSOCIATION, {
    name,
    url
  }),
  removeAssociation: (name) => ipcRenderer.send(REMOVE_APP_NAME_URL_ASSOCIATION, name)
};
