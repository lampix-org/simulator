const { remote } = require('electron');
const path = require('path');

const { admin } = remote.require('./Admin');
const { appSettings } = remote.require(path.resolve(__dirname, '..', 'AppSettings'));

const existingSettings = (url) => appSettings.get(url);
const newSettings = (url) => {
  const settings = appSettings.newSettings();
  appSettings.save(url, settings);
  appSettings.setCurrentSettings(settings);

  return settings;
};

window.lampix = {
  loadApp: (url) => {
    admin.loadApp(url);

    const hasSettings = appSettings.has(url);
    const settings = hasSettings ? existingSettings() : newSettings();

    return settings;
  }
};
