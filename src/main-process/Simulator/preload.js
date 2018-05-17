const { ipcRenderer } = require('electron');
const {
  MOUSE_MOVE,
  SIMPLE_CLICK,
  POSITION_CLICK,
  REGISTER_MOVEMENT,
  REGISTER_SIMPLE,
  REGISTER_POSITION,
  GET_LAMPIX_INFO
} = require('../ipcEvents');

window.ipcRenderer = ipcRenderer;

const createClientEventPayload = (event) => ({
  url: global.location.origin,
  mouseX: event.clientX,
  mouseY: event.clientY
});

const createRegisterPayload = (rectangles) => ({
  url: global.location.origin,
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
    url: global.location.origin
  })
};
