const { appSettings } = require('../AppSettings');
const { browserWindowManager } = require('../BrowserWindowManager');
const { admin } = require('../Admin');
const { hexagonOutline } = require('../utils/hexagonOutline');
const { hexagonInRect } = require('../utils/hexagonInRect');

class Simulator {
  constructor() {
    this.rectangles = {
      movement: [],
      simple: [],
      position: []
    };
  }

  handleMouseMove(event) {
    if (!appSettings.current.movementDetector) {
      return;
    }

    const hexagon = hexagonOutline(event.pageX, event.pageY);
    const { windows } = browserWindowManager;

    this.rectangles.movement.forEach((rectangle, i) => {
      if (hexagonInRect(hexagon, rectangle)) {
        windows[admin.appBrowserName].webContents.executeJavaScript(`onMovement(${i}, ${hexagon})`);
      }
    });
  }
}

module.exports = Simulator;
