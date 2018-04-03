const { remote } = require('electron');

const admin = remote.require('./Admin');

window.lampix = {
  loadApp: (url) => admin.loadApp(url)
};
