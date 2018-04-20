const { AppSettings } = require('../AppSettings');
const { paperOutline } = require('../utils/paperOutline');
const { hexagonOutline } = require('../utils/hexagonOutline');
const { outlineInRectangle } = require('../utils/outlineInRectangle');
const { pointInRectangle } = require('../utils/pointInRectangle');
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

    this.idCounter = 0;
  }

  handleMouseMove(mouseX, mouseY) {
    if (!this.settings.movementDetector || this.rectangles.movement.length === 0) {
      return;
    }

    const hexagon = hexagonOutline(mouseX, mouseY);

    this.rectangles.movement.forEach((rectangle, i) => {
      if (outlineInRectangle(hexagon, rectangle)) {
        this.browser.webContents.executeJavaScript(`onMovement(${i}, ${hexagon})`);
      }
    });
  }

  handleSimpleClassifier(mouseX, mouseY) {
    console.log(`Handling click / simple classification at x: ${mouseX}, y: ${mouseY}`);

    this.rectangles.simple.forEach((rectangle, i) => {
      const { classifier, recognizedClass, metadata } = this.settings.simple;

      if (rectangle.classifier === classifier && pointInRectangle(rectangle, mouseX, mouseY)) {
        console.log('Point in rectangle, calling onSimpleClassifier in the browser window');
        this.browser.webContents.executeJavaScript(`onSimpleClassifier(${i}, '${recognizedClass}', '${metadata}')`);
      }
    });
  }

  handlePositionClassifier(mouseX, mouseY) {
    console.log(`Handling right click / position classification at x: ${mouseX}, y: ${mouseY}`);

    const {
      classifier,
      recognizedClass,
      metadata
    } = this.settings.position;
    let outline = [];

    if (classifier === 'paper') {
      outline = paperOutline(mouseX, mouseY);
    } else {
      outline = hexagonOutline(mouseX, mouseY);
    }

    // Lampix creates IDs iteratively, and never repeats them
    const objectId = ++this.idCounter;

    this.rectangles.position.forEach((rectangle, i) => {
      if (rectangle.classifier !== classifier) {
        return;
      }

      const data = [];

      if (outlineInRectangle(outline, rectangle)) {
        console.log('Outline in rectangle, calling onPrePositionClassifier, then onPositionClassifier in the browser window'); // eslint-disable-line

        /**
         * The preposition callback doesn't have the classTag attribute because
         * it's launched before the classification is complete
         */
        data.push({
          objectId,
          centerPoint: {
            posX: mouseX,
            posY: mouseY
          },
          outline
        });

        this.browser.webContents.executeJavaScript(`onPrePositionClassifier(${i}, ${JSON.stringify(data)})`);

        // TODO: Make the time of this timeout configurable
        setTimeout(() => {
          data[data.length - 1].classTag = recognizedClass;
          this.browser.webContents
            .executeJavaScript(`onPositionClassifier(${i}, ${JSON.stringify(data)}, '${metadata}')`);
        }, 1000);
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

  setPositionRectangles(data = []) {
    this.rectangles.position = parseIfString(data);
  }
}

exports.Simulator = Simulator;
