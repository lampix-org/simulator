const { remote } = require('electron');

const simulator = remote.getGlobal(`simulator-${global.location.origin}`);

window.addEventListener('mousemove', (event) => {
  simulator.handleMouseMove(event.clientX, event.clientY);
});

window._lampix_internal = {
  registerMovement: (rectangles) => {
    simulator.setMovementRectangles(rectangles);
  },
  registerSimpleClassifier: () => {},
  registerPositionClassifier: () => {}
};
