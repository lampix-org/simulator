const { ipcRenderer } = require('electron');
const {
  MOUSE_MOVE,
  CLICK,
  RIGHT_CLICK,
  REGISTER_MOVEMENT,
  REGISTER_SIMPLE,
  REGISTER_POSITION
} = require('../ipcEvents');

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
  ipcRenderer.send(CLICK, createClientEventPayload(event));
});

window.addEventListener('contextmenu', (event) => {
  ipcRenderer.send(RIGHT_CLICK, createClientEventPayload(event));
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
  }
};
