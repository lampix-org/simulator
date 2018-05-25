const Store = require('electron-store');

const store = new Store({
  name: 'simulator-app-settings'
});

exports.store = store;
