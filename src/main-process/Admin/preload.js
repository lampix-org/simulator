const { remote } = require('electron');
const path = require('path');

const { admin } = remote.require('./Admin');
const { appSettings } = remote.require(path.resolve(__dirname, '..', 'AppSettings'));

window.lampix = {
  loadApp: (url) => {
    admin.loadApp(url);

    if (appSettings.has(url)) {
      return appSettings.get(url);
    }

    const settings = appSettings.newSettings();
    appSettings.save(url, settings);
    return settings;
  }
};
