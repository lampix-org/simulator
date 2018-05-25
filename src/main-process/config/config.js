const Store = require('electron-store');
const defaults = require('./defaults.js');

const store = new Store({
  defaults,
  name: 'simulator-config'
});

if (store.size === 0) {
  store.set(defaults);
}

exports.configStore = store;
