const { store } = require('./store');
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
    this.classifierDetector = data.classifierDetector;
    this.classifier = data.classifier;
    this.recognizedClass = data.recognizedClass;
    this.metadata = data.metadata;
  }

  restoreDefaults() {
    this.movementDetector = false;
    this.classifierDetector = null;
    this.classifier = null;
    this.recognizedClass = null;
    this.metadata = '';
  }

  save() {
    const location = storeURLTemplate(this.url);
    const data = {
      movementDetector: this.movementDetector,
      classifierDetector: this.classifierDetector,
      classifier: this.classifier,
      recognizedClass: this.recognizedClass,
      metadata: this.metadata
    };

    store.set(location, data);
  }
}

exports.AppSettings = AppSettings;
