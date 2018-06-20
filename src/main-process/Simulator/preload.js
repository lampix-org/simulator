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
} = require('../ipcEvents');


window.ipcRenderer = ipcRenderer;

const urlQueryParams = new URLSearchParams(global.location.search);
const appUrl = urlQueryParams.get('url');

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
    ipcRenderer.send(REGISTER_MOVEMENT, createRegisterPayload(rectangles));
  },
  registerSimpleClassifier: (rectangles) => {
    ipcRenderer.send(REGISTER_SIMPLE, createRegisterPayload(rectangles));
  },
  registerPositionClassifier: (rectangles) => {
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
  /**
   * The switchToApp method receives an app NAME or a URL
   *
   * NOTE: Currently, it will take app names into account only after the implementation of
   * task 92862
   * @param {string} app
   */
  switchToApp: (newApp) => ipcRenderer.send(SWITCH_TO_APP, {
    toClose: appUrl,
    toOpen: newApp
  })
};
