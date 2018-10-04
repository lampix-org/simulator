const Store = require('electron-store');
const defaults = require('./defaults.js');
const { heal } = require('./heal');

const store = new Store({
  defaults,
  name: 'simulator-config'
});

heal(store);

exports.configStore = store;
