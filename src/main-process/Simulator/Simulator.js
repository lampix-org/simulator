const { AppSettings } = require('../AppSettings');
const { hexagonOutline } = require('../utils/hexagonOutline');
const { hexagonInRect } = require('../utils/hexagonInRect');
const { onChange } = require('../utils/onChange');
const { type } = require('../utils/type');

class Simulator {
  constructor(browser, url) {
    this.appUrl = url;
    this.browser = browser;

    const settings = new AppSettings(url);
    this.settings = onChange(settings, () => settings.save());

    this.rectangles = {
      movement: [],
      simple: [],
      position: []
    };

    global[`simulator-${url}`] = this;
  }

  handleMouseMove(mouseX, mouseY) {
    if (!this.settings.movementDetector || this.rectangles.movement.length === 0) {
      return;
    }

    const hexagon = hexagonOutline(mouseX, mouseY);

    this.rectangles.movement.forEach((rectangle, i) => {
      if (hexagonInRect(hexagon, rectangle)) {
        this.browser.webContents.executeJavaScript(`onMovement(${i}, ${hexagon})`);
      }
    });
  }

  toggleMouseMovement() {
    this.settings.movementDetector = !this.settings.movementDetector;
  }

  setMovementRectangles(data = []) {
    let rectangles = data;

    if (type(rectangles) === 'String') {
      rectangles = JSON.parse(rectangles);
    }

    this.rectangles.movement = rectangles;
  }
}

exports.Simulator = Simulator;
