const { DEFAULT_CLASSES } = require('../constants');

const createWatcherDataCategories = () => ({
  watchers: {},
  get names() { return [...new Set(Object.keys(this.watchers).map((wKey) => this.watchers[wKey].name))]; },
  get classes() { return Object.keys(this.watchers).length ? DEFAULT_CLASSES : []; }
});

exports.createWatcherDataCategories = createWatcherDataCategories;
