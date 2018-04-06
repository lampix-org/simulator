const { store } = require('./store');
const { APP_SETTINGS } = require('./constants');

const storeURLTemplate = (url) => `${APP_SETTINGS}/${url}`;

class AppSettings {
  newSettings() {
    return {
      movementDetector: false,
      classifierDetector: null,
      classifier: null,
      recognizedClass: null,
      metadata: null
    };
  }

  get(url) {
    const location = storeURLTemplate(url);
    return store.get(location);
  }

  save(url, data) {
    const location = storeURLTemplate(url);
    store.set(location, data);
  }

  has(url) {
    const location = storeURLTemplate(url);
    return store.has(location);
  }
}

exports.AppSettings = AppSettings;
