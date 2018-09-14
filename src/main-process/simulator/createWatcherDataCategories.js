const { DEFAULT_CLASSES } = require('../constants');

const watcherData = () => {
  const data = {
    watchers: [],
    names: [],
    get classes() { return data.watchers.length ? DEFAULT_CLASSES : []; }
  };

  return data;
};

const createWatcherDataCategories = (includeMovementWatchers) => ({
  classifiers: watcherData(),
  segmenters: watcherData(),
  movement: includeMovementWatchers ?
    { watchers: [] } : undefined
});

exports.createWatcherDataCategories = createWatcherDataCategories;
