const { ipcRenderer } = require('electron');
const {
  MOUSE_MOVE,
  SIMPLE_CLICK,
  POSITION_CLICK,
  REGISTER_MOVEMENT,
  REGISTER_SIMPLE,
  REGISTER_POSITION,
  GET_LAMPIX_INFO,
  TRANSFORM_COORDINATES,
  GET_APPS,
  SWITCH_TO_APP
} = require('../../../ipcEvents');
const { Logger } = require('../../../Logger');


window.ipcRenderer = ipcRenderer;

const urlQueryParams = new URLSearchParams(global.location.search);
const appUrl = urlQueryParams.get('url');

const logRegisteredAreas = (rectangles) => {
  Logger.verbose('Data to register:');
  Logger.verbose(JSON.stringify(rectangles, null, 2));
};

const createClientEventPayload = (event) => ({
  url: appUrl,
  mouseX: event.clientX,
  mouseY: event.clientY
});

const createRegisterPayload = (rectangles) => ({
  url: appUrl,
  rectangles
});

window.addEventListener('mousemove', (event) => {
  ipcRenderer.send(MOUSE_MOVE, createClientEventPayload(event));
});

window.addEventListener('click', (event) => {
  ipcRenderer.send(SIMPLE_CLICK, createClientEventPayload(event));
});

window.addEventListener('contextmenu', (event) => {
  ipcRenderer.send(POSITION_CLICK, createClientEventPayload(event));
});

window._lampix_internal = {
  registerMovement: (rectangles) => {
    Logger.info('registerMovement called');
    logRegisteredAreas(rectangles);
    ipcRenderer.send(REGISTER_MOVEMENT, createRegisterPayload(rectangles));
  },
  registerSimpleClassifier: (rectangles) => {
    Logger.info('registerSimpleClassifier called');
    logRegisteredAreas(rectangles);
    ipcRenderer.send(REGISTER_SIMPLE, createRegisterPayload(rectangles));
  },
  registerPositionClassifier: (rectangles) => {
    Logger.info('registerPositionClassifier called');
    logRegisteredAreas(rectangles);
    ipcRenderer.send(REGISTER_POSITION, createRegisterPayload(rectangles));
  },
  getLampixInfo: () => ipcRenderer.send(GET_LAMPIX_INFO, {
    url: appUrl
  }),
  transformCoordinates: (rect) => ipcRenderer.send(TRANSFORM_COORDINATES, {
    url: appUrl,
    rect
  }),
  getApps: () => ipcRenderer.send(GET_APPS, {
    url: appUrl
  }),
  switchToApp: (newApp) => ipcRenderer.send(SWITCH_TO_APP, {
    toClose: appUrl,
    toOpen: newApp
  })
};
