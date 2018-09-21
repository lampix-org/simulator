const { parseIfString } = require('../../../utils/parseIfString');
const { isClassifier } = require('../../../utils/isClassifier');
const { isSegmenter } = require('../../../utils/isSegmenter');
const { uniqueWatcherNames } = require('../compatibility/uniqueWatcherNames');

const addsWatchers = (state, browser) => ({
  addWatchers: (watchers = []) => {
    const {
      watcherData: {
        classifiers,
        segmenters
      }
    } = state;

    const parsedData = parseIfString(watchers);
    const updateWatchersAndNames = (collection, filter) => {
      const toAdd = parsedData.filter(filter);
      const newWatchers = [
        ...collection.watchers,
        ...toAdd
      ];

      collection.watchers = newWatchers;
      collection.names = uniqueWatcherNames(newWatchers);
    };

    updateWatchersAndNames(classifiers, isClassifier);
    updateWatchersAndNames(segmenters, isSegmenter);

    parsedData.forEach((w) => {
      browser.webContents.executeJavaScript(`onWatcherAdded('${w.id}')`);
    });
  }
});

exports.addsWatchers = addsWatchers;
