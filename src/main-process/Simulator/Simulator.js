const path = require('path');
const noop = require('lodash.noop');

const { AppSettings } = require('../AppSettings');
const { paperOutline } = require('../utils/paperOutline');
const { hexagonOutline } = require('../utils/hexagonOutline');
const { outlineInRectangle } = require('../utils/outlineInRectangle');
const { pointInRectangle } = require('../utils/pointInRectangle');
const { onChange } = require('../utils/onChange');
const { parseIfString } = require('../utils/parseIfString');
const { newWindow } = require('../utils/newWindow');
const { DEFAULT_CLASSES } = require('../constants');
const { simulator, pix } = require('../config');
const { naiveIDGenerator } = require('../utils/naiveIDGenerator');

const pluckUniqueClassifiersFromArray = (data) => [...new Set(data.map((rect) => rect.classifier))];

class Simulator {
  constructor(url, {
    onClosed = noop,
    updateAdminUI = noop
  }) {
    this.updateAdminUI = updateAdminUI;
    this.id = naiveIDGenerator();

    const settings = new AppSettings(url);
    this.settings = onChange(settings, () => settings.save());

    // Registered data represents volatile information, not persisted
    // All of this information comes strictly from the simulated application
    // through register events
    this.registeredData = {
      movement: { rectangles: [] },
      simple: {
        rectangles: [],
        classifiers: [],
        get classes() { return this.rectangles.length ? DEFAULT_CLASSES : []; }
      },
      position: {
        rectangles: [],
        classifiers: [],
        get classes() { return this.rectangles.length ? DEFAULT_CLASSES : []; }
      }
    };

    this.idCounter = 0;
    this.createOwnBrowser(onClosed);
  }

  createOwnBrowser(onClosed = noop) {
    this.browser = newWindow({
      onClosed: () => {
        this.cleanUp();
        onClosed();
      },
      options: {
        resizable: false,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          // nodeIntegration: false
        }
      },
      width: simulator.viewport.width,
      height: simulator.viewport.height
    });
  }

  handleMouseMove(mouseX, mouseY) {
    if (!this.settings.movementDetector || this.registeredData.movement.rectangles.length === 0) {
      return;
    }

    const hexagon = hexagonOutline(mouseX, mouseY);

    this.registeredData.movement.rectangles.forEach((rectangle, i) => {
      if (outlineInRectangle(hexagon, rectangle)) {
        this.browser.webContents.executeJavaScript(`onMovement(${i}, ${hexagon})`);
      }
    });
  }

  handleSimpleClassifier(mouseX, mouseY) {
    console.log(`Handling click / simple classification at x: ${mouseX}, y: ${mouseY}`);

    this.registeredData.simple.rectangles.forEach((rectangle, i) => {
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

    this.registeredData.position.rectangles.forEach((rectangle, i) => {
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

  setMovementRectangles(data = []) {
    this.registeredData.movement.rectangles = parseIfString(data);
  }

  setSimpleRectangles(data = []) {
    const parsedData = parseIfString(data);
    this.registeredData.simple.classifiers = pluckUniqueClassifiersFromArray(parsedData);
    this.registeredData.simple.rectangles = parsedData;
  }

  setPositionRectangles(data = []) {
    const parsedData = parseIfString(data);
    this.registeredData.position.classifiers = pluckUniqueClassifiersFromArray(parsedData);
    this.registeredData.position.rectangles = parsedData;
  }

  sendSettingsToAdmin() {
    const { settings, registeredData } = this;
    this.updateAdminUI({
      settings,
      registeredData
    });
  }

  cleanUp() {
    this.browser = null;
  }

  getLampixInfo() {
    const info = {
      version: '0.1',
      id: this.id,
      isSimulator: true,
      pix
    };

    this.browser.webContents
      .executeJavaScript(`onLampixInfo(${JSON.stringify(info)})`);
  }
}

exports.Simulator = Simulator;
