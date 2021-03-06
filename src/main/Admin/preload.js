const { ipcRenderer } = require('electron');
const {
  TOGGLE_MOVEMENT,
  SET_WATCHER_NAME,
  SET_RECOGNIZED_CLASS,
  SET_METADATA,
  CLOSE_SIMULATOR,
  FOCUS_SIMULATOR,
  LOAD_APP,
  OPEN_DEV_TOOLS,
  CHANGE_CATEGORY_SETTINGS,
  ADD_APP_NAME_URL_ASSOCIATION,
  REMOVE_APP_NAME_URL_ASSOCIATION,
  SAVE_SCALE_FACTOR,
  SAVE_PIX,
  SAVE_USER_DEFINED_CLASSES,
  MINIMIZE_WINDOW,
  MAXIMIZE_WINDOW,
  CLOSE_WINDOW
} = require('../ipcEvents');

const { Logger } = require('../Logger');
const { simulatorKeybindings } = require('./simulatorKeybindings');

window.Logger = Logger;
window.ipcRenderer = ipcRenderer;

if (process.env.NODE_ENV === 'production') {
  window.onbeforeunload = () => false;
}

const payload = (data = {}) => Object.assign(data, {});

window.admin = {
  loadApp: (url) => ipcRenderer.send(LOAD_APP, payload({ url })),
  toggleMovement: (url) => ipcRenderer.send(TOGGLE_MOVEMENT, payload({ url })),
  setWatcherName: (url, watcherName) => ipcRenderer.send(SET_WATCHER_NAME, {
    url,
    watcherName
  }),
  setRecognizedClass: (url, recognizedClass) => ipcRenderer.send(SET_RECOGNIZED_CLASS, {
    url,
    recognizedClass
  }),
  setMetadata: (url, metadata) => ipcRenderer.send(SET_METADATA, {
    url,
    metadata
  }),
  closeSimulator: (url) => ipcRenderer.send(CLOSE_SIMULATOR, payload({ url })),
  focusSimulator: (url) => ipcRenderer.send(FOCUS_SIMULATOR, payload({ url })),
  openDevTools: (url) => ipcRenderer.send(OPEN_DEV_TOOLS, payload({ url })),
  changeCategoryClassifier: (url, watcherName) => ipcRenderer.send(CHANGE_CATEGORY_SETTINGS, payload({
    url,
    watcherName
  })),
  addAssociation: (name, url) => ipcRenderer.send(ADD_APP_NAME_URL_ASSOCIATION, payload({
    name,
    url
  })),
  removeAssociation: (name) => ipcRenderer.send(REMOVE_APP_NAME_URL_ASSOCIATION, name),
  saveScaleFactor: (value) => ipcRenderer.send(SAVE_SCALE_FACTOR, value),
  savePix: (object) => ipcRenderer.send(SAVE_PIX, object),
  saveUserDefinedClasses: (userDefinedClasses) => ipcRenderer.send(SAVE_USER_DEFINED_CLASSES, userDefinedClasses),
  quit: () => ipcRenderer.send(CLOSE_WINDOW),
  minimize: () => ipcRenderer.send(MINIMIZE_WINDOW),
  maximize: () => ipcRenderer.send(MAXIMIZE_WINDOW)
};

simulatorKeybindings(ipcRenderer, payload);
