const { remote } = require('electron');

const { admin } = remote.require('./Admin');

window.lampix = {
  loadApp: (url) => {
    const { settings } = admin.loadApp(url);
    return settings;
  }
};
