const path = require('path');
const { AppSettings } = require('../AppSettings');
const { paperOutline } = require('../utils/paperOutline');
const { hexagonOutline } = require('../utils/hexagonOutline');
const { outlineInRectangle } = require('../utils/outlineInRectangle');
const { pointInRectangle } = require('../utils/pointInRectangle');
const { onChange } = require('../utils/onChange');
const { parseIfString } = require('../utils/parseIfString');
const { newWindow } = require('../utils/newWindow');
const noop = require('lodash.noop');

const pluckUniqueClassifiersFromArray = (data) => [...new Set(data.map((rect) => rect.classifier))];

class Simulator {
  constructor(url, {
    onClosed = noop,
    updateAdminUI = noop
  }) {
    this.appUrl = url;

    const settings = new AppSettings(url);
    this.settings = onChange(settings, () => settings.save());

    // Registered data represents volatile information, not persisted
    // All of this information comes strictly from the simulated application
    // through register events
    this.registeredData = {
      movement: { rectangles: [] },
      simple: {
        rectangles: [],
        classifiers: []
      },
      position: {
        rectangles: [],
        classifiers: []
      }
    };

    this.idCounter = 0;
    this.createOwnBrowser(onClosed);
    this.updateAdminUI = updateAdminUI.bind(null, this.settings);
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
      }
    });
  }

  handleMouseMove(mouseX, mouseY) {
    if (!this.settings.movementDetector || this.movement.rectangles.length === 0) {
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

  logCurrentSettings() {
    console.log(`Simple classifiers: ${JSON.stringify(this.registeredData.simple.classifiers)}`);
    console.log(`Position classifiers: ${JSON.stringify(this.registeredData.position.classifiers)}`);
    console.log(`Active settings: ${JSON.stringify(this.settings, null, 2)}`);
  }

  sendSettingsToAdmin() {
    console.log('Sending settings to Admin UI via updateAdminUI:');

    this.logCurrentSettings();
    this.updateAdminUI({
      ...this.settings,
      ...this.registeredData
    });
  }

  cleanUp() {
    this.browser = null;
  }
}

exports.Simulator = Simulator;
