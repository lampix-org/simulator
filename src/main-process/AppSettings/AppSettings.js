const { store } = require('../store');
const { APP_SETTINGS } = require('./constants');

const storeURLTemplate = (url) => `${APP_SETTINGS}/${url}`;

class AppSettings {
  constructor(url) {
    this.url = url;
    this.storeLocation = storeURLTemplate(url);

    if (store.has(this.storeLocation)) {
      const data = store.get(this.storeLocation);
      this.fromSource(data);
    } else {
      this.restoreDefaults();
    }
  }

  fromSource(data) {
    this.movementDetector = data.movementDetector;
    this.simple = data.simple;
    this.position = data.position;
    this.movementRegisteredAreasOpen = false;
    this.simpleRegisteredAreasOpen = false;
    this.positionRegisteredAreasOpen = false;
  }

  restoreDefaults() {
    this.movementDetector = false;

    this.simple = {
      classifier: null,
      recognizedClass: null,
      metadata: null
    };

    this.position = {
      classifier: null,
      recognizedClass: null,
      metadata: null
    };
  }

  save() {
    const data = {
      movementDetector: this.movementDetector,
      simple: {
        classifier: null,
        recognizedClass: null,
        metadata: null
      },
      position: {
        classifier: null,
        recognizedClass: null,
        metadata: null
      }
    };

    store.set(this.storeLocation, data);
  }
}

exports.AppSettings = AppSettings;
