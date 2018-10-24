const { DEFAULT_CLASSES } = require('../constants');

const watcherData = () => {
  const data = {
    watchers: [],
    names: [],
    get classes() { return data.watchers.length ? DEFAULT_CLASSES : []; }
  };

  return data;
};

const createWatcherDataCategories = (version) => {
  const dataByVersion = {
    v0: {
      classifiers: watcherData(),
      segmenters: watcherData(),
      movement: { watchers: [] }
    },
    v1: {
      watchers: {},
      get names() { return Object.keys(this.watchers).map((wKey) => this.watchers[wKey].name); },
      get classes() { return Object.keys(this.watchers).length ? DEFAULT_CLASSES : []; }
    }
  };

  return dataByVersion[version];
};

exports.createWatcherDataCategories = createWatcherDataCategories;
