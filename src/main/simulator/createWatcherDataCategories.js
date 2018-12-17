const { DEFAULT_CLASSES } = require('../constants');
const { watcherNameNNCombo } = require('./watcherNameNNCombo');

const createWatcherDataCategories = () => ({
  watchers: {},
  get names() {
    return [
      ...new Set(Object.keys(this.watchers).map((wKey) => watcherNameNNCombo(this.watchers[wKey])))
    ];
  },
  get classes() { return Object.keys(this.watchers).length ? DEFAULT_CLASSES : []; }
});

exports.createWatcherDataCategories = createWatcherDataCategories;
