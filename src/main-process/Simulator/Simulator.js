const { AppSettings } = require('../AppSettings');
const { hexagonOutline } = require('../utils/hexagonOutline');
const { hexagonInRect } = require('../utils/hexagonInRect');
const { inRectangle } = require('../utils/inRectangle');
const { onChange } = require('../utils/onChange');
const { type } = require('../utils/type');

const parseIfString = (data) => {
  if (type(data) === 'String') {
    return JSON.parse(data);
  }

  return data;
};

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

  handleSimpleClassifier(mouseX, mouseY) {
    this.rectangles.simple.forEach((rectangle, i) => {
      if (inRectangle(rectangle, mouseX, mouseY)) {
        const { recognizedClass, metadata } = this.settings;
        this.browser.webContents.executeJavaScript(`onSimpleClassifier(${i}, '${recognizedClass}', '${metadata}')`);
      }
    });
  }

  toggleMouseMovement() {
    this.settings.movementDetector = !this.settings.movementDetector;
  }

  setMovementRectangles(data = []) {
    this.rectangles.movement = parseIfString(data);
  }

  setSimpleRectangles(data = []) {
    this.rectangles.simple = parseIfString(data);
  }
}

exports.Simulator = Simulator;
